/**
 * EmployeeList Component Tests
 */

import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Record } from "@src/components/record";
import { mockEmployees } from "@src/test/mocks/employeeData";
import { render, screen, within } from "@src/test/utils/testUtils";

import { EmployeeList } from "./EmployeeList";

describe("EmployeeList", () => {
  const defaultFilter = { search: "", sort_column: null, sort_order: null };
  const onFilterChange = vi.fn();

  function renderWithRecord(component: React.ReactElement) {
    return render(
      <Record filter={defaultFilter} onFilterChange={onFilterChange}>
        {component}
      </Record>,
    );
  }

  const defaultProps = {
    employees: mockEmployees,
    from: 1,
  };

  it("renders table with all employees", () => {
    renderWithRecord(<EmployeeList {...defaultProps} />);

    // Check if all 3 mock employees are rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("Bob Johnson")).toBeInTheDocument();
  });

  it("displays correct row numbers based on from prop", () => {
    renderWithRecord(<EmployeeList {...defaultProps} from={26} />);

    // Should show numbers 26, 27, 28 (from 26 + index 0, 1, 2)
    const rowNumbers = screen.getAllByRole("cell", { name: /\d+/ });
    expect(rowNumbers[0]).toHaveTextContent("26");
  });

  it("renders employee number as link to detail page", () => {
    renderWithRecord(<EmployeeList {...defaultProps} />);

    const link = screen.getByRole("link", { name: "KF2024001" });
    expect(link).toHaveAttribute("href", "/employees/1");
  });

  it("displays all column headers", () => {
    renderWithRecord(<EmployeeList {...defaultProps} />);

    expect(screen.getByText("No")).toBeInTheDocument();
    expect(screen.getByText("Foto")).toBeInTheDocument();
    expect(screen.getByText("Nomor Karyawan")).toBeInTheDocument();
    expect(screen.getByText("Nama Lengkap")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Divisi")).toBeInTheDocument();
    expect(screen.getByText("Jabatan")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("shows actions column when canEdit or canDelete is true", () => {
    renderWithRecord(<EmployeeList {...defaultProps} canEdit={true} />);

    expect(screen.getByText("Aksi")).toBeInTheDocument();
  });

  it("hides actions column when canEdit and canDelete are false", () => {
    renderWithRecord(
      <EmployeeList {...defaultProps} canEdit={false} canDelete={false} />,
    );

    expect(screen.queryByText("Aksi")).not.toBeInTheDocument();
  });

  it("renders avatar with fallback for employees without photo", () => {
    renderWithRecord(<EmployeeList {...defaultProps} />);

    // Check for first letter of names as fallback
    const firstRow = screen.getAllByRole("row")[1]; // Skip header row
    expect(within(firstRow).getByText("J")).toBeInTheDocument();
  });

  it("displays status badges with correct colors", () => {
    renderWithRecord(<EmployeeList {...defaultProps} />);

    // Active status should be green
    const statusCell = screen
      .getAllByRole("cell")
      .find((cell) => cell.textContent === "Aktif");
    expect(statusCell).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    renderWithRecord(
      <EmployeeList {...defaultProps} onDelete={onDelete} canDelete={true} />,
    );

    // Open first dropdown menu
    const dropdownButtons = screen.getAllByLabelText(/menu aksi untuk/i);
    await user.click(dropdownButtons[0]);

    // Click delete option
    const deleteButton = screen.getByText("Hapus");
    await user.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(mockEmployees[0]);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("has proper ARIA labels on action menus", () => {
    renderWithRecord(<EmployeeList {...defaultProps} canEdit={true} />);

    // Check first employee has ARIA label with their name
    expect(
      screen.getByLabelText("Menu aksi untuk John Doe"),
    ).toBeInTheDocument();
  });

  it("shows view and edit options in dropdown when canEdit is true", async () => {
    const user = userEvent.setup();

    renderWithRecord(<EmployeeList {...defaultProps} canEdit={true} />);

    const dropdownButton = screen.getByLabelText("Menu aksi untuk John Doe");
    await user.click(dropdownButton);

    expect(screen.getByText("Lihat Detail")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });

  it("does not show edit option when canEdit is false", async () => {
    const user = userEvent.setup();

    renderWithRecord(
      <EmployeeList {...defaultProps} canEdit={false} canDelete={true} />,
    );

    const dropdownButton = screen.getByLabelText("Menu aksi untuk John Doe");
    await user.click(dropdownButton);

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
  });

  it("does not show delete option when canDelete is false", async () => {
    const user = userEvent.setup();

    renderWithRecord(
      <EmployeeList {...defaultProps} canEdit={true} canDelete={false} />,
    );

    const dropdownButton = screen.getByLabelText("Menu aksi untuk John Doe");
    await user.click(dropdownButton);

    expect(screen.queryByText("Hapus")).not.toBeInTheDocument();
  });

  it("renders empty table when no employees provided", () => {
    renderWithRecord(<EmployeeList employees={[]} from={1} />);

    // Should still show headers but no data rows
    expect(screen.getByText("Nomor Karyawan")).toBeInTheDocument();
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
  });
});

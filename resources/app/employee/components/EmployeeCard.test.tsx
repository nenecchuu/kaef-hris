/**
 * EmployeeCard Component Tests
 */

import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { mockEmployee } from "@src/test/mocks/employeeData";
import { render, screen } from "@src/test/utils/testUtils";

import { EmployeeCard } from "./EmployeeCard";

describe("EmployeeCard", () => {
  it("renders employee information correctly", () => {
    render(<EmployeeCard employee={mockEmployee} />);

    // Check name and employee number
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("KF2024001")).toBeInTheDocument();

    // Check contact information
    expect(screen.getByText("john.doe@kimiafarma.co.id")).toBeInTheDocument();
    expect(screen.getByText("081234567890")).toBeInTheDocument();

    // Check position information
    expect(screen.getByText("Information Technology")).toBeInTheDocument();
    expect(screen.getByText("Software Developer")).toBeInTheDocument();
  });

  it("displays active status badge with correct styling", () => {
    render(<EmployeeCard employee={mockEmployee} />);

    const statusBadge = screen.getByRole("status");
    expect(statusBadge).toHaveClass("bg-green-100", "text-green-700");
    expect(statusBadge).toHaveTextContent("Aktif");
  });

  it("displays terminated status badge with correct styling", () => {
    const terminatedEmployee = {
      ...mockEmployee,
      status_kepegawaian: "terminated" as const,
    };

    render(<EmployeeCard employee={terminatedEmployee} />);

    const statusBadge = screen.getByRole("status");
    expect(statusBadge).toHaveClass("bg-red-100", "text-red-700");
    expect(statusBadge).toHaveTextContent("Berhenti");
  });

  it("renders avatar with fallback when no photo", () => {
    render(<EmployeeCard employee={mockEmployee} />);

    const avatar = screen.getByLabelText("Avatar default");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveTextContent("J"); // First letter of name
  });

  it("provides foto_url to avatar when available", () => {
    const employeeWithPhoto = {
      ...mockEmployee,
      foto_url: "https://example.com/photo.jpg",
    };

    render(<EmployeeCard employee={employeeWithPhoto} />);

    // Just verify component renders without error when foto_url is provided
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("shows actions dropdown when canEdit or canDelete is true", () => {
    render(<EmployeeCard employee={mockEmployee} canEdit={true} />);

    const actionButton = screen.getByLabelText("Menu aksi untuk John Doe");
    expect(actionButton).toBeInTheDocument();
  });

  it("hides actions dropdown when canEdit and canDelete are false", () => {
    render(
      <EmployeeCard
        employee={mockEmployee}
        canEdit={false}
        canDelete={false}
      />,
    );

    const actionButton = screen.queryByLabelText("Menu aksi untuk John Doe");
    expect(actionButton).not.toBeInTheDocument();
  });

  it("calls onDelete when delete action is clicked", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();

    render(
      <EmployeeCard
        employee={mockEmployee}
        onDelete={onDelete}
        canDelete={true}
      />,
    );

    // Open dropdown
    const actionButton = screen.getByLabelText("Menu aksi untuk John Doe");
    await user.click(actionButton);

    // Click delete
    const deleteButton = screen.getByText("Hapus");
    await user.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith(mockEmployee);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("has proper accessibility attributes", () => {
    render(<EmployeeCard employee={mockEmployee} />);

    const card = screen.getByRole("article");
    expect(card).toHaveAttribute("aria-label", "Kartu karyawan John Doe");

    // Check status has proper ARIA label
    const statusBadge = screen.getByRole("status");
    expect(statusBadge).toHaveAttribute("aria-label", "Status: Aktif");
  });

  it("truncates long text with proper title attributes", () => {
    const employeeWithLongName = {
      ...mockEmployee,
      email:
        "very.long.email.address.that.should.be.truncated@kimiafarma.co.id",
    };

    render(<EmployeeCard employee={employeeWithLongName} />);

    const emailElement = screen.getByTitle(
      "very.long.email.address.that.should.be.truncated@kimiafarma.co.id",
    );
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveClass("truncate");
  });

  it("contains links to employee detail page", () => {
    render(<EmployeeCard employee={mockEmployee} />);

    const nameLink = screen.getByRole("link", { name: "John Doe" });
    expect(nameLink).toHaveAttribute("href", "/employees/1");
  });

  it("shows edit and view options in dropdown when canEdit is true", async () => {
    const user = userEvent.setup();

    render(<EmployeeCard employee={mockEmployee} canEdit={true} />);

    const actionButton = screen.getByLabelText("Menu aksi untuk John Doe");
    await user.click(actionButton);

    expect(screen.getByText("Lihat Detail")).toBeInTheDocument();
    expect(screen.getByText("Edit")).toBeInTheDocument();
  });
});

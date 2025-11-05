import { useQuery } from "@tanstack/react-query";

import type { EmployeeDetailData } from "@src/types/competency";

// Import mock data
import employeeE001Mock from "../../../../mock-data/employee_detail_E001.json";

export const useEmployeeDetail = (employeeId: string) => {
  return useQuery<EmployeeDetailData>({
    queryKey: ["employee-detail", employeeId],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // For demo, only E001 has full data
      if (employeeId === "E001") {
        return employeeE001Mock as EmployeeDetailData;
      }

      // For other employees, throw error (or return minimal mock)
      throw new Error(`Employee data not available for ID: ${employeeId}`);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!employeeId,
  });
};

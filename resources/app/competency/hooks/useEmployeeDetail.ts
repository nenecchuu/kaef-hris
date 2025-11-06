import { useQuery } from "@tanstack/react-query";

import type { EmployeeDetailData } from "@src/types/competency";

// Import mock data for all employees
import employeeE001Mock from "../../../../mock-data/employee_detail_E001.json";
import employeeE002Mock from "../../../../mock-data/employee_detail_E002.json";
import employeeE003Mock from "../../../../mock-data/employee_detail_E003.json";
import employeeE004Mock from "../../../../mock-data/employee_detail_E004.json";
import employeeE005Mock from "../../../../mock-data/employee_detail_E005.json";
import employeeE006Mock from "../../../../mock-data/employee_detail_E006.json";
import employeeE007Mock from "../../../../mock-data/employee_detail_E007.json";
import employeeE008Mock from "../../../../mock-data/employee_detail_E008.json";
import employeeE009Mock from "../../../../mock-data/employee_detail_E009.json";
import employeeE010Mock from "../../../../mock-data/employee_detail_E010.json";

// Map of employee data
const employeeDataMap: Record<string, EmployeeDetailData> = {
  E001: employeeE001Mock as EmployeeDetailData,
  E002: employeeE002Mock as EmployeeDetailData,
  E003: employeeE003Mock as EmployeeDetailData,
  E004: employeeE004Mock as EmployeeDetailData,
  E005: employeeE005Mock as EmployeeDetailData,
  E006: employeeE006Mock as EmployeeDetailData,
  E007: employeeE007Mock as EmployeeDetailData,
  E008: employeeE008Mock as EmployeeDetailData,
  E009: employeeE009Mock as EmployeeDetailData,
  E010: employeeE010Mock as EmployeeDetailData,
};

export const useEmployeeDetail = (employeeId: string) => {
  return useQuery<EmployeeDetailData>({
    queryKey: ["employee-detail", employeeId],
    queryFn: async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Get employee data from map
      const data = employeeDataMap[employeeId];

      if (data) {
        return data;
      }

      // If not found, throw error
      throw new Error(`Employee data not available for ID: ${employeeId}`);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!employeeId,
  });
};

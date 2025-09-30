/**
 * EmployeeSearch Component
 *
 * Search input with debounce for employee filtering
 */

import React from 'react';
import { SearchBox } from '@src/components/record';

interface EmployeeSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Employee Search Component with debouncing
 */
export function EmployeeSearch({
  value,
  onChange,
  placeholder = 'Cari nama atau nomor karyawan...',
}: EmployeeSearchProps) {
  return (
    <SearchBox
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default EmployeeSearch;
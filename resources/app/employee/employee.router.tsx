/**
 * Employee Module Router
 *
 * Route definitions for employee management
 */

import { RouteObject } from 'react-router-dom';

// Lazy load pages for code splitting
const EmployeeIndexPage = React.lazy(() => import('./pages/root'));
const EmployeeDetailPage = React.lazy(() => import('./pages/detail'));
const EmployeeCreatePage = React.lazy(() => import('./pages/new'));
const EmployeeEditPage = React.lazy(() => import('./pages/edit'));

import React from 'react';

export const employeeRoutes: RouteObject[] = [
  {
    path: 'employees',
    children: [
      {
        index: true,
        element: <EmployeeIndexPage />,
      },
      {
        path: 'new',
        element: <EmployeeCreatePage />,
      },
      {
        path: ':id',
        element: <EmployeeDetailPage />,
      },
      {
        path: ':id/edit',
        element: <EmployeeEditPage />,
      },
    ],
  },
];

export default employeeRoutes;
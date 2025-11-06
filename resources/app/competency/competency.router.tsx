import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const LeaderHome = lazy(() => import("./pages/LeaderHome"));
const LeaderTeam = lazy(() => import("./pages/LeaderTeam"));
const EmployeeDetail = lazy(() => import("./pages/EmployeeDetail"));
const EmployeeView = lazy(() => import("./pages/EmployeeView"));
const AnalysisPage = lazy(() => import("./pages/AnalysisPage"));

export const competencyRoutes: RouteObject[] = [
  {
    path: "/leader",
    children: [
      {
        path: "home",
        element: <LeaderHome />,
      },
      {
        path: "team",
        element: <LeaderTeam />,
      },
      {
        path: "team/:employeeId",
        element: <EmployeeDetail />,
      },
      {
        path: "analysis",
        element: <AnalysisPage />,
      },
      {
        path: "notifications",
        element: (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-gray-600">
              Halaman Notifikasi (Coming Soon)
            </div>
          </div>
        ),
      },
      {
        path: "more",
        element: (
          <div className="flex min-h-screen items-center justify-center">
            <div className="text-gray-600">Halaman Lainnya (Coming Soon)</div>
          </div>
        ),
      },
    ],
  },
  {
    path: "/employee",
    children: [
      {
        path: ":employeeId",
        element: <EmployeeView />,
      },
    ],
  },
];

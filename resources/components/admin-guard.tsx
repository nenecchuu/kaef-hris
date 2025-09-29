import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@src/lib/auth";

interface AdminGuardProps {
  requireAdminAccess?: boolean;
  redirectTo?: string;
}

export function AdminGuard({
  requireAdminAccess,
  redirectTo = "/404",
}: AdminGuardProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdminAccess && !user.is_administrator) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
}

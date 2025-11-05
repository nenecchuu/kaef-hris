import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { AuditTrailRootPage } from "@src/app/audit-trail/pages/root";
import { DemoLanding } from "@src/app/competency/pages/DemoLanding";
import { EmployeeDetail } from "@src/app/competency/pages/EmployeeDetail";
import { LeaderHome } from "@src/app/competency/pages/LeaderHome";
import { LeaderTeam } from "@src/app/competency/pages/LeaderTeam";
import { HomeRootPage } from "@src/app/home/pages/root";
import { PasswordComplexityEditPage } from "@src/app/password-complexity/pages/edit";
import { UserView } from "@src/app/user/main/components";
import { UserBindMfaPage } from "@src/app/user/main/pages/bind-mfa";
import { UserDetailsPage } from "@src/app/user/main/pages/details";
import { UserEditPage } from "@src/app/user/main/pages/edit";
import { UserNewPage } from "@src/app/user/main/pages/new";
import { UserRootPage } from "@src/app/user/main/pages/root";
import { AdminGuard } from "@src/components/admin-guard";
import { NotFoundFallback, RootFallback } from "@src/components/fallbacks";
import { MainLayout } from "@src/components/main-layout";
import { MfaGuard } from "@src/components/mfa-guard";

export const userRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<MainLayout app="user" />}
      errorElement={<RootFallback />}
    >
      <Route element={<MfaGuard />}>
        <Route errorElement={<RootFallback />}>
          <Route index={true} element={<HomeRootPage />} />
          <Route element={<AdminGuard requireAdminAccess={true} />}>
            <Route path="users" key="users">
              <Route index={true} element={<UserRootPage key="users" />} />
              <Route path="new" element={<UserNewPage />} />
              <Route path=":userId" element={<UserView />}>
                <Route index={true} element={<UserDetailsPage />} />
                <Route path="edit" element={<UserEditPage />} />
              </Route>
            </Route>
            <Route path="blocked-users" key="blocked-users">
              <Route
                index={true}
                element={
                  <UserRootPage isBlockedUserPage={true} key="blocked-users" />
                }
              />
              <Route path="new" element={<UserNewPage />} />
              <Route path=":userId" element={<UserView />}>
                <Route index={true} element={<UserDetailsPage />} />
                <Route path="edit" element={<UserEditPage />} />
              </Route>
            </Route>
            <Route
              path="password-complexity"
              element={<PasswordComplexityEditPage />}
            />
            <Route path="audit-trail" element={<AuditTrailRootPage />} />
          </Route>
          <Route path="profile" element={<UserView isPageProfile={true} />}>
            <Route
              index={true}
              element={<UserDetailsPage isPageProfile={true} />}
            />
            <Route path="bind-mfa" element={<UserBindMfaPage />} />
            <Route
              path="edit"
              element={<UserEditPage isPageProfile={true} />}
            />
          </Route>

          {/* Competency Module Routes */}
          <Route path="demo" element={<DemoLanding />} />
          <Route path="leader">
            <Route path="home" element={<LeaderHome />} />
            <Route path="team" element={<LeaderTeam />} />
            <Route path="team/:employeeId" element={<EmployeeDetail />} />
            <Route
              path="analysis"
              element={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-gray-600">
                    Halaman Analisis (Coming Soon)
                  </div>
                </div>
              }
            />
            <Route
              path="notifications"
              element={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-gray-600">
                    Halaman Notifikasi (Coming Soon)
                  </div>
                </div>
              }
            />
            <Route
              path="more"
              element={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-gray-600">
                    Halaman Lainnya (Coming Soon)
                  </div>
                </div>
              }
            />
          </Route>

          <Route path="*" element={<NotFoundFallback />} />
        </Route>
      </Route>
    </Route>,
  ),
);

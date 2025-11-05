import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "@src/lib/auth";
import { AlertDialog } from "@src/ui/alert-dialog";

export function MfaGuard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDialog, setShowDialog] = useState(false);

  const shouldBlock =
    user?.is_use_mfa &&
    !user?.is_mfa_enabled &&
    !location.pathname.startsWith("/profile/bind-mfa");

  useEffect(() => {
    if (!user?.is_use_mfa) return;

    if (!user.is_mfa_enabled) {
      if (!location.pathname.startsWith("/profile/bind-mfa")) {
        setShowDialog(true);
      }
    } else {
      if (location.pathname.startsWith("/profile/bind-mfa")) {
        navigate("/", { replace: true });
      }
    }
  }, [shouldBlock, user]);

  const handleClose = () => {
    setShowDialog(false);
    navigate("/profile/bind-mfa", { replace: true });
  };

  if (shouldBlock) {
    return (
      <AlertDialog
        closeButtonLabel="Aktifkan MFA"
        open={showDialog}
        onOpenChange={setShowDialog}
        onClose={handleClose}
        variant="warning"
        title="Autentikasi Dua Faktor Diperlukan"
        description="Untuk melanjutkan, aktifkan MFA (Multi-Factor Authentication) terlebih dahulu."
        preventOutsideClose={true}
      />
    );
  }

  return <Outlet />;
}

import { ReactNode, useEffect, useState } from "react";
import { Container, Alert, AlertTitle, Button, Stack } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type RoleBasedGuardProp = {
  accessibleRoles: String[];
  children: ReactNode | string;
};

const useCurrentRole = (): String[] => {
  const { user } = useAuth();
  return user && user.role ? user.role : [];
};

export default function RoleBasedGuard({
  accessibleRoles,
  children,
}: RoleBasedGuardProp) {
  const currentRole = useCurrentRole();
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [accessible, setAccessible] = useState<boolean>(false);
  const [ending, setEnding] = useState<boolean>(false);

  useEffect(() => {
    if (
      isAuthenticated &&
      !(
        accessibleRoles?.length !== 0 &&
        !accessibleRoles.some((r) => currentRole.some((ur) => ur === r))
      )
    ) {
      setAccessible(true);
      setEnding(true);
    }
  }, [isAuthenticated]);

  if (isAuthenticated && !accessible) {
    return (
      <div
        style={{ height: "100vh", width: "100vw", margin: "auto" }}
        className="flex items-center justify-center bg-white"
      >
        <Container>
          <Alert severity="error" className="flex justify-center">
            <AlertTitle>
              <strong>Quyền truy cập bị từ chối</strong>
            </AlertTitle>
            Rất tiếc! Bạn không có quyền truy cập trang này
          </Alert>
          <Stack direction="row" justifyContent="center">
            <Button
              onClick={logout}
              variant="contained"
              color="error"
              style={{ margin: "0 5px" }}
            >
              XÁC NHẬN
            </Button>
          </Stack>
        </Container>
      </div>
    );
  }

  if (accessible && isAuthenticated) {
    return <>{children}</>;
  }

  return <></>;
}

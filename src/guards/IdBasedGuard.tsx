import { ReactNode, useEffect, useState } from "react";
import { Container, Alert, AlertTitle, Button, Stack } from "@mui/material";
import useAuth from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";

type RoleBasedGuardProp = {
  accessibleIds: String[];
  children: ReactNode;
};

export default function IdBasedGuard({
  accessibleIds,
  children,
}: RoleBasedGuardProp) {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [accessible, setAccessible] = useState<boolean | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [ending, setEnding] = useState<boolean>(false);

  useEffect(() => {
    var userId: any = null;
    if (params.userId) {
      userId = params.userId as string;
    }
    if (
      !(
        accessibleIds?.length !== 0 &&
        !accessibleIds.some((r) => r === userId) &&
        isAuthenticated &&
        userId
      )
    ) {
      setAccessible(true);
      setUserId(userId);
    } else {
      setAccessible(false);
      setUserId(userId);
    }
  }, [isAuthenticated]);

  if (!userId) {
    if (accessible != null && accessible == false) {
      return (
        <div
          style={{ height: "100vh", width: "100vw", margin: "auto" }}
          className="flex items-center justify-center"
        >
          <Container>
            <Alert severity="error" className="flex justify-center">
              <AlertTitle>Permission Denied</AlertTitle>
              You do not have permission to access this page
            </Alert>
            <Stack direction="row" justifyContent="center">
              <Button
                onClick={() => router.push("/")}
                variant="outlined"
                style={{ margin: "0 5px" }}
              >
                Back to home
              </Button>
              <Button
                onClick={logout}
                variant="outlined"
                color="inherit"
                style={{ margin: "0 5px" }}
              >
                Logout
              </Button>
            </Stack>
          </Container>
        </div>
      );
    }
  }

  if (accessible && isAuthenticated && userId) {
    return <>{children}</>;
  }

  return <></>;
}

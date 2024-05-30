"use client";
import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { PATH_AUTH } from "@/routes/paths";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && isInitialized) {
      router.push(PATH_AUTH.login);
    }
  }, [isAuthenticated, isInitialized]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return <></>;
}

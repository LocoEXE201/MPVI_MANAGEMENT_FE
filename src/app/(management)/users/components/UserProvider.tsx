"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthGuard from "@/guards/AuthGuard";
import UserList from "./UserComponent";
import useProtectData from "@/hooks/useProtectData";

const UserListComponent = (props: {}) => {
  useProtectData();

  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AuthGuard>
            <UserList />
          </AuthGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default UserListComponent;

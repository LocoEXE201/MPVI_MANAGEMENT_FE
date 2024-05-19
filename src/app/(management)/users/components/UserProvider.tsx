"use client";

import { AuthProvider } from "@/contexts/JWTContext";
import { AppProvider } from "@/contexts/AppContext";
import AuthGuard from "@/guards/AuthGuard";
import UserList from "./UserComponent";

const UserListComponent = (props: {}) => {
  return (
    <>
      <AppProvider>
        <AuthProvider>
          <AuthGuard>
            <UserList/>
          </AuthGuard>
        </AuthProvider>
      </AppProvider>
    </>
  );
};

export default UserListComponent;

import { AppProvider } from "@/contexts/AppContext";
import { AuthContextProvider } from "@/contexts/AuthGoogleContext";
import { AuthProvider } from "@/contexts/JWTContext";
import React from "react";
import SideBar from "./sidebarComponent";
import NavBar from "./navbar";

export default function MainLayoutComponent({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <AppProvider>
            <AuthProvider>
                <AuthContextProvider>
                    <div className="flex h-screen">
                        <SideBar />
                        <div className="flex flex-col flex-1">
                            <NavBar />
                            <main className="flex-1 overflow-y-auto p-4">
                                {children}
                            </main>
                        </div>
                    </div>
                </AuthContextProvider>
            </AuthProvider>
        </AppProvider>
    )
}
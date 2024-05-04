import { AppProvider } from "@/contexts/AppContext";
import { AuthContextProvider } from "@/contexts/AuthGoogleContext";
import { AuthProvider } from "@/contexts/JWTContext";
import React from "react";
import SideBar from "./sidebarComponent";

export default function MainLayoutComponent({
    children,
} : {
    children: React.ReactNode
}) {
    return (
        <AppProvider>
            <AuthProvider>
                <AuthContextProvider>
                    <SideBar/>
                    <main>
                        {children}
                    </main>
                </AuthContextProvider>
            </AuthProvider>
        </AppProvider>
    )
}
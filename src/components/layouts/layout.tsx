import { AppProvider } from "@/contexts/AppContext";
import { AuthContextProvider } from "@/contexts/AuthGoogleContext";
import { AuthProvider } from "@/contexts/JWTContext";
import React from "react";
import SideBar from "./sidebarComponent";
import NavBar from "./navbar";
import Footer from "./footer";
import { PATH_MAIN } from "@/routes/paths";
import Category from "./category";


export default function MainLayoutComponent ({children} : {children: React.ReactNode}) {
    return (
        <AppProvider>
            <AuthProvider>
                <AuthContextProvider>
                    <div className="flex h-screen">
                        <SideBar />
                        <div className="flex flex-col flex-1">
                            <NavBar />
                            <main className="">
                                {/* {currentPage === PATH_MAIN.category && <Category/>} */}
                                {children}
                            </main>
                            <Footer/>
                        </div>
                    </div>
                </AuthContextProvider>
            </AuthProvider>
        </AppProvider>
    )
}
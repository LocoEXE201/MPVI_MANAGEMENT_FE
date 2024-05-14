import { AppProvider } from "@/contexts/AppContext"
import { AuthProvider } from "@/contexts/JWTContext"
import SideBarComponent from "./SideBarComponent"

const SideBar = (props : {}) => {
    return (
        <AppProvider>
            <AuthProvider>
                <SideBarComponent />
            </AuthProvider>
        </AppProvider>
    )
}

export default SideBar
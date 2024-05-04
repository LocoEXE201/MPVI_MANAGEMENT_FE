import { AppProvider } from "@/contexts/AppContext"
import { AuthProvider } from "@/contexts/JWTContext"
import Header from "./NavBarComponent"


const NavBar = (props : {}) => {
    return (
        <AppProvider>
            <AuthProvider>
                <Header/>
            </AuthProvider>
        </AppProvider>
    )
}

export default NavBar
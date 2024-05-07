import { AppProvider } from "@/contexts/AppContext"
import { AuthProvider } from "@/contexts/JWTContext"
import FooterComponent from "./Footer"


const Footer = (props : {}) => {
    return (
        <AppProvider>
            <AuthProvider>
                <FooterComponent/>
            </AuthProvider>
        </AppProvider>
    )
}

export default Footer
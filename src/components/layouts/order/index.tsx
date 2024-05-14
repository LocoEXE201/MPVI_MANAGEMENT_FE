import { AppProvider } from "@/contexts/AppContext"
import { AuthProvider } from "@/contexts/JWTContext"
import OrderComponent from "./OrderComponent"


const Order = (props : {}) => {
    return (
        <AppProvider>
            <AuthProvider>
                <OrderComponent/>
            </AuthProvider>
        </AppProvider>
    )
}

export default Order
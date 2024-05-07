import { AppProvider } from "@/contexts/AppContext"
import { AuthProvider } from "@/contexts/JWTContext"
import DashBoardComponent from "./DashBoardComponent"


const Dashboard = (props : {}) => {
    return (
        <AppProvider>
            <AuthProvider>
                <DashBoardComponent/>
            </AuthProvider>
        </AppProvider>
    )
}

export default Dashboard
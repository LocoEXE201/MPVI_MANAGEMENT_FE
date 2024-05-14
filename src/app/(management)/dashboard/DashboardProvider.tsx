import { AppProvider } from "@/contexts/AppContext"
import { AuthProvider } from "@/contexts/JWTContext"
import DashBoardComponent from "./DashBoardComponent"
import AuthGuard from "@/guards/AuthGuard"


const Dashboard = (props: {}) => {
    return (
        <AppProvider>
            <AuthProvider>
                <AuthGuard>
                    <DashBoardComponent />
                </AuthGuard>
            </AuthProvider>
        </AppProvider>
    )
}

export default Dashboard
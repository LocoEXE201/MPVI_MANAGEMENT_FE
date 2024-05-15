<<<<<<< HEAD
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
=======
// import { AppProvider } from "@/contexts/AppContext"
// import { AuthProvider } from "@/contexts/JWTContext"
// import OrderComponent from "./OrderComponent"


// const Order = (props : {}) => {
//     return (
//         <AppProvider>
//             <AuthProvider>
//                 <OrderComponent/>
//             </AuthProvider>
//         </AppProvider>
//     )
// }

// export default Order
>>>>>>> 7d5a7388b13ddabf6c72c0256b55df6513b2b059

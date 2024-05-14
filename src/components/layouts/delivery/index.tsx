import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/JWTContext";
import DeliveryComponent from "./DeliveryComponent";
import MainLayoutComponent from "../layout";

const Category = (props: {}) => {
  return (
    <AppProvider>
      <AuthProvider>
        <DeliveryComponent />
      </AuthProvider>
    </AppProvider>
  );
};

export default Category;

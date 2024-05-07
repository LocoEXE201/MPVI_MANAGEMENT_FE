import { AppProvider } from "@/contexts/AppContext";
import { AuthProvider } from "@/contexts/JWTContext";
import CategoryComponent from "./CategoryComponent";
import MainLayoutComponent from "../layout";

const Category = (props: {}) => {
  return (
    <MainLayoutComponent>
      <CategoryComponent />
    </MainLayoutComponent>
  );
};

export default Category;

import { createContext, FC, memo, useContext } from "react";
import { firestore } from "../services/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useStore } from "./StoreContext";

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  provider: string;
  store: string;
};

type ProductsContextType = {
  products: ProductType[] | undefined;
  addProduct: (product: ProductType) => void;
  updateProduct: (product: ProductType) => void;
  deleteProduct: (id: string) => void;
};

const ProductsContext = createContext<ProductsContextType>({
  products: [],
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
});

const ProductsComponent: FC = ({ children }) => {
  const store = useStore();
  const ref = firestore.collection("products");
  const query = ref.where("store", "==", store ? store.id : "x");
  const [products] = useCollectionData<ProductType>(query, {
    idField: "id",
  });

  const addProduct = (product: ProductType) => {
    const { id, ...rest } = product;
    ref.add({ ...rest });
  };

  const updateProduct = (product: ProductType) => {
    const productRef = ref.doc(product.id);

    productRef.set({ ...product });
  };

  const deleteProduct = async (id: string) => {
    await ref.doc(id).delete();
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

const ProductsProvider: FC = memo(ProductsComponent);

const useProducts = () => useContext(ProductsContext);

export { ProductsProvider, useProducts };

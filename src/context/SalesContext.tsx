import { createContext, FC, memo, useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import generatePDF from "../components/TicketPDF";
import { firestore, firebase } from "../services/firebase";
import { ProductType } from "./ProductsContext";
import { useStore } from "./StoreContext";

export type Sale = {
  id: string;
  products: ProductType[];
  store: string;
  createdAt: firebase.firestore.Timestamp;
  total: number;
};

export type PreSale = {
  products: ProductType[];
  store: string;
  total: number;
};

type SalesContextType = {
  sales: Sale[] | undefined;
  addSale: (presale: PreSale) => void;
};

const SalesContext = createContext<SalesContextType>({
  sales: [],
  addSale: () => {},
});

const SalesComponent: FC = ({ children }) => {
  const store = useStore();
  const query = firestore
    .collection("sales")
    .where("store", "==", store ? store.id : "x");

  const [sales] = useCollectionData<Sale>(query, {
    idField: "id",
  });

  const addSale = (presale: PreSale) => {
    firestore.collection("sales").add({
      ...presale,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    generatePDF(presale, store, true);
  };

  return (
    <SalesContext.Provider value={{ sales, addSale }}>
      {children}
    </SalesContext.Provider>
  );
};

const SalesProvider: FC = memo(SalesComponent);
const useSales = () => useContext(SalesContext);

export { SalesProvider, useSales };

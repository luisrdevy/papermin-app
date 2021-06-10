import {
  createContext,
  FC,
  memo,
  useContext,
  useEffect,
  useState,
} from "react";
import { firestore } from "../services/firebase";
import { useUser } from "./UserContext";
import { useDocumentData } from "react-firebase-hooks/firestore";

type Store =
  | {
      name: string;
      slogan: string;
      id: string;
      vendors: string[];
    }
  | undefined;

type Vendor = {
  storeId: string;
  vendorEmail: string;
};

const StoreContext = createContext<Store>({
  name: "",
  slogan: "",
  id: "",
  vendors: [],
});

const StoreComponent: FC = ({ children }) => {
  const { user } = useUser();
  const [vendor] = useDocumentData<Vendor>(
    firestore.doc(
      `vendors/${user && user.displayName ? "x" : user ? user.email : "x"}`
    )
  );
  const [doc, setDoc] = useState(
    vendor ? vendor.storeId : user ? user.uid : "x"
  );
  const [store] = useDocumentData<Store>(firestore.doc(`stores/${doc}`), {
    idField: "id",
  });

  useEffect(() => {
    if (!vendor) return;
    setDoc(vendor.storeId);
  }, [vendor]);
  useEffect(() => {
    if (vendor || !user) return;
    setDoc(user.uid);
  }, [vendor, user]);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const StoreProvider: FC = memo(StoreComponent);

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore };

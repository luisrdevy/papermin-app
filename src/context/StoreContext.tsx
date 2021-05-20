import { createContext, FC, memo, useContext } from "react";
import { firestore } from "../services/firebase";
import { useUser } from "./UserContext";
import { useDocumentData } from "react-firebase-hooks/firestore";

type Store =
  | {
      name: string;
      slogan: string;
      id: string;
    }
  | undefined;

const StoreContext = createContext<Store>({ name: "", slogan: "", id: "" });

const StoreComponent: FC = ({ children }) => {
  const { user } = useUser();
  const [store] = useDocumentData<Store>(
    firestore.doc(`stores/${user ? user.uid : "x"}`),
    { idField: "id" }
  );
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const StoreProvider: FC = memo(StoreComponent);

const useStore = () => useContext(StoreContext);

export { StoreProvider, useStore };

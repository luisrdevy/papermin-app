import { createContext, FC, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  facebokProvider,
  firebase,
  firestore,
  googleProvider,
} from "../services/firebase";

type UserContextType = {
  user: firebase.User | null | undefined;
  login: () => void;
  logout: () => void;
  fbLogin: () => void;
  vendorLogin: (email: string, password: string) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  fbLogin: () => {},
  logout: () => {},
  vendorLogin: () => {},
});

const UserProvider: FC = ({ children }) => {
  const [user] = useAuthState(auth);

  const login = async () => {
    await auth.signInWithPopup(googleProvider);
  };

  const fbLogin = async () => {
    await auth.signInWithPopup(facebokProvider);
  };

  const logout = async () => {
    await auth.signOut();
  };

  const vendorLogin = async (email: string, password: string) => {
    let haveStore: any = false;
    await firestore.collection("users").add({
      email,
      password,
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const qs = await firestore
      .collection("vendors")
      .where("vendorEmail", "==", email)
      .get();

    qs.forEach((doc) => {
      haveStore = doc.data();
    });

    if (haveStore) {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
      } catch (error) {
        await auth.signInWithEmailAndPassword(email, password);
      }
    } else {
      console.log("no tiene tienda asociada");
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, vendorLogin, fbLogin }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };

import { createContext, FC, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebase, googleProvider } from "../services/firebase";

type UserContextType = {
  user: firebase.User | null | undefined;
  login: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const UserProvider: FC = ({ children }) => {
  const [user] = useAuthState(auth);

  const login = async () => {
    await auth.signInWithPopup(googleProvider);
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };

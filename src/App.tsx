import { StoreProvider } from "./context/StoreContext";
import { UserProvider } from "./context/UserContext";
import AppRouter from "./routers/AppRouter";

const App = () => {
  return (
    <UserProvider>
      <StoreProvider>
        <AppRouter />
      </StoreProvider>
    </UserProvider>
  );
};

export default App;

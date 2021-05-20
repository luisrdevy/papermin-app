import { ProductsProvider } from "./context/ProductsContext";
import { StoreProvider } from "./context/StoreContext";
import { UserProvider } from "./context/UserContext";
import AppRouter from "./routers/AppRouter";

const App = () => {
  return (
    <UserProvider>
      <StoreProvider>
        <ProductsProvider>
          <AppRouter />
        </ProductsProvider>
      </StoreProvider>
    </UserProvider>
  );
};

export default App;

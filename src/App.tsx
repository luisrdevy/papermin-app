import { ProductsProvider } from "./context/ProductsContext";
import { SalesProvider } from "./context/SalesContext";
import { StoreProvider } from "./context/StoreContext";
import { UserProvider } from "./context/UserContext";
import AppRouter from "./routers/AppRouter";

const App = () => {
  return (
    <UserProvider>
      <StoreProvider>
        <ProductsProvider>
          <SalesProvider>
            <AppRouter />
          </SalesProvider>
        </ProductsProvider>
      </StoreProvider>
    </UserProvider>
  );
};

export default App;

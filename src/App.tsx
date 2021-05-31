import { CssBaseline } from "@material-ui/core";
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
            <CssBaseline />
            <AppRouter />
          </SalesProvider>
        </ProductsProvider>
      </StoreProvider>
    </UserProvider>
  );
};

export default App;

import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { ProductsProvider } from "./context/ProductsContext";
import { SalesProvider } from "./context/SalesContext";
import { StoreProvider } from "./context/StoreContext";
import { UserProvider } from "./context/UserContext";
import AppRouter from "./routers/AppRouter";

const myTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#20232a",
    },
    secondary: {
      main: "#61dafb",
    },
  },
});

const App = () => {
  return (
    <UserProvider>
      <StoreProvider>
        <ProductsProvider>
          <SalesProvider>
            <CssBaseline />
            <ThemeProvider theme={myTheme}>
              <AppRouter />
            </ThemeProvider>
          </SalesProvider>
        </ProductsProvider>
      </StoreProvider>
    </UserProvider>
  );
};

export default App;

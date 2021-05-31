import { FC, memo } from "react";
import { BrowserRouter, Link, Redirect, Route } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { useUser } from "../context/UserContext";
import UserMinimal from "../components/UserMinimal";
import Ajustes from "../pages/Ajustes";
import CreateStore from "../pages/CreateStore";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Productos from "../pages/Productos";
import Vender from "../pages/Vender";
import Ventas from "../pages/Ventas";

const Router: FC = ({ children }) => {
  const { user } = useUser();
  const store = useStore();
  return (
    <BrowserRouter>
      <header
        style={{
          display: "flex",
          padding: "1rem",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        {store && (
          <p>
            <b>{store.name}</b>
            <br /> <span>{store.slogan}</span>
          </p>
        )}
        <Link to="/">Home</Link>
        <Link to="/vender">Vender</Link>
        <Link to="/ventas">Ventas</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/ajustes">Ajustes</Link>
        {user ? <UserMinimal /> : <Link to="/login">Login</Link>}
      </header>
      <hr />
      <main
        style={{
          margin: "1rem auto",
          width: "90%",
        }}
      >
        <Route exact path="/" component={() => <Home />} />
        <Route
          exact
          path="/vender"
          component={() =>
            user && store ? (
              <Vender />
            ) : user ? (
              <CreateStore />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/ventas"
          component={() =>
            user && store ? (
              <Ventas />
            ) : user ? (
              <CreateStore />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/productos"
          component={() =>
            user && store ? (
              <Productos />
            ) : user ? (
              <CreateStore />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/ajustes"
          component={() =>
            user && store ? (
              <Ajustes />
            ) : user ? (
              <CreateStore />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/login"
          component={() => (user ? <Redirect to="/vender" /> : <Login />)}
        />
      </main>
    </BrowserRouter>
  );
};

const AppRouter: FC = memo(Router);

export default AppRouter;

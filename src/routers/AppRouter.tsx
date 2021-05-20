import { FC, memo } from "react";
import { BrowserRouter, Link, Redirect, Route } from "react-router-dom";
import UserMinimal from "../components/UserMinimal";
import { useStore } from "../context/StoreContext";
import { useUser } from "../context/UserContext";
import Ajustes from "../pages/Ajustes";
import CreateStore from "../pages/CreateStore";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Productos from "../pages/Productos";
import Vender from "../pages/Vender";
import Ventas from "../pages/Ventas";

const Router: FC = () => {
  const { user } = useUser();
  const store = useStore();
  return (
    <BrowserRouter>
      <header style={{ display: "flex" }}>
        {store && (
          <p>
            <b>{store.name}</b> <span>{store.slogan}</span>
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
    </BrowserRouter>
  );
};

const AppRouter: FC = memo(Router);

export default AppRouter;

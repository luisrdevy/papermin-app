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

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Button } from "@material-ui/core";

const Router: FC = () => {
  const { user } = useUser();
  const store = useStore();

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Grid
            justify="space-between"
            alignItems="center"
            container
          >
            <Grid item>
              <Typography variant="h6">
                {store ? 
                  <>
                    <b>
                      <Link to="/" style={{color: 'inherit', textDecoration: 'inherit', marginRight: '1rem'}}>
                        {store.name}
                      </Link>
                    </b>
                    <span>{store.slogan}</span>
                  </>
                : <b>
                    <Link to="/" style={{color: 'inherit', textDecoration: 'inherit', marginRight: '1rem'}}>
                      Papermin
                    </Link>
                  </b>
              }
              </Typography>
            </Grid>
            <Grid item>
              <Grid alignItems="center" container>
                <Grid item>
                  <Link to="/vender" style={{color: 'inherit', textDecoration: 'inherit', marginRight: '2rem'}}>
                    <Button color="inherit">Vender</Button>
                  </Link>
                  <Link to="/ventas" style={{color: 'inherit', textDecoration: 'inherit', marginRight: '2rem'}}>
                    <Button color="inherit">Ventas</Button>
                  </Link>
                  <Link to="/productos" style={{color: 'inherit', textDecoration: 'inherit', marginRight: '2rem'}}>
                    <Button color="inherit">Productos</Button>
                  </Link>
                  <Link to="/ajustes" style={{color: 'inherit', textDecoration: 'inherit', marginRight: '2rem'}}>
                    <Button color="inherit">Ajustes</Button>
                  </Link>
                </Grid>
                <Grid item>
                  <div>
                    {user ? <UserMinimal /> : <Link to="/login" style={{color: 'inherit', textDecoration: 'inherit', marginRight: '2rem'}}>
                        <Button color="inherit">Login</Button>
                      </Link>}
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
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

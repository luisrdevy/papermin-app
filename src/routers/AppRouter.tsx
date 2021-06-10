import { FC, memo, Suspense, useState } from "react";
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

import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  Toolbar,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";

import {
  AccountBalanceWallet,
  Settings,
  ShoppingCart,
  List as ListIcon,
  Home as HomeIcon,
  Menu,
} from "@material-ui/icons";
import Loading from "../components/Loading";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    flexGrow: 1,
  },
  listLink: {
    textDecoration: "none",
    flexGrow: 1,
    color: theme.palette.text.primary,
  },
  drawerTitles: {
    width: "100%",
    maxWidth: 250,
    textAlign: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

const Router: FC = () => {
  const classes = useStyles();
  const { user } = useUser();
  const store = useStore();
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={() => setOpenDrawer(!openDrawer)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu />
          </IconButton>
          {user && store && (
            <Typography variant="h6" className={classes.title}>
              {store.name}
            </Typography>
          )}
          {user ? (
            <UserMinimal />
          ) : (
            <>
              <div className={classes.title}></div>
              <Button color="inherit">
                <Link className={classes.link} to="/login">
                  Iniciar sesion
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        {user && store ? (
          <div className={classes.drawerTitles}>
            <Typography variant="h6">{store.name}</Typography>
            <Typography variant="subtitle1">{store.slogan}</Typography>
          </div>
        ) : (
          <div className={classes.drawerTitles}>
            <Typography variant="h6">Papermin</Typography>
            <Typography variant="subtitle1">
              La forma más fácil de administrar tu papelería
            </Typography>
          </div>
        )}
        <List className={classes.list} onClick={() => setOpenDrawer(false)}>
          <Link to="/" className={classes.listLink}>
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </Link>
          <Link to="/vender" className={classes.listLink}>
            <ListItem button>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText primary="Vender" />
            </ListItem>
          </Link>
          <Link to="/ventas" className={classes.listLink}>
            <ListItem button>
              <ListItemIcon>
                <AccountBalanceWallet />
              </ListItemIcon>
              <ListItemText primary="Ventas" />
            </ListItem>
          </Link>
          <Link to="/productos" className={classes.listLink}>
            <ListItem button>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText primary="Productos" />
            </ListItem>
          </Link>
          {user && user.displayName && (
            <Link to="/ajustes" className={classes.listLink}>
              <ListItem button>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Ajustes" />
              </ListItem>
            </Link>
          )}
        </List>
      </Drawer>

      <Suspense fallback={<Loading />}>
        <Route exact path="/" component={() => <Home />} />
        <main
          style={{
            margin: "1rem auto",
            width: "90%",
          }}
        >
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
      </Suspense>
    </BrowserRouter>
  );
};

const AppRouter: FC = memo(Router);

export default AppRouter;

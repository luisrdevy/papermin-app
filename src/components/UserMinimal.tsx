import {
  Avatar,
  makeStyles,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useState } from "react";
import { useUser } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  name: {
    marginRight: theme.spacing(1),
  },
}));

const UserMinimal = () => {
  const classes = useStyles();
  const { user, logout } = useUser();
  const [openMenu, setOpenMenu] = useState(null as any);
  return (
    <>
      {user && user.displayName ? (
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={(e) => setOpenMenu(e.currentTarget)}
        >
          <Typography variant="subtitle2" className={classes.name}>
            {user.displayName}
          </Typography>
          {user.photoURL && user.displayName ? (
            <Avatar alt={user.displayName} src={user.photoURL} />
          ) : (
            <Avatar>U</Avatar>
          )}
        </div>
      ) : (
        <Typography
          style={{ cursor: "pointer" }}
          variant="h6"
          onClick={(e) => setOpenMenu(e.currentTarget)}
        >
          Vendedor
        </Typography>
      )}
      <Menu
        id="simple-menu"
        anchorEl={openMenu}
        keepMounted
        open={Boolean(openMenu)}
        onClose={() => setOpenMenu(null)}
      >
        <MenuItem onClick={logout}>Cerrar sesion</MenuItem>
      </Menu>
    </>
  );
};

export default UserMinimal;

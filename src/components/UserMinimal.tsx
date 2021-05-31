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
      {user && (
        <div
          style={{ display: "flex", alignItems: "center" }}
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

import { useUser } from "../context/UserContext";
import React from 'react';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Button } from "@material-ui/core";
import { URL } from "url";

const UserMinimal = () => {
  const { user, logout } = useUser();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    {user && (
      <>
        <img
          src={user.photoURL || ""}
          alt={user.displayName || ""}
          className="profile_picture"
          onClick={handleMenu}
        />
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {handleClose(); logout()}}>Cerrar sesión</MenuItem>
        </Menu>
      </>
    )}
    </>
  );
};

export default UserMinimal;

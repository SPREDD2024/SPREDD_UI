import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useState } from "react";
import "./styles.css";
import { Logout } from "@mui/icons-material";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const SignedInNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { user } = useUser();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {user && (
        <div className="icon-group">
          <IconButton>
            <NotificationsIcon color="primary" />
          </IconButton>
          <IconButton onClick={handleClick}>
            <Avatar>
              <img src={user.picture} alt={user.name} className="user-image" />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            className="menu"
            PaperProps={{
              elevation: 0,
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose} className="menu-item">
              <Link href="/api/auth/logout">
                <Button>
                  <Logout fontSize="small" />
                  <span className="logout">Logout</span>
                </Button>
              </Link>
            </MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
};

export default SignedInNavbar;

import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import "./styles.css";
import { Logout } from "@mui/icons-material";
import Link from "next/link";

const SignedInNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="icon-group">
      <IconButton>
        <NotificationsIcon color="primary" />
      </IconButton>
      <IconButton onClick={handleClick}>
        <Avatar>
          <PersonIcon color="primary" />
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
          <Link href="/authenticate">
            <Button>
              <Logout fontSize="small" />
              Logout
            </Button>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SignedInNavbar;

import { Avatar, Button, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useEffect, useState } from "react";
import "./styles.css";
import { Logout } from "@mui/icons-material";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { fetchUserFailure, fetchUserSuccess, setUserFailure, setUserSuccess } from "../../../../../../store/actions/dataActions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CREATE_USER_API_URL, GET_USER_API_URL } from "../../../../../common/constants/apiURLs";

const SignedInNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const { user } = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (user) {
          const response = await axios.get(GET_USER_API_URL + user.email);
          dispatch(fetchUserSuccess({ user: response.data, isAdmin: response.data.role === "admin" }));
        }
      } catch (error) {
        if (error.response && error.response.status === 404 && error.response.data.msg === "User not found") {
          createUser();
        } else {
          dispatch(fetchUserFailure(error));
        }
      }
    };

    const createUser = async () => {
      try {
        if (Object.keys(user).length > 0) {
          const response = await axios.post(CREATE_USER_API_URL, {
            given_name: user.given_name,
            nickname: user.nickname,
            name: user.name,
            picture: user.picture,
            locale: user.locale,
            email: user.email,
            email_verified: user.email_verified,
            sub: user.sub,
            sid: user.sid,
            role: "USER",
          });
          dispatch(fetchUserSuccess({ user: user, isAdmin: false }));
          dispatch(setUserSuccess(response.data));
        }
      } catch (error) {
        dispatch(setUserFailure(error));
      }
    };

    fetchUser();
  }, [user]);
  const userInfo = useSelector((state) => state.user);

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
          {userInfo.isAdmin && (
            <Link href="/admin-dashboard" className="admin-dashboard">
              <Button variant="outlined">Admin Dashboard</Button>
            </Link>
          )}
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

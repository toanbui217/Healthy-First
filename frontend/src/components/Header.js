import React from "react";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import "./Header.css";

function Header() {
  const user = useSelector((state) => state.userReducer);

  return (
    <div className="header">
      <div className="header__left">
        <AllInclusiveOutlinedIcon className="header__icon" />
        <h1>Healthy First</h1>
      </div>

      <div className="header__right">
        <NotificationsNoneRoundedIcon className="notice__icon" />
        <Avatar src={user.avatar_url} />
      </div>
    </div>
  );
}

export default Header;

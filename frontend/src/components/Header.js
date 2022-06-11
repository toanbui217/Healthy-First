import React from "react";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import Avatar from "@mui/material/Avatar";
import "./Header.css";

function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <AllInclusiveOutlinedIcon className="header__icon" />
        <h1>Healthy First</h1>
      </div>

      <div className="header__right">
        <NotificationsNoneRoundedIcon className="notice__icon" />
        <Avatar src={JSON.parse(localStorage.getItem("user")).avatar} />
      </div>
    </div>
  );
}

export default Header;

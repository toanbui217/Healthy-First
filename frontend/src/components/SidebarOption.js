import React from "react";
import { NavLink } from "react-router-dom";
import "./SidebarOption.css";

function SidebarOption({ Icon, text, path }) {
  return (
    <div>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `sidebarOption ${isActive && "sidebarOption--active"}`
        }
      >
        <Icon />
        <h2>{text}</h2>
      </NavLink>
    </div>
  );
}

export default SidebarOption;

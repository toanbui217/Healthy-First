import React, { useState } from "react";
import SidebarOption from "./SidebarOption";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import ViewTimelineRoundedIcon from "@mui/icons-material/ViewTimelineRounded";
import "./Sidebar.css";

function Sidebar() {
  const [collapse, setCollapse] = useState(false);

  const handleCollapse = () => setCollapse(!collapse);

  return (
    <div className={`sidebar ${collapse && "sidebar--collapse"}`}>
      <div className={"sidebar__title"}>
        <h2>Lists</h2>
        {collapse ? (
          <KeyboardDoubleArrowRightRoundedIcon onClick={handleCollapse} />
        ) : (
          <KeyboardDoubleArrowLeftRoundedIcon onClick={handleCollapse} />
        )}
      </div>

      <SidebarOption Icon={HomeRoundedIcon} text={"Home"} path={"/"} />

      <SidebarOption
        Icon={ViewTimelineRoundedIcon}
        text={"Schedule"}
        path={"/schedule"}
      />
      <SidebarOption Icon={InfoRoundedIcon} text={"About"} path={"/about"} />
      <SidebarOption
        Icon={SettingsRoundedIcon}
        text={"Settings"}
        path={"/settings"}
      />
    </div>
  );
}

export default Sidebar;

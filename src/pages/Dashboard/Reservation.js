import React, { useState } from "react";
import ChartBar from "./chart/ChartBar";
import "../shared/style/widget.css";
import TimeAgo from "react-simple-timeago";

function Index(props) {
  let darkMod =
    window.localStorage.getItem("isLight") === "light" ? false : true;
  return (
    <div className={darkMod ? "Widget-dark" : "Widget"}>
      <div className="ItemHeader">
        <span>Most Active Workers</span>
        <div className="NumBtn">50</div>
      </div>
      <ChartBar />
    </div>
  );
}

export default Index;

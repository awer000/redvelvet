import React from "react";
import "./Template.css";
import { Route } from "react-router-dom";
import { AlbumList } from "./pages";
import { NavLink } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";

const menuName = ["All", "Studio Album", "Mini Album", "Single"];
const Menu = menuName.map(value => {
  const activeStyle = {
    color: "#777777"
  };
  return (
    <NavLink
      style={{
        padding: "7rem",
        fontSize: " 1rem",
        cursor: "pointer",
        textDecoration: "none",
        color: "white"
      }}
      key={value}
      exact
      to={
        value === "All"
          ? "/all"
          : value === "Studio Album"
            ? "/studio-album"
            : value === "Mini Album"
              ? "/mini-album"
              : value === "Single"
                ? "/single"
                : undefined
      }
      activeStyle={activeStyle}
      onClick={
        value === "All"
          ? () => console.log("All")
          : value === "Studio Album"
            ? () => console.log("Studio Album")
            : value === "Mini Album"
              ? () => console.log("Mini Album")
              : value === "Single"
                ? () => console.log("Single")
                : undefined
      }
    >
      {value}
    </NavLink>
  );
});

const Template = ({ data }) => {
  return (
    <div>
      <header>hi</header>
      <main>
        <div className="main-image">
          <Route
            path="/:album/:name?"
            render={props => <ReviewPage {...props} data={data} />}
          />
        </div>
        <div className="menu">{Menu}</div>
        <div className="preview">
          <Route
            path="/:name"
            render={props => <AlbumList {...props} data={data} />}
          />
        </div>
      </main>
    </div>
  );
};

export default Template;

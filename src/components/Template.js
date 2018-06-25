import React from "react";
import "./Template.css";
import { Route } from "react-router-dom";
import { AlbumList } from "./pages";
import { NavLink } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
import Clock from "react-live-clock";
import MainImage from "./pages/MainImage";

const menuName = ["All", "Studio Album", "Mini Album", "Single"];
const Menu = menuName.map(value => {
  const activeStyle = {
    color: "white"
  };
  return (
    <NavLink
      style={{
        margin: "7rem",
        fontSize: " 1rem",
        cursor: "pointer",
        textDecoration: "none",
        color: "#fd3a38"
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
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ffd1c3"
        }}
      >
        <img
          style={{
            width: "9rem",
            height: "2rem",
            padding: "0.5rem",
            cursor: "pointer"
          }}
          alt="logo"
          onClick={() => {
            window.location.href = "/";
          }}
          src="https://img.fmnation.net/files/attach/images/425025/032/213/022/e8c44c8b500140cec643291a5d2fecf4.png"
        />
      </header>
      <main>
        <div className="main-image">
          <Route exact path="/" render={props => <MainImage {...props} />} />
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

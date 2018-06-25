주요 기능 안내
===============

구조 요약
---------------

* component
  * pages
    * AlbumList.js => 앨범 아트와 발매일이 나옴
    * MainImage.js => 시간대에 따라서 다른 이미지로 바뀜
    * ReviewPage.js => 앨범 리스트의 앨범을 클릭하면 url params에 따라서 앨범 상세 페이지를 나타냄
  * Template.js => 구조 컴포넌트
  
 
 AlbumList.js 구조
 ----------------
 
```
import React from "react";
import "./Template.css";
import { Route } from "react-router-dom";
import AlbumList from "./pages/AlbumList";
import { NavLink } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
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

```

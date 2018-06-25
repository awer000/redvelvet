> 이 앱은 create-react-app 으로 만들어졌습니다.


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
  
 
 Template.js 구조
 ----------------
 
```
import React from "react";
import "./Template.css";
import { Route } from "react-router-dom";
import AlbumList from "./pages/AlbumList";
import { NavLink } from "react-router-dom";
import ReviewPage from "./pages/ReviewPage";
import MainImage from "./pages/MainImage";

// 메뉴 바를 만들기 위해 메뉴 이름에 쓰일 이름을 배열에 넣고, 그 배열을 map 함수를 이용해 각각의 값에 NavLink를 만들어서 클릭하면 현재 이름에 따라서
// 각각 다른 route로 이동하게 끔 설정함.


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

// Template 컴포넌트. 만들어둔 data.json의 데이터를 props로 받아와서 사용 할 수 있게 함.
// 구조는 크게 header, main으로 나뉘어져 있는데, main은 세부적으로 main-image, menu, preview로 나뉘어져 있음.


const Template = ({ data }) => {
  return (
    <div>
    
    // header의 로고를 클릭하면 첫 화면으로 새로고침 되면서 이동한다.
    
    
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
      
      // main-image 부분은 route를 설정하여, 홈 화면일 경우는 MainImage를 나타나게 했으며, /album/name url이 있을 경우
      // album명과 name에 따라서 각각의 앨범을 소개하는 페이지를 나타내는 ReviewPage를 불러오게 하였다.
      
        <div className="main-image">
          <Route exact path="/" render={props => <MainImage {...props} />} />
          <Route
            path="/:album/:name?"
            render={props => <ReviewPage {...props} data={data} />}
          />
        </div>
        
        //맨 위에 만들어 놓은 Menu 컴포넌트를 불러온다.
        <div className="menu">{Menu}</div>
        
        // preview에서는 route로 앨범명에 따라서 정규, 미니, 싱글 앨범인지 아닌지에 따라서 각각의 리스트를 만들어 놓은 
        // AlbumList 컴포넌트를 불러오게 하였다.
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

AlbumList.js 구조
------------

```
import React from "react";
import "./AlbumList.css";
import { NavLink } from "react-router-dom";

//props 

const AlbumList = ({ match, data }) => {
  const listMaker = album => {
    const albumList = album.map(value => {
      return (
        <NavLink
          to={`${match.url}/${value.name}`}
          key={value.name}
          className="album-item"
          style={{
            fontSize: "0.7rem",
            padding: "1rem",
            textDecoration: "none",
            color: "black"
          }}
        >
          <img
            style={{ width: "10rem", height: "10rem" }}
            src={value.img}
            alt={value.name}
          />
          <div style={{ width: "10rem" }}>
            <p style={{ fontSize: "0.8rem" }}>
              {value.name.length > 22
                ? `${value.name.substring(0, 19)}...`
                : value.name}
            </p>
            <p>발매일: {value.release}</p>
          </div>
        </NavLink>
      );
    });
    return albumList;
  };
  const allList = [
    ...listMaker(data.album.regular),
    ...listMaker(data.album.mini),
    ...listMaker(data.album.single)
  ];
  return (
    <div style={{ padding: "3rem" }}>
      {match.params.name === "all" ? (
        <div style={{ display: "flex", flexWrap: "wrap" }}>{allList}</div>
      ) : match.params.name === "studio-album" ? (
        <div style={{ display: "flex" }}>{listMaker(data.album.regular)}</div>
      ) : match.params.name === "mini-album" ? (
        <div style={{ display: "flex" }}>{listMaker(data.album.mini)}</div>
      ) : match.params.name === "single" ? (
        <div style={{ display: "flex" }}>{listMaker(data.album.single)}</div>
      ) : (
        undefined
      )}
    </div>
  );
};

export default AlbumList;

```

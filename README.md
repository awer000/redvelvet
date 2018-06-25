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

//props로 match, data를 받아와서 사용한다. match는 현재 url의 파라미터를 가져와서 사용할 수가 있다.


const AlbumList = ({ match, data }) => {

  // listMaker 함수를 만든다. 이 함수는 albumList라는 함수를 반환하는데, 
  // 배열인 인자를 받아와서, map함수를 통하여 각 배열의 값을 NavLink컴포넌트로 감싸고,
  // img 태크로 앨범 표지를 나타내고, 발매일이 나와있는 작은 컴포넌트를 리턴하는 함수이다.
  
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
  
  // 메뉴의 All 버튼을 클릭하면 모든 앨범을 나타내야 하므로, allList라는 배열을 따로 만들어서 그 배열 안에 
  // 위에서 만든 listMaker 함수를 적용하여 spread 연산자를 이용해 배열 안에서 각각의 값으로 풀어준다.
  
  const allList = [
    ...listMaker(data.album.regular),
    ...listMaker(data.album.mini),
    ...listMaker(data.album.single)
  ];
  
  // 
  
  // 각각의 조건에 따라서 함수를 호출한다. match.params.name의 값에 따라서 listMaker 함수에 각각 다른 인자를 넣어서
  // 값을 반환하고, 그 값을 렌더링 한다.
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

MainImage.js
------

```
import React from "react";
import moment from "moment";


const MainImage = () => {

  // 시간대에 따라서 각각 다른 이미지를 배경으로 하는 함수를 만들었다. 
  // moment.js 라이브러리를 사용하여, 현재 시간을 확인하고 hh:mm:ss 중 hh에 해당하는 부분만 잘라서 함수에서 사용한다.
  
  const time = moment()
    .format()
    .slice(11, 13);
    
  
  const timeImage = () => {
    if (time >= 6 && time < 11) {
      return "https://t1.daumcdn.net/cfile/tistory/2402BB505962409C33?original";
    } else if (time >= 11 && time < 16) {
      return "https://t1.daumcdn.net/cfile/tistory/2769F24C596240AB40?original";
    } else if (time >= 16 && time < 21) {
      return "https://t1.daumcdn.net/cfile/tistory/2215284E596240BF01?original";
    } else if (time >= 1 && time < 6) {
      return "https://t1.daumcdn.net/cfile/tistory/23451350596241552A?original";
    } else {
      return "https://t1.daumcdn.net/cfile/tistory/21497C4A5962416716?original";
    }
  };
  return (
  
  // 리턴하는 div안에 style을 직접 지정하고, backgroundImage는 백틱 구문을 사용해서 url안에 함수를 사용할 수 있도록 했다.
    <div
      style={{
        width: "100vw",
        height: "35rem",
        backgroundImage: `url(${timeImage()})`,
        backgroundSize: "contain"
      }}
    />
  );
};

export default MainImage;

```


ReviewPage.js
--------

```
import React from "react";

const ReviewPage = ({ match, data }) => {

  //각 메뉴 (All, STUDIO ALBUM, MINI ALBUM, SINGLE) 를 누를때마다 기본 이미지를 다르게 설정하기위해 만든 함수이다.
  //params를 인자로 받아와서, 이 값에 따라서 이미지파일의 url주소를 리턴하는 함수이다.
  
  const urlMaker = params => {
    if (params === "all") {
      return "https://i.pinimg.com/originals/3b/14/51/3b145111d179a9d1594a86e534461887.jpg";
    } else if (params === "mini-album") {
      return "https://i.pinimg.com/originals/bb/ee/96/bbee9677f4fadcbc6add18e59f30c37f.png";
    } else if (params === "studio-album") {
      return "https://i.pinimg.com/originals/eb/9a/41/eb9a4104a9182ec62701566535fdac55.jpg";
    } else if (params === "single") {
      return "https://i.imgur.com/qLm6Lg0.jpg";
    }
  };
  
  // params의 값에 따라서, data에서 가져온 앨범의 정보를 가져오는 함수이다.
  
  const reviewAlbum = album => {
    if (album === "studio-album") {
      const thisAlbum = data.album.regular.find(
        value => value.name === match.params.name
      );
      return thisAlbum;
    } else if (album === "mini-album") {
      const thisAlbum = data.album.mini.find(
        value => value.name === match.params.name
      );
      return thisAlbum;
    } else if (album === "single") {
      const thisAlbum = data.album.single.find(
        value => value.name === match.params.name
      );
      return thisAlbum;
    } else {
      const all = [
        ...data.album.regular,
        ...data.album.mini,
        ...data.album.single
      ];
      const thisAlbum = all.find(value => value.name === match.params.name);
      return thisAlbum;
    }
  };
  
  // 위 함수의 값으로 리턴된 값을 인자로 받아서, 실제 렌더링 할 컴포넌트를 리턴하는 함수이다.
  
  const returnDiv = thisAlbum => {
    return (
      <div
        className="bgBlur"
        key={thisAlbum.name}
        style={{
          display: "flex",
          zIndex: "5",
          width: "100%",
          height: "100%",
          backgroundColor: "white"
        }}
      >
        <div
          className="blur"
          style={{
            backgroundImage: `url(${thisAlbum.img})`,
            width: "inherit",
            height: "35rem",
            zIndex: "10",
            position: "absolute",
            opacity: "0.9",
            filter: "blur(5px)"
          }}
        />
        <div
          className="review"
          style={{ display: "flex", zIndex: "20", color: "#333333" }}
        >
          <div style={{ padding: "2rem", height: "30rem" }}>
            <img
              style={{ width: "20rem" }}
              src={thisAlbum.img}
              alt={thisAlbum.name}
            />
            <h1 style={thisAlbum.name.length > 3 && { fontSize: "2rem" }}>
              {thisAlbum.name}
            </h1>
            <h3>장르: {thisAlbum.genres}</h3>
            <h3>발매일: {thisAlbum.release}</h3>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "1rem",
              backgroundColor: "white",
              height: "30rem",
              opacity: "0.8",
              paddingTop: "1rem"
            }}
          >
            <p
              style={{
                padding: "1.5rem",
                paddingTop: "0",
                fontSize: "0.9rem",
                lineHeight: "160%",
                height: "auto"
              }}
            >
              {thisAlbum.explanation}
            </p>
          </div>
        </div>
      </div>
    );
  };
 
  // 만약 name 파라미터가 없을 경우, 기본 이미지를 리턴하게 하였다.
  // 이때 사용된 함수는 위에서 만든 함수중 urlMaker 함수이다. 
  if (match.params.name === undefined) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          zIndex: "5"
        }}
      >
        <div
          style={{
            width: "inherit",
            height: "35rem",
            position: "absolute",
            zIndex: "10",
            backgroundImage: `
              url(${urlMaker(match.params.album)})
            `,
            backgroundSize: "cover"
          }}
        />
      </div>
    );
  }
 
  // name 파라미터가 있을 경우 아래의 구문이 실행되는데, album 파라미터의 값에 따라서 위에서 만든 두개의 함수를 이용하여 
  // 컴포넌트가 렌더링 되게 만들었다.
  
  if (match.params.album === "studio-album") {
    const thisAlbum = reviewAlbum(match.params.album);
    return returnDiv(thisAlbum);
  } else if (match.params.album === "mini-album") {
    const thisAlbum = reviewAlbum(match.params.album);
    return returnDiv(thisAlbum);
  } else if (match.params.album === "single") {
    const thisAlbum = reviewAlbum(match.params.album);
    return returnDiv(thisAlbum);
  } else {
    const thisAlbum = reviewAlbum(match.params.album);
    return returnDiv(thisAlbum);
  }
};

export default ReviewPage;

```

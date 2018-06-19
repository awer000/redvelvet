import React from "react";

const ReviewPage = ({ match, data }) => {
  if (match.params.name === undefined) {
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

  if (match.params.album === "studio-album") {
    const album = data.album.regular.find(
      value => value.name === match.params.name
    );

    return (
      <div
        className="bgBlur"
        key={album.name}
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
            backgroundImage: `url(${album.img})`,
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
            <img style={{ width: "20rem" }} src={album.img} alt={album.name} />
            <h1 style={album.name.length > 3 && { fontSize: "2rem" }}>
              {album.name}
            </h1>
            <h3>장르: {album.genres}</h3>
            <h3>발매일: {album.release}</h3>
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
              {album.explanation}
            </p>
          </div>
        </div>
      </div>
    );
  } else if (match.params.album === "mini-album") {
    const album = data.album.mini.find(
      value => value.name === match.params.name
    );
    return (
      <div
        key={album.name}
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
            backgroundImage: `url(${album.img})`,
            width: "inherit",
            height: "35rem",
            zIndex: "10",
            position: "absolute",
            opacity: "0.9",
            filter: "blur(5px)"
          }}
        />
        <div className="review" style={{ display: "flex", zIndex: "20" }}>
          <div style={{ padding: "2rem" }}>
            <img style={{ width: "20rem" }} src={album.img} alt={album.name} />
            <h1
              style={
                album.name.length > 17 ? { fontSize: "1.7rem" } : undefined
              }
            >
              {album.name}
            </h1>
            <h3>장르: {album.genres}</h3>
            <h3>발매일: {album.release}</h3>
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
                lineHeight: "170%"
              }}
            >
              {album.explanation}
            </p>
          </div>
        </div>
      </div>
    );
  } else if (match.params.album === "single") {
    const album = data.album.single.find(
      value => value.name === match.params.name
    );
    return (
      <div
        key={album.name}
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
            backgroundImage: `url(${album.img})`,
            width: "inherit",
            height: "35rem",
            zIndex: "10",
            position: "absolute",
            opacity: "0.9",
            filter: "blur(5px)"
          }}
        />
        <div className="review" style={{ display: "flex", zIndex: "20" }}>
          <div style={{ padding: "2rem" }}>
            <img
              style={{ width: "20rem", height: "20rem" }}
              src={album.img}
              alt={album.name}
            />
            <h1
              style={
                album.name.length > 14 ? { fontSize: "1.2rem" } : undefined
              }
            >
              {album.name}
            </h1>
            <h3>장르: {album.genres}</h3>
            <h3>발매일: {album.release}</h3>
          </div>
          <div
            style={{
              display: "flex",
              margin: "1rem",
              backgroundColor: "white",
              height: "30rem",
              opacity: "0.8",
              alignItems: "center",
              paddingTop: "1rem"
            }}
          >
            <p
              style={{
                padding: "1.5rem",
                paddingTop: "0",
                fontSize: "0.9rem",
                lineHeight: "170%"
              }}
            >
              {album.explanation}
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    const all = [
      ...data.album.regular,
      ...data.album.mini,
      ...data.album.single
    ];
    const album = all.find(value => value.name === match.params.name);
    return (
      <div
        className="bgBlur"
        key={album.name}
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
            backgroundImage: `url(${album.img})`,
            width: "inherit",
            height: "35rem",
            zIndex: "10",
            position: "absolute",
            opacity: "0.9",
            filter: "blur(5px)"
          }}
        />
        <div className="review" style={{ display: "flex", zIndex: "20" }}>
          <div style={{ padding: "2rem", height: "30rem" }}>
            <img style={{ width: "20rem" }} src={album.img} alt={album.name} />
            <h1
              style={
                album.name.length > 17 ? { fontSize: "1.2rem" } : undefined
              }
            >
              {album.name}
            </h1>
            <h3>장르: {album.genres}</h3>
            <h3>발매일: {album.release}</h3>
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
              {album.explanation}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default ReviewPage;

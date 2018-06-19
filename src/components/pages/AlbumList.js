import React from "react";
import "./AlbumList.css";
import { NavLink } from "react-router-dom";

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

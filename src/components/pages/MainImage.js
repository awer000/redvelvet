import React from "react";
import moment from "moment";

const MainImage = () => {
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
  console.log(time);
  return (
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

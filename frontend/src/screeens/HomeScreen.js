import React from "react";
import "../styles/home.scss";
import TopBox from "../components/TopBox";
import ChartBox from "../components/ChartBox";
import TotalUsers from "../components/TotalUsers";

const HomeScreen = () => {
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox />
      </div>
      <div className="box box3">
        <TotalUsers />
      </div>
      <div className="box box4">
        <ChartBox />
      </div>
      <div className="box box5">
        <TotalUsers />
      </div>
      <div className="box box6">6</div>
      <div className="box box7">7</div>
      {/* <div className="box box8">8</div>
      <div className="box box9">0000</div> */}
    </div>
  );
};

export default HomeScreen;

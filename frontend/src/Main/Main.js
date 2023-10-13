import React from "react";
import { AiFillProfile, AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./main.scss";
import { menu } from "../components/data";
const Main = () => {
  return (
    <div className="menu">
      <div className="item flex flex-col space-y-3">
        <span className="title text-slate-400">Main</span>

        <Link to="/" className="listItem flex items-center space-x-1">
          <p>
            <AiOutlineHome size={24} className="text-gray-500" />{" "}
          </p>
          <span>Home</span>
        </Link>
        {/* 
        <Link to="/users" className="listItem flex items-center space-x-1">
          <AiFillProfile size={24} className="text-gray-500" />{" "}
          <span>Profile</span>{" "}
        </Link> */}
      </div>

      {/* .......... */}

      {menu.map((list) => (
        <div className="item flex flex-col space-y-3" key={list.id}>
          <span className="title text-slate-400">{list.title}</span>

          {list.listItems.map((listItem) => (
            <Link
              to={listItem.url}
              className="listItem flex items-center space-x-1 "
              key={listItem.id}
            >
              <p>
                <AiOutlineHome size={24} className="text-gray-500" />{" "}
              </p>
              <span className="hidden md:block">{listItem.title}</span>
            </Link>
          ))}

          {/* <Link to="/users" className="listItem flex items-center space-x-1">
            <AiFillProfile size={24} className="text-gray-500" />{" "}
            <span>Profile</span>{" "}
          </Link> */}
        </div>
      ))}
    </div>
  );
};

export default Main;

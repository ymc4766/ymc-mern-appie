import React from "react";

import "../styles/topBox.scss";
import { topDealUsers } from "./data";

const TopBox = () => {
  return (
    <div className="topBox">
      <h3 className="mb-[20px] text-5xl">Top Deals</h3>
      <div className="list">
        {topDealUsers.map((user) => (
          <div
            className="listItem flex items-center justify-between"
            key={user.id}
          >
            <div className="user flex items-center space-x-2 p-4">
              <img
                src={user.img}
                alt={user.name}
                className="w-10  h-10 rounded-full"
              />
              <div className="userTexts">
                <p className="username">{user.username}</p>
                <p className="userEmail text-sm">{user.email}</p>
              </div>
            </div>
            <span>$ {user.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBox;

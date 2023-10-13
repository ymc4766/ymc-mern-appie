import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer } from "recharts";
import { useGetUsersQuery } from "../slices/usersApiSlice";

const TotalUsers = () => {
  const { data: users } = useGetUsersQuery();
  return (
    <div className="chartBox">
      <div className="boxInfo flex flex-col space-y-3">
        <div className="title flex items-center space-x-3 ma-4">
          <AiOutlineUser size={26} />
          <h4 className="text-2xl text-slate-300 text-xlg">Total Users</h4>
        </div>
        <h1 className="text-3xl text-slate-300">{users?.length} users</h1>

        <Link to="/users"> View All</Link>
      </div>

      <div className="chartInfo text-slate-300 ">
        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100}>
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#fff"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span className="percentage">46 %</span>
          <p className="duration">this month </p>
        </div>
      </div>
    </div>
  );
};

export default TotalUsers;

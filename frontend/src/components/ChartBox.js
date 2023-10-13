import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer } from "recharts";

import "../styles/chartBox.scss";
import { useGetProductsQuery } from "../slices/productApiSlice";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const ChartBox = () => {
  const { data: products } = useGetProductsQuery();
  return (
    <div className="chartBox">
      <div className="boxInfo flex flex-col space-y-3">
        <div className="title flex items-center space-x-3 ma-4">
          <AiOutlineUser size={26} />
          <h4 className="text-2xl text-slate-300 text-xlg">Total Products</h4>
        </div>
        <h1 className="text-3xl text-slate-300">{products?.length} products</h1>

        <Link to="/users"> View All</Link>
      </div>

      <div className="chartInfo text-slate-300 ">
        <div className="charts">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data}>
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

export default ChartBox;

import React from "react";
import {
  AiFillSetting,
  AiOutlineExpand,
  AiOutlineSearch,
} from "react-icons/ai";

import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../slices/authSlice";
const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="navbar items-center justify-between text-lg text-bold">
      <div className="logo ">
        <h3>Logo YMC</h3>
      </div>
      <div className="icons space-x-3 ">
        {/* <p>{cartItems.reduce((acc, item) => acc + item * item.qty)} cart</p> */}
        <p className="py-2">
          {" "}
          <Link to="/cart">Cart </Link>
          <span className="mt-[-40px]  bg-blue-500 rounded-full items-center text-slate-100 p-2">
            {" "}
            {cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
          </span>
        </p>
        <p>
          <AiOutlineSearch />{" "}
        </p>
        <p>
          <AiFillSetting />
        </p>
        <p>
          <AiOutlineExpand />
        </p>

        <div className="user space-x-2">
          <img
            className="w-[26px] h-[26px] rounded-full object-cover "
            alt="/"
            src="https://images.pexels.com/photos/2302802/pexels-photo-2302802.jpeg?auto=compress&cs=tinysrgb&w=600"
          />
          <h3 className="text-lg text-slate-300 mr-2">{userInfo?.name}</h3>
        </div>
        {userInfo && (
          <button
            onClick={logoutHandler}
            className="px-4 p-2 bg-violet-400  rounded-lg text-slate-50"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;

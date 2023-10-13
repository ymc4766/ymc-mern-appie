import React from "react";
import { Link } from "react-router-dom";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="mt-12 items-center ">
      <div className="flex items-center space-x-3">
        {step1 ? (
          <Link to="/login">Sign in</Link>
        ) : (
          <Link className="disabled">Sign in</Link>
        )}{" "}
        {step2 ? (
          <Link to="/shipping">Shipping</Link>
        ) : (
          <Link disapled className="text-gray-400 cursor-not-allowed">
            Shipping
          </Link>
        )}
        {step3 ? (
          <Link to="/payment">Payment</Link>
        ) : (
          <Link disapled className="text-gray-400 cursor-not-allowed">
            Payment
          </Link>
        )}
        {step4 ? (
          <Link to="/placeorder">place Order</Link>
        ) : (
          <Link disabled className="text-gray-400 cursor-not-allowed">
            place Order
          </Link>
        )}
      </div>
    </nav>
  );
};

export default CheckOutSteps;

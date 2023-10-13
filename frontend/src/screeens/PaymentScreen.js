import React, { useEffect, useState } from "react";
import CheckOutSteps from "../components/CheckOutSteps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, savePaymentMeth] = useState("PayPal");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }

    if (!userInfo) {
      navigate("/login");
    }
  }, [shippingAddress, userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <div className="flex flex-col space-y-4 py-3">
        <CheckOutSteps step1 step2 step3 />
        <div className="">
          <h3 className="text-2xl font-bold">Payment Method</h3>

          <form
            className="mt-1 flex flex-col space-y-3"
            onSubmit={submitHandler}
          >
            <div className="">
              <input
                id="PayPal"
                value="PayPal"
                type="radio"
                name="paymentMethod"
                className="w-4 h-4 text-slate-300 bg-gray-100 border-gray-300 rounded
           focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-
            focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(e) => savePaymentMeth(e.target.value)}
              />
              <label
                for="link-checkbox"
                className="ml-2 text-lg  font-medium text-slate-300 dark:text-gray-300"
              >
                PayPal or Credit Card .
              </label>
            </div>

            <button className="px-4 bg-blue-400 w-[120px]" type="submit">
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;

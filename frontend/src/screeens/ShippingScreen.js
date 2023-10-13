import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddres } from "../slices/cartSlice";
import CheckOutSteps from "../components/CheckOutSteps";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const { userInfo } = useSelector((state) => state.auth);

  const [address, setAddres] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddres({ address, city, postalCode, country }));
    navigate("/payment");
  };
  return (
    <>
      <div>
        <CheckOutSteps step1 step2 />
      </div>

      <div className="mt-[60px] px-10 py-10 flex justify-center text-slate-200">
        <div className="relative z-0 w-full mb-6 group ">
          {" "}
          <form onSubmit={handleSubmit}>
            <div class="relative z-0 w-full mb-6 group">
              <input
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                type=""
                value={address}
                onChange={(e) => setAddres(e.target.value)}
              />
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm 
               dark:text-gray-400 duration-300 transform -translate-y-6 scale-90 
               top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600
                peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100
                 peer-placeholder-shown:translate-y-0 peer-focus:scale-75
                  peer-focus:-translate-y-6"
              >
                Your Address
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <label
                for="floating_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your City
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
              <label
                for="floating_repeat_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Postal Code
              </label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
              <input
                class="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <label
                for="floating_repeat_password"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Country
              </label>
            </div>

            <button className="px-6 p-2 bg-blue-800 text-yellow-50 ">
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippingScreen;

import React, { useState } from "react";
import { useGetProductDetailQuery } from "../slices/productApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const ProductDetailScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    refetch,
    isLoading,
  } = useGetProductDetailQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };
  return (
    <div className="flex justify-between">
      <div className="flex flex-col space-y-3 text-2xl w-full border-r-[1px] p-2 mr-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <button className="p-2 px-3 bg-blue-400  rounded-lg w-[200px]">
              <Link to="/products">Go Home</Link>
            </button>
            <h3 className="text-4xl px-3 mt-5">{product?.name} Detail</h3>
            <div className="flex items-center space-x-5">
              <div className="">
                <img
                  src={product?.image}
                  className="w-[700px] rounded-xl"
                  alt="/"
                />{" "}
              </div>
              <div className="ml-3 py-3">
                <p className="text-2xl ">{product?.name}</p>
                <h3 className="text-lg mt-2 font-bold">
                  {product?.description}
                </h3>
                <div className="mt-3  border-t border-gray-[1px] ">
                  <h3>Price : $ {product?.price}</h3>
                  <p>{product?.rating} rating</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-[50px] w-[340px] w-full py-3 ">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="bg-slate-200 rounded-lg p-3 text-1xl  text-gray-900 ">
              <h3 className="text-2xl py-3">Price : $ {product?.price}</h3>
              <p className="text-1xl  font-bold">
                status --{" "}
                {product?.countInStock > 0 ? "in Stock" : "not available"}{" "}
              </p>

              {product.countInStock > 0 && (
                <div
                  className="border border-gray-200 px-6 mt-2 p-2 
              w-full flex justify-between items-center"
                >
                  {/* QTY :{" "}
                    <b className=" ">
                      <select
                        multiple
                        id="countries_multiple"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option selected>Choose countries</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </select>
                    </b> */}
                  <label
                    for="countries"
                    className="flex mb-2 text-sm font-medium text-gray-900 
                    dark:text-white"
                  >
                    Select Qty
                  </label>
                  <select
                    id="countries"
                    selected
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
                       rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%]  p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {/* <option
                        selected
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        Choose a Number
                      </option> */}

                    {[...Array(product?.countInStock).keys()].map((x) => (
                      <option value={x + 1} key={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-2">
          <button
            disabled={product?.countInStock === 0}
            className="px-6 p-2 bg-slate-300 text-gray-800 rounded-lg "
            onClick={addToCartHandler}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailScreen;

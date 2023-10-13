import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  // grid grid-1 md:grid-cols-2 lg:grid-cols-3
  //   p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12
  return (
    <div className="w-full">
      <div className="grid gap-12  ">
        {/* Card */}

        <div
          key={product._id}
          className="border border-gray-[1px] p-2 shadow-lg rounded-lg  duration-300"
        >
          <h3 className="text-lg text-slate-200">
            {product.description}

            <button className="bg-violet-500 px-4 ml-2 ">
              <Link to={`/product/${product._id}`}>See More</Link>
            </button>
          </h3>
          <img
            src={product?.image}
            alt={product?.name}
            className="w-full h-[200px] object-cover rounded-t-lg py-2 rounded-md"
          />
          <div className="flex justify-between px-2 py-4">
            <div className="flex items-center space-x-2 text-sm">
              <img src={product.image} alt="/" className="w-8 rounded-full" />
              <div className="text-slate-100">
                <p className="font-bold">{product?.user?.name}</p>
                <p>{product.createdAt.substring(0, 10)} </p>
              </div>
            </div>

            {/* <p>
                <span className="bg-orange-500 text-white p-1 rounded-full">
                  {post.price}
                </span>
              </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

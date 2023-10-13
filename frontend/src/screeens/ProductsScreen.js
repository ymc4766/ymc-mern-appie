import React from "react";

import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productApiSlice";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const ProductsScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  console.log(products);
  // const reversedProducts = products.reverse();
  return (
    <div className="">
      <h1>latest Product</h1>
      {isLoading && <Spinner />}

      {error ? (
        <Message />
      ) : (
        <div className=" grid sm:grid-cols-4 gap-4 items-center">
          {products
            ?.slice(0)
            .reverse()
            .map((product) => (
              <div className="">
                <Product product={product} />
              </div>
            ))}
        </div>
      )}
      {/* <h3 className="text-slate-300 z-40 text-3xl ">{products?.name}</h3> */}
    </div>
  );
};

export default ProductsScreen;

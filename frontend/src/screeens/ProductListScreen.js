import React, { useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

// import ProductsForm from "../components/ProductsForm";
import { toast } from "react-toastify";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../slices/productApiSlice";
import ProductsForm from "../components/ProductForm";

const ProductListScreen = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const { data: products, refetch, isLoading, error } = useGetProductsQuery();

  const [
    createProduct,

    { isLoading: productLoading, error: productErrLoading },
  ] = useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete, error: errorDelete }] =
    useDeleteProductMutation();

  const createProductHandler = async (newProduct) => {
    try {
      await createProduct(newProduct);
      toast.success("Created Succesfully");

      refetch();
      setShowProductForm(false);
    } catch (err) {
      toast.error(err.data?.message || err.error);
    }
  };

  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure")) {
      try {
        await deleteProduct(productId);
        toast.success("succesfuly Deleted Product");
        refetch();
      } catch (err) {
        toast.error(err.data?.message || err.error);
      }
    }
  };

  return (
    <div className="mt-[60px]">
      <div className="py-2 mr-4 flex justify-end">
        <button
          className="px-4 p-2 bg-blue-700 rounded-xl"
          onClick={() => setShowProductForm(true)}
        >
          Create Product
        </button>

        {showProductForm && (
          <ProductsForm
            showProductForm={showProductForm}
            setShowProductForm={setShowProductForm}
            // create={createProductHandler}
            handleSubmitProduct={createProductHandler}
          />
        )}
      </div>
      <div>
        <h1 className="py-3 px-3 text-4xl  text-slate-300">Products List </h1>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <div className="px-4">
            <table
              striped
              bordered
              hover
              responsive
              className="w-full text-xlg font-bold  text-left text-slate-200 dark:text-gray-400"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button variant="light" className="btn-sm mx-2">
                          <FaEdit size={22} />
                        </button>
                      </Link>
                      <button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <FaTrash size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListScreen;

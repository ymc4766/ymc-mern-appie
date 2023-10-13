import React, { useEffect, useState } from "react";
// import {
//   useGetProductDetailsQuery,
//   useUpdateProductMutation,
//   useUploadProductImageMutation,
// } from "../slices/productsApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { toast } from "react-toastify";
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../slices/productApiSlice";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductDetailQuery(productId);

  console.log("prdct ", product);

  const [updateProduct, { isLoading: loadingUpdate, error }] =
    useUpdateProductMutation();

  const [
    uploadProductImage,
    { isLoading: imageLoading, error: errorImageUpload },
  ] = useUploadProductImageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      });
      toast.success("Product updated");
      refetch();
      navigate("/admin/products");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="mt-[60px] w-full ">
      <div className="max-w-[1000px] m-auto py-4">
        <div className="flex items-center justify-between">
          <button className="px-6 bg-slate-600 p-3 rounded-3xl hover:bg-violet-600">
            <Link to="/ad/products">Go Back</Link>
          </button>

          <h1 className="text-4xl text-slate-400  py-2">Update Product</h1>
        </div>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Message>{error.data.message}</Message>
        ) : (
          <form
            layout="vertical"
            onSubmit={handleSubmit}
            enctype="multipart/form-data"
          >
            <div class="mb-6">
              <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="product name"
              />
            </div>
            <div class="mb-6">
              <label
                for="price"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Price"
              />
            </div>
            <div class="mb-6">
              <label
                for="image"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                image {imageLoading && <Spinner />}
              </label>
              <input
                type="file"
                onChange={handleImageUpload}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div class="mb-6">
              <label
                for="prand"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Prand"
              />
            </div>{" "}
            <div class="mb-6">
              <label
                for="countInStock"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Count in stock
              </label>
              <input
                type="number"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Count In stoc"
              />
            </div>
            <div class="mb-6">
              <label
                for="category"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Category"
              />
            </div>{" "}
            <div class="mb-6">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                description
              </label>
              <input
                type=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Description"
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-6 bg-violet-700 p-2 rounded-lg"
                type="submit"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditScreen;

import React, { useState } from "react";
import { Col, Form, message, Modal, Row } from "antd";
import { useUploadProductImageMutation } from "../slices/productApiSlice";
import { toast } from "react-toastify";

const ProductsForm = ({
  showProductForm,
  setShowProductForm,
  handleSubmitProduct,
  create,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [
    uploadProductImage,
    { isLoading: imageLoading, error: errorImageUpload },
  ] = useUploadProductImageMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProduct = {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };

    handleSubmitProduct(newProduct);

    setName("");
    setPrice("");
    setBrand("");
    setCategory("");
    setCountInStock("");
    setDescription("");
  };

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
    <Modal
      //   title={type === "add" ? "add bus" : "edit bus"}
      type="add"
      visible={showProductForm}
      onCancel={() => {
        setShowProductForm(false);
      }}
      footer={false}
      width={700}
    >
      <form layout="vertical" onSubmit={handleSubmit}>
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
            image
          </label>
          <input
            type="file"
            // value={image}
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
          <button className="px-6 bg-violet-700 p-2 rounded-lg" type="submit">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductsForm;

// <Row gutter={[10, 10]}>
// <Col lg={24} xs={24}>
//   <Form.Item label="Bus Name" name="name">
//     <input type="text" />
//   </Form.Item>
// </Col>
// <Col lg={12} xs={24}>
//   <Form.Item label="Product Name" name="name">
//     <input type="text" />
//   </Form.Item>
// </Col>
// <Col lg={12} xs={24}>
//   <Form.Item label="Product Price" name="price">
//     <input type="text" />
//   </Form.Item>
// </Col>
// <Col lg={12} xs={24}>
//   <Form.Item label="Product image" name="image">
//     <input type="file" />
//   </Form.Item>
// </Col>{" "}
// <Col lg={12} xs={24}>
//   <Form.Item label="Brand" name="brand">
//     <input type="text" />
//   </Form.Item>
// </Col>
// <Col lg={8} xs={24}>
//   <Form.Item label="Count In Stoc" name="countInStock">
//     <input type="date" />
//   </Form.Item>
// </Col>{" "}
// <Col lg={8} xs={24}>
//   <Form.Item label="Category" name="category">
//     <input type="text" />
//   </Form.Item>
// </Col>{" "}
// <Col lg={8} xs={24}>
//   <Form.Item label="description" name="description">
//     <input type="text" />
//   </Form.Item>
// </Col>
// </Row>

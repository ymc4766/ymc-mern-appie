import React, { useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../slices/usersApiSlice";

const UsersListScreen = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete, error: errorDelete }] =
    useDeleteUserMutation();

  //   const createProductHandler = async (newProduct) => {
  //     try {
  //       await createProduct(newProduct);
  //       toast.success("Created Succesfully");

  //       refetch();
  //       setShowProductForm(false);
  //     } catch (err) {
  //       toast.error(err.data?.message || err.error);
  //     }
  //   };

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure")) {
      try {
        const res = await deleteUser(userId);
        toast.success(res?.data?.message);
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
          Create User
        </button>
        {/* 
        {showProductForm && (
          <ProductsForm
            showProductForm={showProductForm}
            setShowProductForm={setShowProductForm}
            // create={createProductHandler}
            // handleSubmitProduct={createProductHandler}
          />
        )} */}
      </div>
      <div>
        <h1 className="py-3 px-3 text-4xl  text-slate-300">Users List </h1>
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
              className="w-full text-xlg text-left text-gray-100 dark:text-gray-400"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>Email</th>
                  <th>Clearance</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>${user.email}</td>

                    <td>{user?.isAdmin ? "admin" : "user"}</td>
                    <td>
                      <Link to={`/ad/users/${user._id}/edit`}>
                        <button variant="light" className="btn-sm mx-2">
                          <FaEdit size={22} />
                        </button>
                      </Link>
                      <button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user._id)}
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

export default UsersListScreen;

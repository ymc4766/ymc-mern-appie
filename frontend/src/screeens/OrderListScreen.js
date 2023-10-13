import React from "react";
// import { useGetOrdersQuery } from "../slices/orderApiSlice";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import { useGetOrdersQuery } from "../slices/orderSliceApi";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  console.log("orders ", orders);

  return (
    <div className="mt-[60px]">
      <div>
        <h1 className="py-3 px-3 text-4xl  text-slate-300">Orders List </h1>
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
              className="w-full text-sm text-left text-slate-300 text-lg dark:text-gray-400"
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.user && order.user.name}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button variant="light" className="btn-sm">
                          Details
                        </button>
                      </Link>
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

export default OrderListScreen;

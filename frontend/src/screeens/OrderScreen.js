import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Spinner from "../components/Spinner";
import Message from "../components/Message";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/orderSliceApi";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: deliverLoading }] =
    useDeliverOrderMutation();

  console.log(order);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      if (order && !order?.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  // TESTING ONLY! REMOVE BEFORE PRODUCTION
  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();

    toast.success("Order is paid");
  }
  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order?.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }
  function onError(err) {
    toast.error(err.message);
  }

  const deliverHAndler = async () => {
    try {
      await deliverOrder(orderId);
      toast.success("Order Succesfully Delivered ...");
      // navigate("ad/orders");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div>
      <div className="mt-[60px]">
        {isLoading ? <Spinner /> : error && <h3>{error}</h3>}
        <h3 className="ml-4 "> order -- {order?._id}</h3>

        <div className="grid grid-cols-2 gap-5 py-6 px-5">
          <div>
            <h1>Shipping</h1>
            <b> User -- {order?.user?.name}</b>
            <p>Email -- {order?.user?.email}</p>
            <h3>
              Address --
              {order?.shippingAddress.address} {order?.shippingAddress.city}{" "}
              {order?.shippingAddress.country}
            </h3>

            <Message
              classes={order?.isDelivered ? "bg-green-300 " : "bg-red-200"}
              txtClr={order?.isDelivered ? "text-gray-800" : "text-red-800"}
            >
              <p>
                {order?.isDelivered
                  ? `Delivered at ${order?.deliveredAt}`
                  : "not Delivered"}
              </p>
            </Message>

            <h3>payment Method -- {order?.paymentMethod}</h3>
            <Message
              classes={order?.isPaid ? "bg-green-300 " : "bg-red-200"}
              txtClr={order?.isPaid ? "text-slate-600" : "text-red-500"}
            >
              <p>{order?.isPaid ? `Paid on ${order.paidAt}` : "not Paid"}</p>
            </Message>

            <div className="border-t-[1px] border-b-[1px] border-gray-600 py-4 px-4">
              <h1 className="text-2xl text-slate-500 p-2">Order Items --</h1>
              {order?.orderItems?.map((item) => (
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    className="w-22 h-20 rounded-lg "
                    alt="/"
                  />
                  <h3 className="text-lg underline">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </h3>
                  <b className="text-sm">
                    {item.qty} x {item.price} = $ {item.qty * item.price}
                  </b>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-4xl text-gray-400">Order Summery </h1>
            <div className="border-[2px] border-blue-400 py-4 px-5">
              <b>price -- {order?.itemsPrice}</b>
              <p>shipping -- {order?.shippingPrice}</p>
              <p>Tax -- {order?.taxPrice}</p>
              <p>Total -- {order?.totalPrice}</p>
            </div>

            <div className="flex justify-end py-4">
              {!order?.isPaid && (
                <>
                  {loadingPay && <Spinner />}
                  {isPending && <Spinner />}

                  <div className="">
                    <button
                      className="px-5 p-2 bg-blue-700 rounded-xl"
                      onClick={onApproveTest}
                    >
                      Test Pay Order
                    </button>

                    <div className="mt-3">
                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div>
              {userInfo &&
                userInfo.isAdmin &&
                order?.isPaid &&
                !order?.isDelivered && (
                  <div className="flex items-center space-x-5">
                    <button
                      type="button"
                      onClick={deliverHAndler}
                      className="px-6 bg-violet-700 py-2 rounded-xl  justify-end"
                    >
                      {" "}
                      Make Deliver{" "}
                    </button>
                    {deliverLoading && <Spinner />}
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;

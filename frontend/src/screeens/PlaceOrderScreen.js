import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps";
import { toast } from "react-toastify";
// import { useCreateOrderMutation } from "../slices/orderApiSlice";
import Spinner from "../components/Spinner";
import { clearCartItems } from "../slices/cartSlice";
import { useCreateOrderMutation } from "../slices/orderSliceApi";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart?.shippingAddress?.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      console.log(res);

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div>
        <CheckOutSteps step1 step2 step3 step4 />

        <div className="grid grid-cols-2 justify-between gap-2">
          <div className="">
            <div className="flex flex-col space-y-3">
              <div className="py-2  border-b-[4px]">
                <h2> Shipping address : -</h2>
                <b className="text-sm text-semibold">
                  {cart.shippingAddress.address} {cart.shippingAddress.city}{" "}
                  {cart.shippingAddress.country}{" "}
                </b>
              </div>

              <h4 className="border-b-[2px] py-3">
                payment Method : - <b>{cart.paymentMethod}</b>{" "}
              </h4>
              <div>
                <h1>Order Items</h1>

                {cart.cartItems.length === 0 ? (
                  <h3>Your cart is Empty !</h3>
                ) : (
                  <div>
                    {cart?.cartItems?.map((item, index) => (
                      <div
                        key={item._id}
                        className="flex items-center space-x-3 p-1"
                      >
                        <img
                          width={80}
                          className="rounded-lg"
                          src={item.image}
                          alt={item.name}
                        />

                        <h4 className="text-sm underline">
                          <Link to={`/product/${item._id}`}>{item.name}</Link>{" "}
                        </h4>

                        <b className="text-sm">
                          {item.qty} x {item.price} = $ {item.qty * item.price}
                        </b>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col space-y-4 lg:ml-5 border-[1px] border-gray-500 py-6 px-3">
              <h3 className="text-4xl font-bold">Order Summery</h3>

              <h4 className="border-b-[1.7px] border-slate-400 p-2">
                Items Price = <span>{cart?.itemsPrice}</span>
              </h4>

              <h3 className="border-b-[1.4px] border-slate-400 p-2">
                Shipping Price = {cart?.shippingPrice}
              </h3>
              <h6 className="border-b-[1px] border-slate-400 p-2">
                Tax = {cart?.taxPrice}
              </h6>

              <h2 className="text-lg text-blue-600">
                Total : - {cart?.totalPrice}
              </h2>

              {error && (
                <b className="text-red-600 font-bold text-lg py-3">{error}</b>
              )}

              <div className=" flex justify-end">
                {isLoading && <Spinner />}
                <button
                  type="button"
                  className="text-lg px-10 py-2 bg-gray-500 hover:bg-violet-500 rounded-2xl"
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;

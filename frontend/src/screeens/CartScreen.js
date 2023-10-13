import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const [qty, setQty] = useState();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCarthandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOuthandler = () => {
    navigate("/shipping");
  };

  return (
    <div className="grid grid-rows-2 grid-flow-col gap-4 mt-[50px] py-6 px-6">
      <div className="row-span-3 ">
        <h1
          className="text-4xl my-2 text-slate-
      850"
        >
          Shopping Cart
        </h1>
        {cartItems.length === 0 && (
          <h4>
            Your Cart is Empty{" "}
            <Link to="/products" className="underline">
              Go back
            </Link>
          </h4>
        )}

        <div>
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <div className=" bg-slate-100 text-gray-700 rounded-lg  m-2 border-b-[1px] border-gray-400 ">
                <div className="flex items-center space-x-4 w-full">
                  {" "}
                  <img
                    className="w-24  rounded-lg"
                    src={item.image}
                    alt={item.name}
                  />
                  <Link
                    to={`/product/${item._id}`}
                    className="underline cursor-pointer"
                  >
                    <h3 className="text-lg font-bold">{item.name}</h3>
                  </Link>
                  <p className="font-bold text-gray-400 flex"> ${item.price}</p>
                  <span>
                    <select
                      id="countries"
                      selected
                      value={item.qty}
                      onChange={(e) =>
                        addToCarthandler(item, Number(e.target.value))
                      }
                      className="px-6 p-2 border-nne hover:border-b-[2px]"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </span>
                  <button onClick={() => removeFromCartHandler(item._id)}>
                    <AiOutlineDelete size={18} />{" "}
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="col-span-2 py-10 rounded-lg bg-gray-200 border-[2px] text-gray-800 flex flex-col my-3 border-gray-400 px-4">
        <h3 className=" border-2 border-gray-400 py-5">
          {cartItems.length && (
            <p className="px-4">
              Total {cartItems.reduce((acc, item) => acc + item.qty, 0)} Items
            </p>
          )}
        </h3>
        <b className="py-4 border-[2px]- border-gray-100 ">
          $ (
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
          )
        </b>
        <div className="w-80">
          <button
            type="button"
            className={
              cartItems.length === 0
                ? "px-8 py-3 text-white bg-gray-600 rounded focus:outline-none disabled:opacity-75"
                : "px-10 bg-blue-600 py-2 rounded-full "
            }
            onClick={checkOuthandler}
          >
            proceed to check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;

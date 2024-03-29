import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModal.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingPrice,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingAddress,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400).json({ message: "No Order Items" });
  } else {
    const order = new Order({
      orderItems: orderItems?.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(201).json(orders);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "email name"
  );

  if (order) {
    res.status(201).json(order);
  } else {
    res.status(400);
    throw new Error("not Found !");
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "email , name");
  res.json(orders);
});
export { addOrderItems, getMyOrders, getOrderById, getOrders };

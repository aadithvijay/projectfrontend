import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiService from "../services/apiService";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  // FETCH USER ORDERS
  const fetchOrders = async () => {
    try {
      const response = await apiService(
        "GET",
        "/api/orders/myorders"
      );

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // PAGE ANIMATION
  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        staggerChildren: 0.15,
      },
    },
  };

  // CARD ANIMATION
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="p-10 min-h-screen relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* OVERLAY */}
      <div className="fixed inset-0 bg-black/40 -z-10" />
      

      {/* GLOW EFFECTS */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

      {/* HEADING */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold mb-10 text-white drop-shadow-lg"
      >
        My Orders
      </motion.h1>

      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-2xl text-gray-500">
            No Orders Found
          </h2>
        </motion.div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: {
                  duration: 0.2,
                },
              }}
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 hover:shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300"
            >
              {/* ORDER HEADER */}
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    Order #
                    {order._id
                      .slice(-8)
                      .toUpperCase()}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex gap-4 flex-wrap">
                  {/* PAYMENT STATUS */}
                  <motion.span
                    whileHover={{
                      scale: 1.08,
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.isPaid
                      ? "Paid"
                      : "Unpaid"}
                  </motion.span>

                  {/* ORDER STATUS */}
                  <motion.span
                    whileHover={{
                      scale: 1.08,
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md ${
                      order.orderStatus ===
                      "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus ===
                          "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.orderStatus ===
                          "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.orderStatus}
                  </motion.span>
                </div>
              </div>

              {/* ORDER ITEMS */}
              <div className="space-y-4">
                {order.orderItems.map((item) => (
                  <motion.div
                    key={item._id}
                    whileHover={{
                      scale: 1.02,
                    }}
                    className="flex items-center gap-6 border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-all duration-300"
                  >
                    <motion.img
                      whileHover={{
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      src={item.product?.image}
                      alt={item.product?.title}
                      className="w-24 h-24 object-cover rounded-lg shadow"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {item.product?.title}
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Quantity:{" "}
                        {item.quantity}
                      </p>

                      <p className="font-bold mt-2 text-indigo-600">
                        Rs.{" "}
                        {item.product?.price?.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="text-right mt-6 pt-4 border-t border-gray-100">
                <motion.h2
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  className="text-2xl font-bold text-gray-800"
                >
                  Total: Rs.{" "}
                  {Number(
                    order.totalPrice
                  ).toLocaleString()}
                </motion.h2>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default MyOrders;
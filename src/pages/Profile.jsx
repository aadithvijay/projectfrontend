import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiService from "../services/apiService";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));

    if (storedUser) {
      setUser(storedUser);
    }

    fetchOrders();
  }, []);

  // FETCH ORDERS (UPDATED STYLE)
  const fetchOrders = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));

      const endpoint = storedUser?.isAdmin
        ? "/api/orders"
        : "/api/orders/myorders";

      const response = await apiService("GET", endpoint);

      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <div className="p-10 text-2xl">Loading...</div>;
  }

  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="p-10 min-h-screen relative"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
  >
    

    <motion.h1
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="text-5xl font-bold mb-12 text-white drop-shadow-lg"
    >
      My Profile
    </motion.h1>

    {/* USER CARD */}
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 mb-12 max-w-xl"
    >
      {user.isAdmin ? (
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl px-6 py-4 mb-8 flex items-center gap-4"
        >
          <span className="text-4xl">👑</span>
          <div>
            <p className="text-xl font-bold">
              Administrator
            </p>
            <p className="text-purple-200 text-sm">
              You have full access to manage the platform
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl px-6 py-4 mb-8 flex items-center gap-4"
        >
          <span className="text-4xl">🛍️</span>
          <div>
            <p className="text-xl font-bold">
              Customer
            </p>
            <p className="text-blue-100 text-sm">
              Welcome back! Happy shopping.
            </p>
          </div>
        </motion.div>
      )}

      <h2 className="text-3xl font-bold mb-6">
        Account Details
      </h2>

      <div className="space-y-3">
        <p className="text-xl font-semibold">
          👤 {user.name}
        </p>

        <p className="text-xl font-semibold">
          📧 {user.email}
        </p>

        <p className="text-xl font-semibold">
          🔐 {user.isAdmin ? "Admin" : "User"}
        </p>
      </div>
    </motion.div>

    {/* ORDERS */}
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10"
    >
      <h2 className="text-3xl font-bold mb-8">
        {user.isAdmin
          ? "All Orders"
          : "My Orders"}
      </h2>

      {orders.length === 0 ? (
        <motion.p
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="text-xl text-gray-500"
        >
          No orders placed yet.
        </motion.p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-4">#</th>
                <th className="p-4">Order ID</th>

                {user.isAdmin && (
                  <th className="p-4">
                    Customer
                  </th>
                )}

                <th className="p-4">Items</th>
                <th className="p-4">Total</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
                <th className="p-4">
                  Order Status
                </th>
                <th className="p-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <motion.tr
                  key={order._id}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    backgroundColor:
                      "rgba(249,250,251,0.8)",
                    scale: 1.002,
                  }}
                  className="border-b"
                >
                  <td className="p-4">
                    {index + 1}
                  </td>

                  <td className="p-4 text-sm text-gray-500">
                    {order._id
                      .slice(-8)
                      .toUpperCase()}
                  </td>

                  {user.isAdmin && (
                    <td className="p-4">
                      {order.user?.name ||
                        "Deleted User"}
                    </td>
                  )}

                  <td className="p-4">
                    <ul>
                      {order.orderItems.map(
                        (item, i) => (
                          <li key={i}>
                            {
                              item.product
                                ?.title
                            }{" "}
                            x{" "}
                            {
                              item.quantity
                            }
                          </li>
                        )
                      )}
                    </ul>
                  </td>

                  <td className="p-4 font-semibold">
                    Rs.{" "}
                    {Number(
                      order.totalPrice
                    ).toLocaleString()}
                  </td>

                  <td className="p-4">
                    {order.paymentMethod}
                  </td>

                  <td className="p-4">
                    <span
                      className={`font-semibold ${
                        order.isPaid
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.isPaid
                        ? "Paid"
                        : "Unpaid"}
                    </span>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
                      {order.orderStatus ||
                        "Pending"}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </motion.div>
  </motion.div>
);
}

export default Profile;
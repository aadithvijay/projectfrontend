import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  //FETCH USER 

  useEffect(() => {

    const storedUser = JSON.parse(
      localStorage.getItem("userInfo")
    );

    if (storedUser) {
      setUser(storedUser);
    }

    fetchOrders();

  }, []);

  //FETCH ORDERS 

  const fetchOrders = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("userInfo"));

      // ADMIN: fetch all orders, USER: fetch own orders
      const endpoint = storedUser?.isAdmin
        ? "/orders"
        : "/orders/myorders";
      const { data } = await API.get(endpoint);
      setOrders(data);

    } 
    catch (error) {
      console.log(error);
    }

  };

  //LOADING 

  if (!user) {
    return (
      <div className="p-10 text-2xl">
        Loading...
      </div>
    );
  }

  return (

    <div
      className="p-10 min-h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >

      {/* HEADING  */}

      <h1 className="text-5xl font-bold mb-12 text-white drop-shadow-lg">
        My Profile
      </h1>

      {/* USER INFO CARD */}

      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-10 mb-12 max-w-xl">

        {/* ACCOUNT TYPE BANNER */}

        {user.isAdmin ? (
          <div className="bg-purple-600 text-white rounded-xl px-6 py-4 mb-8 flex items-center gap-4">
            <span className="text-4xl">
              👑
            </span>

            <div>

              <p className="text-xl font-bold">
                Administrator
              </p>

              <p className="text-purple-200 text-sm">
                You have full access to manage the platform
              </p>

            </div>

          </div>

        ) : (

          <div className="bg-blue-500 text-white rounded-xl px-6 py-4 mb-8 flex items-center gap-4">

            <span className="text-4xl">
              🛍️
            </span>

            <div>

              <p className="text-xl font-bold">
                Customer
              </p>

              <p className="text-blue-100 text-sm">
                Welcome back! Happy shopping.
              </p>

            </div>

          </div>

        )}

        <h2 className="text-3xl font-bold mb-6">
          Account Details
        </h2>

        {/* NAME */}

        <div className="mb-6">

          <p className="text-gray-500 text-sm mb-1">
            Full Name
          </p>

          <p className="text-xl font-semibold">
            {user.name}
          </p>

        </div>

        {/* EMAIL */}

        <div className="mb-6">

          <p className="text-gray-500 text-sm mb-1">
            Email Address
          </p>

          <p className="text-xl font-semibold">
            {user.email}
          </p>

        </div>

        {/* ROLE */}

        <div>

          <p className="text-gray-500 text-sm mb-1">
            Role
          </p>

          <p className="text-xl font-semibold">
            {user.isAdmin ? "Admin" : "User"}
          </p>

        </div>

      </div>

      {/* ORDERS SECTION */}

      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-10">

        <h2 className="text-3xl font-bold mb-8">
          {user.isAdmin ? "All Orders" : "My Orders"}
        </h2>

        {orders.length === 0 ? (

          <p className="text-xl text-gray-500">
            No orders placed yet.
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left border-collapse">

              <thead>

                <tr className="bg-gray-100 text-gray-700">

                  <th className="p-4 border-b font-semibold">
                    #
                  </th>

                  <th className="p-4 border-b font-semibold">
                    Order ID
                  </th>

                  {/* SHOW CUSTOMER COLUMN FOR ADMIN ONLY */}
                  {user.isAdmin && (
                    <th className="p-4 border-b font-semibold">
                      Customer
                    </th>
                  )}

                  <th className="p-4 border-b font-semibold">
                    Items
                  </th>

                  <th className="p-4 border-b font-semibold">
                    Total
                  </th>

                  <th className="p-4 border-b font-semibold">
                    Payment Mode
                  </th>

                  <th className="p-4 border-b font-semibold">
                    Payment Status
                  </th>

                  <th className="p-4 border-b font-semibold">
                    Order Status
                  </th>

                  <th className="p-4 border-b font-semibold">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order, index) => (

                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 border-b transition-colors duration-200"
                  >

                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4 text-sm text-gray-500">
                      {order._id.slice(-8).toUpperCase()}
                    </td>

                    {/* CUSTOMER NAME — ADMIN ONLY */}
                    {user.isAdmin && (
                      <td className="p-4 text-sm text-gray-700">
                        {order.user?.name || "Deleted User"}
                      </td>
                    )}

                    <td className="p-4">
                      <ul className="space-y-1">
                        {order.orderItems.map((item, i) => (
                          <li key={i} className="text-sm text-gray-700">
                            {item.product?.title || "Product Deleted"} x {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td className="p-4 font-semibold">
                      Rs. {Number(order.totalPrice).toLocaleString()}
                    </td>

                    <td className="p-4 text-gray-600">
                      {order.paymentMethod}
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.orderStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : order.orderStatus === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.orderStatus || "Pending"}
                      </span>
                    </td>

                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
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

}

export default Profile;
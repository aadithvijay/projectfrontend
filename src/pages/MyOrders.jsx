import { useEffect, useState } from "react";
import API from "../services/api";

function MyOrders() {

  const [orders, setOrders] = useState([]);

  // FETCH USER ORDERS 

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders/myorders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

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

      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/40 -z-10"
      />

      <h1 className="text-5xl font-bold mb-10 text-white drop-shadow-lg">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="bg-white bg-opacity-90 p-10 rounded-2xl shadow">
          <h2 className="text-2xl text-gray-500">No Orders Found</h2>
        </div>

      ) : (

        <div className="space-y-8">
          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-8"
            >

              {/* ORDER HEADER */}
              <div className="flex justify-between items-center mb-6">

                <div>
                  <h2 className="text-2xl font-bold">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h2>
                  <p className="text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* STATUS BADGES */}
                <div className="flex gap-4">

                  {/* PAYMENT STATUS */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      order.isPaid
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </span>

                  {/* DELIVERY STATUS */}
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      order.orderStatus === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.orderStatus === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : order.orderStatus === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                </div>

              </div>

              {/* ORDER ITEMS */}
              <div className="space-y-4">
                {order.orderItems.map((item) => (

                  <div
                    key={item._id}
                    className="flex items-center gap-6 border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-all duration-300"
                  >

                    {/* PRODUCT IMAGE */}
                    <img
                      src={item.product?.image}
                      alt={item.product?.title}
                      className="w-24 h-24 object-cover rounded-lg shadow"
                    />

                    {/* PRODUCT INFO */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {item.product?.title}
                      </h3>
                      <p className="text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>
                      <p className="font-bold mt-2">
                        Rs. {item.product?.price?.toLocaleString()}
                      </p>
                    </div>

                  </div>

                ))}
              </div>

              {/* TOTAL */}
              <div className="text-right mt-6 pt-4 border-t border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">
                  Total: Rs. {Number(order.totalPrice).toLocaleString()}
                </h2>
              </div>

            </div>

          ))}
        </div>

      )}

    </div>

  );
}

export default MyOrders;
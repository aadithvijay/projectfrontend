import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import apiService from "../services/apiService";

// REGISTER CHART

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [deletingOrderId, setDeletingOrderId] = useState(null);

  // FETCH DASHBOARD DATA

  const fetchDashboardData = async () => {
    try {
      const productsRes = await apiService("GET", "/api/products");
      setProducts(productsRes.data);

      const ordersRes = await apiService("GET", "/api/orders");
      setOrders(ordersRes.data);

      const usersRes = await apiService("GET", "/api/users");
      setUsers(usersRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // UPDATE ORDER STATUS

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await apiService("PUT", `/api/orders/${orderId}`, {
        orderStatus: newStatus,
      });
      fetchDashboardData();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE ORDER

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) return;

    try {
      setDeletingOrderId(orderId);
      await apiService("DELETE", `/api/orders/${orderId}`);
      fetchDashboardData();
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingOrderId(null);
    }
  };

  // SALES REVENUE

  const salesRevenue = orders.reduce((acc, order) => {
    return acc + Number(order.totalPrice || 0);
  }, 0);

  // INVENTORY VALUE

  const inventoryValue = products.reduce((acc, product) => {
    return acc + Number(product.price || 0);
  }, 0);

  // CHART DATA

  const chartData = {
    labels: ["Users", "Products", "Orders"],
    datasets: [
      {
        label: "HomeScape Analytics",
        data: [users.length, products.length, orders.length],
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",
          "rgba(34, 197, 94, 0.7)",
          "rgba(251, 146, 60, 0.7)",
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(251, 146, 60, 1)",
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // CHART OPTIONS

  const chartOptions = {
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

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
      {/* HEADING */}

      <h1 className="text-5xl font-bold mb-12 text-white drop-shadow-lg">
        Admin Dashboard
      </h1>

      {/* DASHBOARD CARDS */}

      <div className="grid md:grid-cols-5 gap-6 mb-12">

        {/* USERS */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3">Users</h2>
          <p className="text-5xl font-semibold text-indigo-500">
            {users.length}
          </p>
        </div>

        {/* PRODUCTS */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3">Products</h2>
          <p className="text-5xl font-semibold text-green-500">
            {products.length}
          </p>
        </div>

        {/* ORDERS */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3">Orders</h2>
          <p className="text-5xl font-semibold text-orange-500">
            {orders.length}
          </p>
        </div>

        {/* SALES REVENUE */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3">Sales Revenue</h2>
          <p className="text-3xl font-semibold text-blue-500">
            Rs. {salesRevenue.toLocaleString()}
          </p>
        </div>

        {/* INVENTORY VALUE */}
        <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3">Inventory Value</h2>
          <p className="text-3xl font-semibold text-pink-500">
            Rs. {inventoryValue.toLocaleString()}
          </p>
        </div>

      </div>

      {/* CHART SECTION */}

      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-10 mb-12">

        <h2 className="text-3xl font-bold mb-8">Website Analytics</h2>

        {/* COLOR LEGEND */}
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-indigo-500"></div>
            <span className="text-gray-600">Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500"></div>
            <span className="text-gray-600">Products</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-orange-400"></div>
            <span className="text-gray-600">Orders</span>
          </div>
        </div>

        <Bar data={chartData} options={chartOptions} />

      </div>

      {/* ORDERS TABLE */}

      <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-lg p-10">
        <h2 className="text-3xl font-bold mb-8">All Orders</h2>

        {orders.length === 0 ? (
          <p className="text-xl text-gray-500">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">

              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-4 border-b font-semibold">#</th>
                  <th className="p-4 border-b font-semibold">Order ID</th>
                  <th className="p-4 border-b font-semibold">Customer</th>
                  <th className="p-4 border-b font-semibold">Email</th>
                  <th className="p-4 border-b font-semibold">Items</th>
                  <th className="p-4 border-b font-semibold">Total</th>
                  <th className="p-4 border-b font-semibold">Payment</th>
                  <th className="p-4 border-b font-semibold">Status</th>
                  <th className="p-4 border-b font-semibold">Date</th>
                  <th className="p-4 border-b font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 border-b transition-colors duration-200"
                  >
                    <td className="p-4">{index + 1}</td>

                    <td className="p-4 text-sm text-gray-500">
                      {order._id.slice(-8).toUpperCase()}
                    </td>

                    <td className="p-4 font-semibold">
                      {order.user?.name || "N/A"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {order.user?.email || "N/A"}
                    </td>

                    <td className="p-4">
                      <ul className="space-y-1">
                        {order.orderItems.map((item, i) => (
                          <li key={i} className="text-sm text-gray-700">
                            {item.product?.title || "Product Deleted"} x{" "}
                            {item.quantity}
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
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                        className={`px-3 py-2 rounded-lg font-semibold outline-none ${
                          order.orderStatus === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.orderStatus === "Cancelled"
                            ? "bg-red-100 text-red-700"
                            : order.orderStatus === "Shipped"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    {/* DELETE BUTTON */}

                    <td className="p-4">
                      <button
                        onClick={() => deleteOrder(order._id)}
                        disabled={deletingOrderId === order._id}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white text-sm font-semibold rounded-lg transition-colors duration-200"
                      >
                        {deletingOrderId === order._id ? (
                          <>
                            <svg
                              className="animate-spin w-4 h-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              />
                            </svg>
                            Deleting...
                          </>
                        ) : (
                          <>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1-1H9a1 1 0 00-1 1H5a1 1 0 000 2h14a1 1 0 000-2h-3z"
                              />
                            </svg>
                            Delete
                          </>
                        )}
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
}

export default AdminDashboard;
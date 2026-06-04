import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import apiService from "../services/apiService";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const response = await apiService("GET", "/api/cart");
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (id) => {
    try {
      await apiService("DELETE", `/api/cart/${id}`);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await apiService("PUT", `/api/cart/${id}`, {
        quantity,
      });
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      item.product
        ? acc + item.product.price * item.quantity
        : acc,
    0
  );

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
      }}
    >
     

      <div className="relative z-10 p-10">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-10 text-white drop-shadow-lg"
        >
          Shopping Cart
        </motion.h1>

        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl max-w-xl"
          >
            <h2 className="text-3xl font-bold text-gray-700">
              Cart is Empty
            </h2>
          </motion.div>
        ) : (
          <>
            {/* CART ITEMS */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {cartItems.map(
                (item) =>
                  item.product && (
                    <motion.div
                      key={item._id}
                      variants={itemVariants}
                      whileHover={{
                        y: -6,
                        scale: 1.01,
                      }}
                      className="flex items-center gap-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl"
                    >
                      <motion.img
                        whileHover={{
                          scale: 1.08,
                        }}
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-36 h-36 object-cover rounded-xl"
                      />

                      <div className="flex-1">
                        <h2 className="text-3xl font-bold">
                          {item.product.title}
                        </h2>

                        <p className="text-gray-600">
                          Category: {item.product.category}
                        </p>

                        <p className="text-2xl font-semibold text-indigo-600">
                          Rs.{" "}
                          {item.product.price.toLocaleString()}
                        </p>

                        {/* QUANTITY */}
                        <div className="flex items-center gap-4 mt-4">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity - 1
                              )
                            }
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl transition-all"
                          >
                            -
                          </motion.button>

                          <span className="text-2xl font-bold">
                            {item.quantity}
                          </span>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              updateQuantity(
                                item._id,
                                item.quantity + 1
                              )
                            }
                            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl transition-all"
                          >
                            +
                          </motion.button>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{
                          scale: 1.08,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() => removeItem(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all"
                      >
                        Remove
                      </motion.button>
                    </motion.div>
                  )
              )}
            </motion.div>

            {/* TOTAL SECTION */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
              }}
              className="mt-10 flex justify-end"
            >
              <motion.div
                whileHover={{
                  scale: 1.02,
                }}
                className="bg-white/90 backdrop-blur-md p-8 rounded-2xl min-w-[350px] shadow-2xl"
              >
                <h2 className="text-4xl font-bold mb-6">
                  Total: Rs.{" "}
                  {totalPrice.toLocaleString()}
                </h2>

                <motion.button
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  onClick={handleCheckout}
                  className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-2xl shadow-lg transition-all"
                >
                  Proceed To Checkout
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default Cart;
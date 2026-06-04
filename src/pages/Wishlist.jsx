import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiService from "../services/apiService";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // FETCH WISHLIST
  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const response = await apiService("GET", "/api/wishlist");
      setWishlist(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // REMOVE ITEM
  const removeItem = async (id) => {
    try {
      await apiService("DELETE", `/api/wishlist/${id}`);
      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  // ADD TO CART
  const addToCart = async (productId) => {
    try {
      await apiService("POST", "/api/cart", {
        product: productId,
        quantity: 1,
      });

      alert("Added to cart 🛒");
    } catch (error) {
      console.log(error);
      alert("Failed to add to cart");
    }
  };

  // PAGE ANIMATION
  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
      },
    },
  };

  // LOADING STATE
  if (loading) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen p-10 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      
    

      <div className="relative z-10">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-12 text-white drop-shadow-xl"
        >
          My Wishlist ❤️
        </motion.h1>

        {wishlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white/90 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-xl"
          >
            <h2 className="text-3xl text-gray-600 font-semibold">
              Wishlist is Empty 💔
            </h2>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {wishlist.map((item, index) => {
              if (!item.product) return null;

              return (
                <motion.div
                  key={item._id}
                  initial={{
                    opacity: 0,
                    y: 50,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.03,
                  }}
                  className="bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)] transition-all duration-300"
                >
                  {/* IMAGE */}
                  <div className="overflow-hidden">
                    <motion.img
                      whileHover={{
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-full h-72 object-cover"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <h2 className="text-2xl font-bold mb-3">
                      {item.product.title}
                    </h2>

                    <p className="text-3xl font-bold text-indigo-600 mb-4">
                      ₹ {item.product.price.toLocaleString()}
                    </p>

                    <div className="flex gap-4">

                      {/* ADD TO CART */}
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          addToCart(item.product._id)
                        }
                        className="flex-1 bg-black hover:bg-gray-900 text-white py-3 rounded-xl shadow-lg transition-all"
                      >
                        Add To Cart 🛒
                      </motion.button>

                      {/* REMOVE */}
                      <motion.button
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          removeItem(item._id)
                        }
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl shadow-lg transition-all"
                      >
                        Remove
                      </motion.button>

                    </div>

                  </div>
                </motion.div>
              );
            })}

          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Wishlist;
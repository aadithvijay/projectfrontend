import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import apiService from "../services/apiService";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const response = await apiService(
        "GET",
        `/api/products?search=${search}&category=${category}&sort=${sort}`
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort]);

  // ADD TO CART
  const addToCart = async (productId) => {
    try {
      await apiService("POST", "/api/cart", {
        product: productId,
        quantity: 1,
      });

      alert("Product added to cart");
    } catch (error) {
      console.log(error);
      alert("Please login first");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen overflow-hidden bg-gray-50"
    >
      {/* HERO */}
      <div
        className="relative h-screen flex items-center justify-center text-center px-6"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/interior-design-modern-living-room-with-brown-sofa_887552-9821.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        

        <motion.div
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-8xl font-extrabold mb-6 text-white drop-shadow-2xl"
          >
            HomeScape
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-200 mb-10"
          >
            Modern Furniture and Luxury Home Decor
          </motion.p>

          <motion.a
            href="#products"
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 10px 30px rgba(255,255,255,0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold text-lg shadow-2xl"
          >
            Shop Now
          </motion.a>
        </motion.div>
      </div>

      {/* FILTER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-6 md:px-10 py-5 shadow-xl"
      >
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            <option value="Living Room">Living Room</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Office">Office</option>
            <option value="Dining Room">Dining Room</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Decour">Decour</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Newest First</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </motion.div>

     
{/* PRODUCTS */}

<div id="products" className="px-10 py-16">

  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="text-6xl font-bold mb-16 text-center text-gray-800"
  >
    Our Collection
  </motion.h2>

  {products.length === 0 ? (

    <div className="text-center py-20">
      <p className="text-3xl text-gray-400">
        No Products Found
      </p>
    </div>

  ) : (

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

      {products.map((product, index) => (

        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: index * 0.08,
            duration: 0.6,
          }}
          whileHover={{
            y: -15,
            scale: 1.03,
          }}
          className="group relative bg-white rounded-[30px] overflow-hidden shadow-xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-500"
        >

          {/* IMAGE */}
          <div className="relative overflow-hidden h-80">

            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-500">
              Premium
            </div>

          </div>

          {/* CONTENT */}
          <div className="p-7">

            <div className="flex justify-between items-center mb-2">

              <span className="text-xs font-bold text-indigo-600 uppercase tracking-[3px]">
                {product.category}
              </span>

              <span className="text-yellow-500 font-semibold">
                ⭐ {product.rating?.toFixed(1) || 0}
              </span>

            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-1">
              {product.title}
            </h2>

            <p className="text-gray-500 mb-5 line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex justify-between items-center mb-6">

              <div>
                <p className="text-3xl font-bold text-gray-900">
                  ₹ {product.price.toLocaleString()}
                </p>

                <p className="text-sm text-gray-400">
                  {product.numReviews || 0} reviews
                </p>
              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3">

              <Link
                to={`/product/${product._id}`}
                className="flex-1"
              >
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-xl bg-black text-white font-semibold hover:bg-gray-800 transition-all"
                >
                  View Details
                </motion.button>
              </Link>

              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 12px 30px rgba(79,70,229,0.35)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(product._id)}
                className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all"
              >
                Add To Cart
              </motion.button>

            </div>

          </div>

        </motion.div>

      ))}

    </div>

  )}

</div>
    </motion.div>
  );
}

export default Home;
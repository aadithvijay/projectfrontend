import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

function Home() {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  //  FETCH PRODUCTS 

  const fetchProducts = async () => {
    try {
      const { data } = await API.get(
        `/products?search=${search}&category=${category}&sort=${sort}`
      );
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort]);

  //  ADD TO CART 

  const addToCart = async (productId) => {
    try {
      await API.post("/cart", {
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
    <div className="min-h-screen overflow-hidden">

      {/*  HERO SECTION  */}

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
        
        {/* HERO CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >

          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-7xl font-extrabold mb-6 text-white drop-shadow-2xl"
          >
            HomeScape
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-2xl text-gray-200 mb-10"
          >
            Modern Furniture and Luxury Home Decor
          </motion.p>

          <motion.a
            href="#products"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-gray-200 transition-all duration-300 inline-block"
          >
            Shop Now
          </motion.a>

        </motion.div>

      </div>

      {/* BELOW HERO */}

      <div className="bg-white bg-opacity-90">

        {/*  FILTER SECTION */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="sticky top-0 z-20 bg-white/90 backdrop-blur-md shadow-xl px-10 py-5"
        >
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 bg-white shadow-md"
            />

            {/* CATEGORY */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 bg-white shadow-md appearance-none"
            >
              <option value="">All Categories</option>
              <option value="Living Room">Living Room</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Office">Office</option>
              <option value="Dining Room">Dining Room</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Decour">Decour</option>
            </select>

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 bg-white shadow-md appearance-none"
            >
              <option value="">Newest First</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>

          </div>
        </motion.div>

        {/*  PRODUCTS  */}

        <div id="products" className="px-10 py-16">

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl font-bold mb-14 text-center text-gray-800"
          >
            Our Collection
          </motion.h2>

          {products.length === 0 ? (

            <div className="text-center py-20">
              <p className="text-3xl text-gray-400">No Products Found</p>
            </div>

          ) : (

            <div className="grid md:grid-cols-3 gap-10">
              {products.map((product, index) => (

                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                >

                  {/* IMAGE */}
                  <div className="overflow-hidden h-80">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
                      {product.category}
                    </span>

                    <h2 className="text-2xl font-bold mt-2 mb-3 text-gray-800">
                      {product.title}
                    </h2>

                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex justify-between items-center mb-5">
                      <p className="text-3xl font-bold text-gray-900">
                        Rs. {product.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-yellow-500 font-semibold">
                        {product.rating?.toFixed(1) || 0} ({product.numReviews || 0} reviews)
                      </p>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-3">

                      <Link to={`/product/${product._id}`} className="flex-1">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold"
                        >
                          View Details
                        </motion.button>
                      </Link>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => addToCart(product._id)}
                        className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 font-semibold"
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

        {/* FOOTER*/}

        <footer className="bg-black text-white text-center py-8 mt-10">
          <p className="text-gray-400 text-lg">
            2025 HomeScape. All rights reserved.
          </p>
        </footer>

      </div>

      {/*  STYLES  */}

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

    </div>
  );
}

export default Home;
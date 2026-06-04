import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import apiService from "../services/apiService";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await apiService("GET", "/api/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await apiService(
          "PUT",
          `/api/products/${editingId}`,
          formData
        );
        alert("Product Updated ✅");
      } else {
        await apiService(
          "POST",
          "/api/products",
          formData
        );
        alert("Product Added ✅");
      }

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });

      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await apiService("DELETE", `/api/products/${id}`);
      alert("Product Deleted ❌");
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (product) => {
    setEditingId(product._id);

    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
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
          Admin Products 🛒
        </motion.h1>

        {/* FORM */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          onSubmit={handleSubmit}
          className="grid gap-5 mb-12 bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl"
        >
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-4 rounded-xl transition-all duration-300 focus:scale-[1.02] focus:shadow-lg outline-none"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-4 rounded-xl transition-all duration-300 focus:scale-[1.02] focus:shadow-lg outline-none"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-4 rounded-xl transition-all duration-300 focus:scale-[1.02] focus:shadow-lg outline-none"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border p-4 rounded-xl transition-all duration-300 focus:scale-[1.02] focus:shadow-lg outline-none"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border p-4 rounded-xl transition-all duration-300 focus:scale-[1.02] focus:shadow-lg outline-none"
            required
          />

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="bg-black text-white py-4 rounded-xl shadow-lg"
          >
            {editingId ? "Update Product" : "Add Product"}
          </motion.button>
        </motion.form>

        {/* PRODUCTS LIST */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                scale: 1.01,
              }}
              transition={{
                duration: 0.2,
              }}
              className="flex justify-between items-center bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl"
            >
              <div className="flex items-center gap-6">
                <motion.img
                  whileHover={{
                    scale: 1.08,
                  }}
                  src={product.image}
                  alt={product.title}
                  className="w-28 h-28 object-cover rounded-2xl"
                />

                <div>
                  <h2 className="text-2xl font-bold">
                    {product.title}
                  </h2>

                  <p className="text-indigo-600 font-semibold">
                    ₹ {product.price}
                  </p>

                  <p className="text-gray-500">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <motion.button
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => editProduct(product)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl shadow-lg transition-all"
                >
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl shadow-lg transition-all"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.div>
  );
}

export default AdminProducts;
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";

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

  // FETCH PRODUCTS

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");
      setProducts(data);
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // HANDLE CHANGE 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // UPDATE PRODUCT
      if (editingId) {
        await API.put(
          `/products/${editingId}`,
          formData
        );
        alert("Product Updated ✅");
      }

      // ADD PRODUCT
      else {
        await API.post(
          "/products",
          formData
        );
        alert("Product Added ✅");
      }

      // RESET FORM

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
      });

      setEditingId(null);
      fetchProducts();

    } 
    catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // DELETE PRODUCT 

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      alert("Product Deleted ❌");
      fetchProducts();
    } 
    catch (error) {
      console.log(error);
    }

  };

  //  EDIT PRODUCT 

  const editProduct = (product) => {
    setEditingId(product._id);

    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  return (

    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
      }}
    >

      {/* CONTENT */}

      <div className="relative z-10 p-10">

        {/*  HEADING  */}

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-10 text-white drop-shadow-lg"
        >
          Admin Products 🛒
        </motion.h1>

        {/* FORM  */}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid gap-5 mb-12 bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl"
        >

          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleChange}
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
            required
          />

          {/* BUTTON */}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-black text-white py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 font-semibold text-lg shadow-lg"
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </motion.button>

        </motion.form>

        {/*  PRODUCTS  */}

        <div className="space-y-6">

          {products.map((product, index) => (

            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.01,
              }}
              className="flex justify-between items-center bg-white/90 backdrop-blur-lg p-5 rounded-3xl shadow-2xl border border-white/30"
            >

              {/* PRODUCT INFO */}

              <div className="flex items-center gap-6">

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-28 h-28 object-cover rounded-2xl shadow-lg"
                />

                <div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    {product.title}
                  </h2>

                  <p className="text-lg text-indigo-600 font-semibold mt-1">
                    ₹ {product.price}
                  </p>

                  <p className="text-gray-500 mt-1">
                    {product.category}
                  </p>

                </div>

              </div>

              {/* ACTION BUTTONS */}

              <div className="flex gap-4">

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    editProduct(product)
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl transition-all duration-300 shadow-lg"
                >
                  Edit
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    deleteProduct(product._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition-all duration-300 shadow-lg"
                >
                  Delete
                </motion.button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default AdminProducts;
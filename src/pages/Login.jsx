import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import apiService from "../services/apiService";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await apiService(
        "POST",
        "/api/auth/login",
        formData
      );

      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      );

      alert("Login Successful ✅");
      navigate("/");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex justify-center items-center bg-cover bg-center px-5 relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/featured/furniture-background-1p8lqahjzvgac2vw.jpg')",
      }}
    >
      

      {/* GLOW EFFECTS */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/20 rounded-full blur-3xl" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />

      {/* LOGIN CARD */}
      <motion.form
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.85,
          rotateX: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        whileHover={{
          y: -8,
        }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-8 text-center text-white"
        >
          Welcome Back
        </motion.h2>

        {/* EMAIL */}
        <motion.input
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-white/20 text-white placeholder-gray-200 border border-white/20 p-4 mb-5 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/25 transition-all duration-300"
          required
        />

        {/* PASSWORD */}
        <motion.input
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          type="password"
          name="password"
          placeholder="Enter Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-white/20 text-white placeholder-gray-200 border border-white/20 p-4 mb-6 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white/25 transition-all duration-300"
          required
        />

        {/* LOGIN BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 15px 30px rgba(250,204,21,0.4)",
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
          }}
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-yellow-300 disabled:bg-yellow-200 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </motion.button>

        {/* REGISTER LINK */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-200 mt-5"
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-yellow-400 font-semibold hover:underline"
          >
            Register here
          </Link>
        </motion.p>

        {/* FOOTER TEXT */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-200 mt-3"
        >
          <motion.span
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
          >
            HomeScape Furniture Store 🛋️
          </motion.span>
        </motion.p>
      </motion.form>
    </motion.div>
  );
}

export default Login;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // HANDLE CHANGE 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  //HANDLE LOGIN 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/login",
        formData
      );

      // SAVE TOKEN

      localStorage.setItem(
        "token",
        data.token
      );

      // SAVE USER INFO

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

    }

  };

  return (

    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center px-5"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/featured/furniture-background-1p8lqahjzvgac2vw.jpg')",
      }}
    >

      {/* LOGIN CARD */}

      <motion.form

        initial={{
          opacity: 0,
          y: 60,
          scale: 0.9,
        }}

        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}

        transition={{
          duration: 0.7,
        }}

        onSubmit={handleSubmit}

        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-2xl"

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

          className="w-full bg-white/20 text-white placeholder-gray-200 border border-white/20 p-4 mb-5 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all"

          onChange={handleChange}

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

          className="w-full bg-white/20 text-white placeholder-gray-200 border border-white/20 p-4 mb-6 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-400 transition-all"

          onChange={handleChange}

          required

        />

        {/* BUTTON */}

        <motion.button

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          transition={{
            type: "spring",
            stiffness: 300,
          }}

          type="submit"

          className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-yellow-300 transition-all duration-300"

        >

          Login

        </motion.button>

        {/* EXTRA TEXT */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}

          className="text-center text-gray-200 mt-6"

        >

          HomeScape Furniture Store 🛋️

        </motion.p>

      </motion.form>

    </div>

  );

}

export default Login;
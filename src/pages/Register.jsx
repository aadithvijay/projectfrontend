import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import apiService from "../services/apiService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await apiService(
        "POST",
        "/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data)
      );

      alert("Registration Successful ✅");
      navigate("/");
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Registration Failed. Please try again."
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
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative overflow-hidden px-5"
      style={{
        backgroundImage:
          "url('https://tse2.mm.bing.net/th/id/OIP.5itUYj3V2goENnkkry64mQHaEJ?r=0&pid=ImgDet&w=474&h=265&rs=1&o=7&rm=3')",
      }}
    >
      

      {/* GLOW EFFECTS */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl" />

      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />

      {/* REGISTER CARD */}
      <motion.form
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.85,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
        }}
        whileHover={{
          y: -8,
        }}
        onSubmit={handleRegister}
        className="relative z-10 w-full max-w-md p-10 rounded-3xl backdrop-blur-2xl bg-white/10 border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        {/* HEADING */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-bold mb-8 text-center text-white"
        >
          Create Account ✨
        </motion.h2>

        {/* NAME */}
        <motion.input
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full bg-white/20 text-white placeholder-gray-200 border border-white/30 p-4 mb-5 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-300 focus:bg-white/25 transition-all duration-300"
          required
        />

        {/* EMAIL */}
        <motion.input
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-white/20 text-white placeholder-gray-200 border border-white/30 p-4 mb-5 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-300 focus:bg-white/25 transition-all duration-300"
          required
        />

        {/* PASSWORD */}
        <motion.input
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-white/20 text-white placeholder-gray-200 border border-white/30 p-4 mb-6 rounded-2xl outline-none focus:ring-2 focus:ring-cyan-300 focus:bg-white/25 transition-all duration-300"
          required
        />

        {/* REGISTER BUTTON */}
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 15px 30px rgba(34,211,238,0.4)",
          }}
          whileTap={{
            scale: 0.95,
          }}
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-400 text-black py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-cyan-300 disabled:bg-cyan-200 disabled:cursor-not-allowed transition-all duration-300"
        >
          {loading
            ? "Registering..."
            : "Register"}
        </motion.button>

        {/* LOGIN LINK */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-gray-200 mt-5"
        >
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-300 font-semibold hover:underline"
          >
            Login here
          </Link>
        </motion.p>

        {/* FOOTER */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-gray-200 mt-3"
        >
          <motion.span
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            Join HomeScape and start shopping 🛋️
          </motion.span>
        </motion.p>
      </motion.form>
    </motion.div>
  );
}

export default Register;
import { useState } from "react";
import { motion } from "framer-motion";
import API from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //REGISTER

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("REGISTER SUCCESS:", data);
      alert("Registration Successful ✅");

    } 
    catch (error) {

      console.log(
        error.response?.data || error.message
      );

      alert("Registration Failed ❌");

    }

  };

  return (

    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://tse2.mm.bing.net/th/id/OIP.5itUYj3V2goENnkkry64mQHaEJ?r=0&pid=ImgDet&w=474&h=265&rs=1&o=7&rm=3')",
      }}
    >

      {/* ================= REGISTER CARD ================= */}

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
          ease: "easeOut",
        }}

        onSubmit={handleRegister}

        className="relative z-10 w-full max-w-md p-10 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-2xl"

      >

        {/*  HEADING */}

        <motion.h2

          initial={{
            opacity: 0,
            y: -20,
          }}

          animate={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            delay: 0.2,
          }}

          className="text-4xl font-bold mb-8 text-center text-white"

        >

          Create Account ✨

        </motion.h2>

        {/*NAME */}

        <motion.input

          whileFocus={{
            scale: 1.03,
          }}
          type="text"
          placeholder="Name"
          value={name}

          onChange={(e) =>
            setName(e.target.value)
          }

          className="w-full bg-white/20 text-white placeholder-gray-200 border border-white/30 p-4 mb-5 rounded-xl outline-none focus:ring-2 focus:ring-white transition-all duration-300"

          required

        />

        {/* EMAIL  */}

        <motion.input

          whileFocus={{
            scale: 1.03,
          }}

          type="email"
          placeholder="Email"
          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          className="w-full bg-white/20 text-white placeholder-gray-200 border border-white/30 p-4 mb-5 rounded-xl outline-none focus:ring-2 focus:ring-white transition-all duration-300"

          required

        />

        {/* PASSWORD */}

        <motion.input

          whileFocus={{
            scale: 1.03,
          }}
          type="password"
          placeholder="Password"
          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          className="w-full bg-white/20 text-white placeholder-gray-200 border border-white/30 p-4 mb-6 rounded-xl outline-none focus:ring-2 focus:ring-white transition-all duration-300"

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

          type="submit"

          className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300 shadow-lg"

        >

          Register

        </motion.button>

        {/*FOOTER TEXT */}

        <motion.p

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          transition={{
            delay: 0.5,
          }}

          className="text-center text-gray-200 mt-6"

        >

          Join HomeScape and start shopping 🛋️

        </motion.p>

      </motion.form>

    </div>

  );
}

export default Register;
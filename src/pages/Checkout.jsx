import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import apiService from "../services/apiService";

function Checkout() {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [step, setStep] = useState(1);

  // STEP 1 - CHOOSE PAYMENT
  const handlePaymentSelect = (method) => {
    setPaymentMethod(method);
  };

  // STEP 2 - PROCEED
  const handleProceed = (e) => {
    e.preventDefault();

    if (!shippingAddress) {
      alert("Please enter shipping address");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    setStep(2);
  };

  // PLACE COD ORDER
  const placeCODOrder = async () => {
    try {
      await apiService(
        "POST",
        "/api/orders",
        {
          shippingAddress,
          paymentMethod: "COD",
        }
      );

      alert("Order Placed Successfully");
      navigate("/myorders");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  // PLACE STRIPE ORDER
  const placeStripeOrder = async () => {
    try {
      const cartResponse = await apiService(
        "GET",
        "/api/cart"
      );

      const cartItems = cartResponse.data;

      const response = await apiService(
        "POST",
        "/api/payment/create-checkout-session",
        {
          cartItems,
          shippingAddress,
        }
      );

      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Stripe payment failed"
      );
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

  // STEP SWITCHING ANIMATION
  const stepVariants = {
    hidden: {
      opacity: 0,
      x: 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      x: -40,
      transition: {
        duration: 0.3,
      },
    },
  };

  // CARD HOVER EFFECT
  const cardHover = {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  };

  // BUTTON EFFECTS
  const buttonHover = {
    scale: 1.03,
  };

  const buttonTap = {
    scale: 0.96,
  };

  return (
  <motion.div
    variants={pageVariants}
    initial="hidden"
    animate="visible"
    className="flex justify-center items-center min-h-screen p-10 relative overflow-hidden"
    style={{
      backgroundImage:
        "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
  >
    

    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7 }}
      whileHover={cardHover}
      className="relative z-10 w-full max-w-xl bg-white/90 backdrop-blur-md shadow-2xl p-10 rounded-3xl hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] transition-all duration-300"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold mb-2 text-center text-gray-800"
      >
        Checkout
      </motion.h1>

      <p className="text-center text-gray-500 mb-8">
        {step === 1
          ? "Fill in your details"
          : "Confirm your order"}
      </p>

      {/* STEP INDICATOR */}
      <div className="flex items-center justify-center gap-4 mb-10">

        <motion.div
          animate={{
            scale: step >= 1 ? 1.1 : 1,
          }}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
            step >= 1 ? "bg-black" : "bg-gray-300"
          }`}
        >
          1
        </motion.div>

        <div
          className={`flex-1 h-1 rounded transition-all duration-500 ${
            step >= 2 ? "bg-black" : "bg-gray-300"
          }`}
        />

        <motion.div
          animate={{
            scale: step >= 2 ? 1.1 : 1,
          }}
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
            step >= 2 ? "bg-black" : "bg-gray-300"
          }`}
        >
          2
        </motion.div>

      </div>

      <AnimatePresence mode="wait">

        {/* STEP 1 */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <label className="block text-gray-700 font-semibold mb-2">
              Shipping Address
            </label>

            <motion.textarea
  whileTap={{ scale: 1.01 }}
  placeholder="Enter your full shipping address..."
  rows="4"
  value={shippingAddress}
  onChange={(e) =>
    setShippingAddress(e.target.value)
  }
  className="w-full border p-4 rounded-xl mb-8 outline-none focus:shadow-lg focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
/>

            <label className="block text-gray-700 font-semibold mb-4">
              Select Payment Method
            </label>

            <div className="grid grid-cols-2 gap-4 mb-8">

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  handlePaymentSelect("COD")
                }
                className={`cursor-pointer border-2 rounded-2xl p-6 text-center transition-all duration-300 ${
                  paymentMethod === "COD"
                    ? "border-black bg-black text-white shadow-xl"
                    : "border-gray-200 bg-white"
                }`}
              >
                💵 Cash on Delivery
              </motion.div>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -4,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() =>
                  handlePaymentSelect("Stripe")
                }
                className={`cursor-pointer border-2 rounded-2xl p-6 text-center transition-all duration-300 ${
                  paymentMethod === "Stripe"
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-xl"
                    : "border-gray-200 bg-white"
                }`}
              >
                💳 Stripe Payment
              </motion.div>

            </div>

            <motion.button
              whileHover={buttonHover}
              whileTap={buttonTap}
              onClick={handleProceed}
              className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl shadow-lg transition-all"
            >
              Proceed
            </motion.button>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 p-6 rounded-2xl mb-8"
            >
              <p>
                <b>Address:</b> {shippingAddress}
              </p>

              <p>
                <b>Payment:</b> {paymentMethod}
              </p>
            </motion.div>

            {paymentMethod === "COD" ? (
              <motion.button
                whileHover={buttonHover}
                whileTap={buttonTap}
                onClick={placeCODOrder}
                className="w-full bg-black hover:bg-gray-900 text-white py-4 rounded-xl shadow-lg transition-all"
              >
                Confirm Order
              </motion.button>
            ) : (
              <motion.button
                whileHover={{
                  scale: 1.03,
                  boxShadow:
                    "0 10px 25px rgba(79,70,229,0.4)",
                }}
                whileTap={buttonTap}
                onClick={placeStripeOrder}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl shadow-lg transition-all"
              >
                Pay with Stripe
              </motion.button>
            )}

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              onClick={() => setStep(1)}
              className="w-full mt-4 border py-4 rounded-xl bg-white hover:bg-gray-50 transition-all"
            >
              Back
            </motion.button>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  </motion.div>
);
}
export default Checkout;
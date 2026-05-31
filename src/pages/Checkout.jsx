import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

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

      await API.post("/orders", {
        shippingAddress,
        paymentMethod: "COD",
      });

      alert("Order Placed Successfully");

      navigate("/myorders");

    } catch (error) {
      console.log(error);
      alert("Something went wrong");

    }

  };

  //PLACE STRIPE ORDER

  const placeStripeOrder = async () => {

    try {

      // FETCH CART ITEMS
      const { data: cartItems } =
        await API.get("/cart");

      // CREATE STRIPE SESSION
      const response = await API.post(
        "/payment/create-checkout-session",
        {
          cartItems,
          shippingAddress,
        }
      );

      // REDIRECT TO STRIPE
      window.location.href =
        response.data.url;

    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        "Stripe payment failed"
      );

    }

  };

  return (

    <div
      className="flex justify-center items-center min-h-screen p-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >

      <div className="w-full max-w-xl bg-white bg-opacity-90 backdrop-blur-md shadow-2xl p-10 rounded-3xl">

        <h1 className="text-4xl font-bold mb-2 text-center text-gray-800">
          Checkout
        </h1>

        <p className="text-center text-gray-500 mb-8">
          {step === 1
            ? "Fill in your details"
            : "Confirm your order"}
        </p>

        {/*  STEP INDICATOR  */}

        <div className="flex items-center justify-center gap-4 mb-10">

          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
              step >= 1
                ? "bg-black"
                : "bg-gray-300"
            }`}
          >
            1
          </div>

          <div
            className={`flex-1 h-1 rounded ${
              step >= 2
                ? "bg-black"
                : "bg-gray-300"
            }`}
          />

          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
              step >= 2
                ? "bg-black"
                : "bg-gray-300"
            }`}
          >
            2
          </div>

        </div>

        {/*  STEP 1  */}

        {step === 1 && (

          <div>

            {/* SHIPPING ADDRESS */}

            <label className="block text-gray-700 font-semibold mb-2">
              Shipping Address
            </label>

            <textarea
              placeholder="Enter your full shipping address..."
              rows="4"
              value={shippingAddress}
              onChange={(e) =>
                setShippingAddress(e.target.value)
              }
              className="w-full border border-gray-200 p-4 rounded-xl mb-8 focus:outline-none focus:ring-2 focus:ring-black transition-all"
              required
            />

            {/* PAYMENT METHOD */}

            <label className="block text-gray-700 font-semibold mb-4">
              Select Payment Method
            </label>

            <div className="grid grid-cols-2 gap-4 mb-8">

              {/* COD */}

              <div
                onClick={() =>
                  handlePaymentSelect("COD")
                }
                className={`cursor-pointer border-2 rounded-2xl p-6 text-center transition-all duration-300 ${
                  paymentMethod === "COD"
                    ? "border-black bg-black text-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >

                <p className="text-4xl mb-2">
                  💵
                </p>

                <p className="font-bold text-lg">
                  Cash on Delivery
                </p>

                <p
                  className={`text-sm mt-1 ${
                    paymentMethod === "COD"
                      ? "text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  Pay when delivered
                </p>

              </div>

              {/* STRIPE */}

              <div
                onClick={() =>
                  handlePaymentSelect("Stripe")
                }
                className={`cursor-pointer border-2 rounded-2xl p-6 text-center transition-all duration-300 ${
                  paymentMethod === "Stripe"
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >

                <p className="text-4xl mb-2">
                  💳
                </p>

                <p className="font-bold text-lg">
                  Pay with Stripe
                </p>

                <p
                  className={`text-sm mt-1 ${
                    paymentMethod === "Stripe"
                      ? "text-indigo-200"
                      : "text-gray-500"
                  }`}
                >
                  Secure online payment
                </p>

              </div>

            </div>

            {/* PROCEED BUTTON */}

            <button
              onClick={handleProceed}
              className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              Proceed
            </button>

          </div>

        )}

        {/* STEP 2 */}

        {step === 2 && (

          <div>

            {/* ORDER SUMMARY */}

            <div className="bg-gray-50 rounded-2xl p-6 mb-8">

              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">

                <span className="text-gray-500">
                  Shipping Address
                </span>

                <span className="font-semibold text-right max-w-xs">
                  {shippingAddress}
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Payment Method
                </span>

                <span
                  className={`font-bold px-3 py-1 rounded-full text-sm ${
                    paymentMethod === "COD"
                      ? "bg-black text-white"
                      : "bg-indigo-600 text-white"
                  }`}
                >
                  {paymentMethod === "COD"
                    ? "Cash on Delivery"
                    : "Stripe"}
                </span>

              </div>

            </div>

            {/* CONFIRM BUTTON */}

            {paymentMethod === "COD" ? (

              <button
                onClick={placeCODOrder}
                className="w-full bg-black text-white py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                Confirm Order
              </button>

            ) : (

              <button
                onClick={placeStripeOrder}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-all duration-300"
              >
                Pay with Stripe
              </button>

            )}

            {/* BACK BUTTON */}

            <button
              onClick={() => setStep(1)}
              className="w-full mt-4 border border-gray-300 text-gray-600 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Back
            </button>

          </div>

        )}

      </div>

    </div>

  );

}

export default Checkout;
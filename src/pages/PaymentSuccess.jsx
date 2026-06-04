import { useEffect, useState, useCallback } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  // VERIFY PAYMENT
  const verifyPayment = useCallback(async () => {
    try {
      await apiService(
        "PUT",
        `/api/payment/verify-payment/${orderId}`
      );

      setStatus("success");
    } catch (error) {
      console.log(error);
      setStatus("error");
    }
  }, [orderId]);

  // RUN VERIFY ON LOAD
  useEffect(() => {
    if (!orderId) {
      setStatus("invalid");
      return;
    }

    verifyPayment();
  }, [verifyPayment, orderId]);

  // AUTO REDIRECT AFTER SUCCESS (IMPORTANT FIX)
  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        navigate("/myorders");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  // INVALID STATE
  if (status === "invalid") {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6">
        <h1 className="text-4xl font-bold text-red-500">
          Invalid Payment Link ❌
        </h1>
        <p className="text-lg text-gray-600">
          No order ID was found in the URL.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Go Home
        </button>
      </div>
    );
  }

  // LOADING STATE
  if (status === "verifying") {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6">
        <div className="animate-spin w-12 h-12 border-4 border-black border-t-transparent rounded-full" />
        <p className="text-xl text-gray-600 font-semibold">
          Verifying your payment...
        </p>
      </div>
    );
  }

  // ERROR STATE
  if (status === "error") {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6">
        <h1 className="text-4xl font-bold text-red-500">
          Verification Failed ❌
        </h1>
        <p className="text-lg text-gray-600">
          Something went wrong. Please contact support.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Go Home
        </button>
      </div>
    );
  }

  // SUCCESS STATE
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-6">
      <h1 className="text-5xl font-bold text-green-600">
        Payment Successful ✅
      </h1>

      <p className="text-xl text-gray-600">
        Your order has been placed successfully.
      </p>

      <p className="text-sm text-gray-500">
        Redirecting to your orders...
      </p>

      <div className="flex gap-4 mt-4">
        <Link
          to="/myorders"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-semibold"
        >
          View Orders
        </Link>

        <Link
          to="/"
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
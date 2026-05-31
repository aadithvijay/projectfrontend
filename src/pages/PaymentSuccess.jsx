import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../services/api";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId =
    searchParams.get("orderId");

  // VERIFY PAYMENT
  const verifyPayment = async () => {
    try {
      await API.put(
        `/payment/verify-payment/${orderId}`
      );

    } 
    catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    if (orderId) {
      verifyPayment();
    }

  }, [orderId]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl font-bold text-green-600 mb-6">
        Payment Successful ✅
      </h1>

      <p className="text-xl mb-8">
        Your order has been placed successfully.
      </p>

      <Link to="/">
        <button
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </button>
      </Link>

    </div>

  );

}

export default PaymentSuccess;
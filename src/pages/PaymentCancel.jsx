import { Link } from "react-router-dom";

function PaymentCancel() {
  return (

    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-5xl font-bold text-red-600 mb-6">
        Payment Cancelled ❌
      </h1>

      <p className="text-xl mb-8">
        Your payment was cancelled.
      </p>

      <Link to="/cart">
        <button
          className="bg-black text-white px-6 py-3 rounded-lg"
        >
          Back To Cart
        </button>
      </Link>

    </div>

  );

}

export default PaymentCancel;
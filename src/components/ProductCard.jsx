import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="border rounded-xl shadow-md overflow-hidden hover:shadow-xl transition">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover"
        />
      </Link>

      <div className="p-4">

        <Link to={`/product/${product._id}`}>
          <h2 className="text-2xl font-bold mb-2">
            {product.title}
          </h2>
        </Link>

        <p className="text-gray-600 mb-3">
          {product.category}
        </p>

        <p className="text-xl font-semibold mb-4">
          ₹ {product.price}
        </p>

        <button
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Add To Cart
        </button>

      </div>

    </div>

  );
}

export default ProductCard;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  //  FETCH CART 

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");
      setCartItems(data);
    } 
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  //  REMOVE ITEM 

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      fetchCart();
    } 
    catch (error) {
      console.log(error);
    }

  };

  // UPDATE QUANTITY 

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await API.put(`/cart/${id}`, {
        quantity,
      });

      fetchCart();
    } 
    catch (error) {
      console.log(error);
    }

  };

  //CHECKOUT 

  const handleCheckout = () => {
    navigate("/checkout");
  };

  // TOTAL PRICE 

  const totalPrice = cartItems.reduce(
    (acc, item) =>

      item.product
        ? acc + item.product.price * item.quantity
        : acc,

    0

  );

  return (

    <div
      className="min-h-screen bg-cover bg-center bg-fixed relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 p-10">

        {/* HEADING */}

        <h1 className="text-5xl font-bold mb-10 text-white drop-shadow-lg">
          Shopping Cart
        </h1>

        {/* EMPTY CART */}
        {cartItems.length === 0 ? (
          <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl p-10 shadow-2xl max-w-xl">
            <h2 className="text-3xl font-bold text-gray-700">
              Cart is Empty
            </h2>

          </div>

        ) : (

          <>

            {/* ================= CART ITEMS ================= */}

            <div className="space-y-6">

              {cartItems.map((item) => (

                item.product && (

                  <div
                    key={item._id}
                    className="flex items-center gap-6 bg-white bg-opacity-90 backdrop-blur-md border border-white p-6 rounded-2xl shadow-2xl hover:scale-[1.01] transition-all duration-300"
                  >

                    {/* IMAGE */}

                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="w-36 h-36 object-cover rounded-xl shadow-lg"
                    />

                    {/* DETAILS */}

                    <div className="flex-1">

                      <h2 className="text-3xl font-bold mb-3 text-gray-800">
                        {item.product.title}
                      </h2>

                      <p className="text-gray-600 mb-2 text-lg">
                        Category: {item.product.category}
                      </p>

                      <p className="text-2xl font-semibold mb-4 text-indigo-600">
                        Rs. {item.product.price.toLocaleString()}
                      </p>

                      {/* QUANTITY */}

                      <div className="flex items-center gap-4 mt-4">

                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.quantity - 1
                            )
                          }
                          className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl text-xl transition-all duration-300"
                        >
                          -
                        </button>

                        <span className="text-2xl font-bold text-gray-800">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              item.quantity + 1
                            )
                          }
                          className="bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-xl text-xl transition-all duration-300"
                        >
                          +
                        </button>

                      </div>

                    </div>

                    {/* REMOVE */}

                    <button
                      onClick={() => removeItem(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg"
                    >
                      Remove
                    </button>

                  </div>

                )

              ))}

            </div>

            {/*TOTAL SECTION  */}

            <div className="mt-10 flex justify-end">

              <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-2xl shadow-2xl p-8 min-w-[350px]">

                <h2 className="text-4xl font-bold mb-8 text-gray-800">
                  Total: Rs. {totalPrice.toLocaleString()}
                </h2>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-2xl text-xl font-semibold transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Proceed To Checkout
                </button>

              </div>

            </div>

          </>

        )}

      </div>

    </div>

  );

}

export default Cart;
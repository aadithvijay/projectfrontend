import { useEffect, useState } from "react";
import API from "../services/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  //FETCH WISHLIST 

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get("/wishlist");
      setWishlist(data);

    } 
    catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  // REMOVE ITEM 

  const removeItem = async (id) => {


    try {
      await API.delete(`/wishlist/${id}`);
      fetchWishlist();
    } 
    catch (error) {
      console.log(error);
    }

  };

  // ADD TO CART 

  const addToCart = async (productId) => {
    try {
      await API.post("/cart", {
        product: productId,
        quantity: 1,
      });

      alert("Added to cart");

    } 
    catch (error) {
      console.log(error);
    }

  };

  return (

    <div className="p-10">

      <h1 className="text-4xl font-bold mb-10">
        My Wishlist ❤️
      </h1>

      {wishlist.length === 0 ? (

        <h2 className="text-2xl">
          Wishlist is Empty
        </h2>

      ) : (

        <div className="grid md:grid-cols-3 gap-8">

          {wishlist.map((item) => (

            item.product && (

              <div
                key={item._id}
                className="border rounded-lg overflow-hidden shadow"
              >

                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="w-full h-72 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold mb-2">
                    {item.product.title}
                  </h2>

                  <p className="mb-2">
                    ₹ {item.product.price}
                  </p>

                  <div className="flex gap-4">

                    <button
                      onClick={() =>
                        addToCart(item.product._id)
                      }
                      className="bg-black text-white px-4 py-2 rounded"
                    >
                      Add To Cart
                    </button>

                    <button
                      onClick={() =>
                        removeItem(item._id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>

            )

          ))}

        </div>

      )}

    </div>

  );
}

export default Wishlist;
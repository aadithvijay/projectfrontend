import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  // EDIT STATE
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState("");
  const [editComment, setEditComment] = useState("");

  // LOGGED IN USER ✅ FIXED
  const currentUser = JSON.parse(localStorage.getItem("userInfo"));

  //FETCH PRODUCT 

  const fetchProduct = async () => {
    try {
      const { data } = await API.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ADD TO CART 

  const addToCart = async () => {
    try {
      await API.post("/cart", {
        product: product._id,
        quantity: 1,
      });
      alert("Added To Cart 🛒");
    } 
    catch (error) {
      console.log(error);
      alert("Failed To Add Cart");
    }
  };

  //ADD TO WISHLIST 

  const addToWishlist = async () => {
    try {
      await API.post("/wishlist", {
        product: product._id,
      });
      alert("Added To Wishlist ❤️");
    } 
    catch (error) {
      console.log(error);
      alert("Failed To Add Wishlist");
    }
  };

  //SUBMIT REVIEW

  const submitReview = async () => {
    try {
      await API.post(`/products/${product._id}/reviews`, {
        rating,
        comment,
      });
      alert("Review Added ⭐");
      setRating("");
      setComment("");
      fetchProduct();
    } 
    catch (error) {
      console.log(error);
      alert("Review Failed");
    }
  };

  //DELETE REVIEW

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await API.delete(`/products/${product._id}/reviews/${reviewId}`);
      alert("Review Deleted");
      fetchProduct();
    } 
    catch (error) {
      console.log(error);
      alert("Failed To Delete Review");
    }
  };

  //OPEN EDIT

  const openEdit = (review) => {
    setEditingReviewId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  //SUBMIT EDIT

  const submitEdit = async (reviewId) => {
    try {
      await API.put(`/products/${product._id}/reviews/${reviewId}`, {
        rating: editRating,
        comment: editComment,
      });
      alert("Review Updated ✅");
      setEditingReviewId(null);
      fetchProduct();
    } 
    catch (error) {
      console.log(error);
      alert("Failed To Update Review");
    }
  };

  //LOADING

  if (!product) {
    return <div className="p-10 text-2xl">Loading...</div>;
  }

  return (
    <div className="p-10">
      <div className="grid md:grid-cols-2 gap-10">

        {/* IMAGE */}
        <div>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[500px] object-cover rounded-xl"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-5xl font-bold mb-6">{product.title}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>
          <p className="text-3xl font-semibold mb-4">₹ {product.price}</p>
          <p className="text-xl mb-4">
            ⭐ {product.rating?.toFixed(1)} ({product.numReviews} Reviews)
          </p>
          <p className="text-xl mb-10">Category: {product.category}</p>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={addToCart}
              className="bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800"
            >
              Add To Cart
            </button>
            <button
              onClick={addToWishlist}
              className="bg-pink-500 text-white px-8 py-4 rounded-lg hover:bg-pink-600"
            >
              Wishlist ❤️
            </button>
          </div>
        </div>

      </div>

      {/* REVIEWS SECTION */}

      <div className="mt-16">
        <h2 className="text-4xl font-bold mb-8">Reviews ⭐</h2>

        {/* REVIEW FORM */}
        <div className="grid gap-4 mb-12 max-w-xl">

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border p-4 rounded"
          >
            <option value="">Select Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>

          <textarea
            placeholder="Write Your Review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-4 rounded h-32"
          />

          <button
            onClick={submitReview}
            className="bg-yellow-500 text-white py-4 rounded-lg hover:bg-yellow-600"
          >
            Submit Review
          </button>

        </div>

        {/* REVIEWS LIST */}
        <div className="space-y-6">

          {product.reviews && product.reviews.length === 0 ? (

            <p className="text-xl">No Reviews Yet</p>

          ) : (

            product.reviews?.map((review) => (

              <div
                key={review._id}
                className="border p-6 rounded-xl shadow"
              >

                {/* REVIEW HEADER */}
                <div className="flex justify-between items-start mb-2">

                  <div>
                    <h3 className="text-2xl font-bold">{review.name}</h3>
                    <p className="text-yellow-500">⭐ {review.rating}</p>
                  </div>

                  {/* EDIT / DELETE — only show to review owner */}
                  {currentUser &&
                    currentUser._id === review.user?.toString() && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(review)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600"
                      >
                        Edit ✏️
                      </button>
                      <button
                        onClick={() => deleteReview(review._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600"
                      >
                        Delete 🗑️
                      </button>
                    </div>
                  )}

                </div>

                {/* EDIT FORM */}
                {editingReviewId === review._id ? (

                  <div className="grid gap-3 mt-4">

                    <select
                      value={editRating}
                      onChange={(e) => setEditRating(e.target.value)}
                      className="border p-3 rounded"
                    >
                      <option value="1">1 Star</option>
                      <option value="2">2 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="5">5 Stars</option>
                    </select>

                    <textarea
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      className="border p-3 rounded h-24"
                    />

                    <div className="flex gap-2">
                      <button
                        onClick={() => submitEdit(review._id)}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                      >
                        Save ✅
                      </button>
                      <button
                        onClick={() => setEditingReviewId(null)}
                        className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>

                  </div>

                ) : (

                  <p className="text-gray-700 mt-2">{review.comment}</p>

                )}

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;
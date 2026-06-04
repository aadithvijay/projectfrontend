import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import apiService from "../services/apiService";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editRating, setEditRating] = useState("");
  const [editComment, setEditComment] = useState("");

  const currentUser = JSON.parse(
    localStorage.getItem("userInfo")
  );

  // FETCH PRODUCT
  const fetchProduct = async () => {
    try {
      const response = await apiService(
        "GET",
        `/api/products/${id}`
      );

      setProduct(response.data);
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
      await apiService("POST", "/api/cart", {
        product: product._id,
        quantity: 1,
      });

      alert("Added To Cart 🛒");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Cart");
    }
  };

  // ADD TO WISHLIST
  const addToWishlist = async () => {
    try {
      await apiService("POST", "/api/wishlist", {
        product: product._id,
      });

      alert("Added To Wishlist ❤️");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Wishlist");
    }
  };

  // SUBMIT REVIEW
  const submitReview = async () => {
    try {
      await apiService(
        "POST",
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        }
      );

      alert("Review Added ⭐");

      setRating("");
      setComment("");

      fetchProduct();
    } catch (error) {
      console.log(error);
      alert("Review Failed");
    }
  };

  // DELETE REVIEW
  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?"))
      return;

    try {
      await apiService(
        "DELETE",
        `/api/products/${product._id}/reviews/${reviewId}`
      );

      alert("Review Deleted");
      fetchProduct();
    } catch (error) {
      console.log(error);
      alert("Failed To Delete Review");
    }
  };

  // OPEN EDIT
  const openEdit = (review) => {
    setEditingReviewId(review._id);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  // SUBMIT EDIT
  const submitEdit = async (reviewId) => {
    try {
      await apiService(
        "PUT",
        `/api/products/${product._id}/reviews/${reviewId}`,
        {
          rating: editRating,
          comment: editComment,
        }
      );

      alert("Review Updated ✅");

      setEditingReviewId(null);

      fetchProduct();
    } catch (error) {
      console.log(error);
      alert("Failed To Update Review");
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

  // PRODUCT SECTION ANIMATION
  const productVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // REVIEW CARD ANIMATION
  const reviewVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  // BUTTON ANIMATION
  const buttonHover = {
    scale: 1.05,
    y: -2,
  };

  const buttonTap = {
    scale: 0.96,
  };

  // IMAGE ANIMATION
  const imageHover = {
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  };

  // LOADING SCREEN
  if (!product) {
    return (
      <div
        className="min-h-screen flex justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }


  return (
  <motion.div
    variants={pageVariants}
    initial="hidden"
    animate="visible"
    className="min-h-screen p-10 bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <motion.div
      variants={productVariants}
      initial="hidden"
      animate="visible"
      className="grid md:grid-cols-2 gap-10"
    >
      {/* IMAGE */}
      <motion.div
        whileHover={imageHover}
        className="overflow-hidden rounded-3xl shadow-2xl"
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[500px] object-cover"
        />
      </motion.div>

      {/* DETAILS */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-8 shadow-xl"
      >
        <h1 className="text-5xl font-bold mb-6">
          {product.title}
        </h1>

        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          {product.description}
        </p>

        <p className="text-4xl font-bold text-indigo-600 mb-4">
          ₹ {product.price}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 text-2xl">
            ⭐
          </span>

          <p className="text-xl">
            {product.rating?.toFixed(1)}
            <span className="text-gray-500 ml-2">
              ({product.numReviews} Reviews)
            </span>
          </p>
        </div>

        <p className="text-xl mb-10 text-gray-700">
          Category:
          <span className="font-semibold ml-2">
            {product.category}
          </span>
        </p>

        <div className="flex gap-4">

          <motion.button
            whileHover={buttonHover}
            whileTap={buttonTap}
            onClick={addToCart}
            className="bg-black text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
          >
            Add To Cart 🛒
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#db2777",
            }}
            whileTap={buttonTap}
            onClick={addToWishlist}
            className="bg-pink-500 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
          >
            Wishlist ❤️
          </motion.button>

        </div>
      </motion.div>
    </motion.div>

    {/* REVIEWS */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="mt-16"
    >
      <h2 className="text-4xl font-bold mb-8">
        Reviews ⭐
      </h2>

      {/* REVIEW FORM */}
      <motion.div
        whileHover={{
          y: -3,
        }}
        className="grid gap-4 mb-12 max-w-xl bg-white p-6 rounded-3xl shadow-xl"
      >

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-4 rounded-xl outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="">Select Rating</option>
          <option value="1">1 ⭐</option>
          <option value="2">2 ⭐</option>
          <option value="3">3 ⭐</option>
          <option value="4">4 ⭐</option>
          <option value="5">5 ⭐</option>
        </select>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your review..."
          className="border p-4 rounded-xl h-32 outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <motion.button
          whileHover={{
            scale: 1.03,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={submitReview}
          className="bg-yellow-500 text-white py-4 rounded-xl font-semibold shadow-lg"
        >
          Submit Review
        </motion.button>

      </motion.div>

      {/* REVIEWS LIST */}
      <div className="space-y-6">

        <AnimatePresence>

          {product.reviews?.map((review) => (

            <motion.div
              key={review._id}
              variants={reviewVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              whileHover={{
                y: -4,
                boxShadow:
                  "0 15px 30px rgba(0,0,0,0.1)",
              }}
              className="border bg-white p-6 rounded-3xl shadow-lg"
            >

              <div className="flex justify-between">

                <div>
                  <h3 className="text-xl font-bold">
                    {review.name}
                  </h3>

                  <p className="text-yellow-500 font-semibold">
                    ⭐ {review.rating}
                  </p>
                </div>

                {currentUser &&
                  currentUser._id === review.user && (

                    <div className="flex gap-2">

                      <motion.button
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          openEdit(review)
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                      >
                        Edit
                      </motion.button>

                      <motion.button
                        whileHover={{
                          scale: 1.05,
                        }}
                        whileTap={{
                          scale: 0.95,
                        }}
                        onClick={() =>
                          deleteReview(review._id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </motion.button>

                    </div>
                  )}

              </div>

              {editingReviewId === review._id ? (

                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  className="mt-4 space-y-3"
                >

                  <select
                    value={editRating}
                    onChange={(e) =>
                      setEditRating(e.target.value)
                    }
                    className="border p-3 rounded-lg"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>

                  <textarea
                    value={editComment}
                    onChange={(e) =>
                      setEditComment(e.target.value)
                    }
                    className="border p-3 rounded-lg w-full"
                  />

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={() =>
                      submitEdit(review._id)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Save
                  </motion.button>

                </motion.div>

              ) : (

                <p className="mt-4 text-gray-700 leading-relaxed">
                  {review.comment}
                </p>

              )}

            </motion.div>

          ))}

        </AnimatePresence>

      </div>
    </motion.div>
  </motion.div>
);
}

export default ProductDetails;
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  const navigate = useNavigate();

  // USER PARSE 
  let userInfo = null;

  try {
    userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
  } catch (err) {
    userInfo = null;
  }

  //  LOGOUT 
  const logoutHandler = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-xl"
    >

      {/* LOGO */}
      <Link to="/" className="text-3xl font-bold tracking-wide">
        HomeScape
      </Link>

      {/* NAV LINKS */}
      <div className="flex gap-6 text-lg items-center">

        {userInfo ? (
          <>
            {/* ADMIN LINKS ONLY */}
            {userInfo.isAdmin ? (
              <>
                <Link to="/admin">Admin</Link>
                <Link to="/admin/products">Admin Products</Link>
                <Link to="/profile">Profile</Link>
              </>
            ) : (
              <>
                {/* CUSTOMER LINKS ONLY */}
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/wishlist">Wishlist</Link>
                <Link to="/myorders">My Orders</Link>
                <Link to="/profile">Profile</Link>
              </>
            )}

            <button
              onClick={logoutHandler}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

      </div>

    </motion.nav>

  );
}

export default Navbar;
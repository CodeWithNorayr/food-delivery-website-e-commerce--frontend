import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useNavigate, Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLoginPopUp }) => {
  const { token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Load token on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken && savedToken !== "undefined") {
      setToken(savedToken);
    }
  }, [setToken]);

  // ✅ Logout
  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <div className="navbar-section">
      {/* Logo */}
      <h1 onClick={() => navigate("/")} className="restaurant">
        Restaurant
      </h1>

      {/* Links */}
      <ul className="navbar-content-ul">
        <li>
          <Link to="/" className="home">
            Home
          </Link>
        </li>

        <li>
          <a href="#menu-section" className="menu">
            Menu
          </a>
        </li>

        <li>
          <a href="#contact" className="contact">
            Contact
          </a>
        </li>


      </ul>

      {/* Right Section */}
      <div className="navbar-right-sec">
        <img
          onClick={() => navigate("/cart")}
          className="cart-image"
          src={assets.cart}
          alt="cart"
        />

        {/* Auth Buttons */}
        {token ? (
          <div className="btn-sect">
            {token && (
              <div className="div-userorders-section">
              <button
                onClick={() => navigate("/userorders")}
                type="button"
                className="orderbtn"
              >
                Order history
              </button>
              <button
                onClick={() => navigate("/orders")}
                type="button"
                className="orderbtn"
              >
                Orders
              </button>
              </div>
            )}

            <button
              onClick={logoutUser}
              type="button"
              className="logoutbtn"
            >
              Logout
            </button>
          </div>
          
        ) : (
          <div
            className="navbar-btn"
            onClick={() => setShowLoginPopUp(true)}
          >
            Sign up

            {showDropdown && (
              <div className="dropdown-box">
                <p>Click here to sign up!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../styles/NavbarStyle.css";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <div className="navbar">
      <div className="navbar-heading">eCommerce</div>

      {/* Use NavLink for styling active link */}
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "active-link" : "not-active")}
        end
      >
        Products
      </NavLink>
      <NavLink
        to="/add-product"
        className={({ isActive }) =>
          `add-product-container ${isActive ? "active-link" : "not-active"}`
        }
      >
        <div className="add-a-product">Add a product </div>
        <img
          style={{ height: "25px" }}
          src="/png/icons8-add-48.png"
          alt="Add Icon"
        />
      </NavLink>
      <NavLink
        to="/cart"
        className={({ isActive }) => (isActive ? "active-link" : "not-active")}
      >
        Cart ({cart.length})
      </NavLink>
    </div>
  );
};

export default Navbar;

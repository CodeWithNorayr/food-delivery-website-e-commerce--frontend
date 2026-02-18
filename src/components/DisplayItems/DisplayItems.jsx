import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./DisplayItems.css";

const DisplayItems = ({ id, name, description, image, price, category }) => {
  const { cartItems, addToCart, removeFromCart, backendURL } =
    useContext(StoreContext);

  return (
    <div className="item-card">
      {/* Item Info */}
      <div className="items-sec">
        <p><b>{name}</b></p>

        <img
          src={`${image}`}
          alt={name}
          className="item-image"
        />

        <p>{description}</p>
        <p>Price: ${price}</p>
        <p>Category: {category}</p>
      </div>

      {/* Add / Remove Section */}
      <div className="addremove">
        {!cartItems[id] ? (
          // ✅ If item not in cart → Show Add button
          <img
            className="btn-section-adding"
            style={{ height: 60, width: 60, cursor: "pointer" }}
            src={assets.add}
            alt="Add"
            onClick={() => addToCart(id)}
          />
        ) : (
          // ✅ If item exists → Show Remove + Count + Add
          <div
            className="btn-section-button"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <img
              style={{ height: 60, width: 60, cursor: "pointer" }}
              src={assets.remove}
              alt="Remove"
              onClick={() => removeFromCart(id)}
            />

            <p
              style={{
                fontFamily: "sans-serif",
                fontWeight: 500,
                fontSize: 30,
              }}
            >
              {cartItems[id]}
            </p>

            <img
              style={{ height: 60, width: 60, cursor: "pointer" }}
              src={assets.add}
              alt="Add more"
              onClick={() => addToCart(id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayItems;

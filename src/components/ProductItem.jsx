import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteProduct, addToCart, editProduct } from "../redux/actions";
import "../styles/ProductItemStyle.css";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import StarRating from "../utils/util";
import { db } from "../firebaseinit";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [isEditActive, setIsEditActive] = useState(false);
  const [description,setDescription] = useState(product.description);
  const [price,setPrice] = useState(product.price);
  const [rating,setRating] = useState(product.rating);
  const [inValid,setInValid] = useState(false);

  const handleDelete = async() => {
    await deleteDoc(doc(db,"products",`${product.id}`));
    dispatch(deleteProduct(product.id));
    alert("Product deleted!");
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert("Added to cart!");
  };

  const handleEdit = () => {
    setIsEditActive(true);
  };

  const handleCancel = () =>{
    setIsEditActive(false);
  }

  const handleSave = async () => {
    const numericPrice = Number(price);
    const numericRating = Number(rating);

    // Validate input
    if (
      numericRating < 0 ||
      numericRating > 5 ||
      numericPrice <= 0 ||
      description.length < 10
    ) {
      setInValid(true);
      alert("invalid data product not updated");
      return;
    }

    setIsEditActive(false);
    setInValid(false);

    try {
      const productRef = doc(db, "products", product.id); // Reference to the document

      await updateDoc(productRef, {
        "data.description": description,
        "data.price": numericPrice,
        "data.rating": numericRating,
      });

        // Update the product in Redux store
    dispatch(editProduct({ ...product, description, price: numericPrice, rating: numericRating }));

      alert("Product updated successfully.");
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };


  return (
    <div className="product-cart">
      <div className="img-container">
        <img src={product.imgUrl}></img>
      </div>
      <div className="product-name-price-container">
        <div className="product-name">{product.name}</div>
        <div className="product-price">Rs {!isEditActive ? price :<div>
            <input value={price} onChange={(e)=>setPrice(e.target.value)}></input>
            </div> }</div>
        {!isEditActive ? (
          <div>
            <StarRating rating={rating} />
          </div>
        ) : (
          <div>
            Rating:<input value={rating} onChange={(e)=>setRating(e.target.value)}></input>
          </div>
        )}
      </div>
      <div className="cart-right-container">
        <div>{!isEditActive? description:
          <textarea className="text-area" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>}</div>
        {!isEditActive? (<div className="cart-right-btn-container">
          <button className="edit-item" onClick={handleEdit} style={{ width: "30px"}}>
            <img style={{ height: "25px" }} src="/svg/edit-pencil.svg" />
          </button>
          <button onClick={handleAddToCart} style={{ background: "#a9a94c" }}>
            Add to Cart
          </button>
          <button onClick={handleDelete} style={{ background: "#f44336" }}>
            Delete
          </button>
        </div>):(
          <div className="cart-right-btn-container" style={{justifyContent:"flex-end"}}>
            <button onClick={handleCancel} style={{ background: "#bdb9b9", color:"black" }}>
            cancel
          </button>
          <button onClick={()=>handleSave(product.id)} style={{ background: "#bdb9b9" ,color:"black"}}>
            save
          </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductItem;

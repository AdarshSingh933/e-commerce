import React, {useState} from 'react';
import '../../styles/ProductItemStyle.css';
import { useDispatch } from "react-redux";
import { deleteProduct, addToCart , removeFromCart} from "../../redux/actions";
import StarRating from "../../utils/util";


function CartItem({product}) {
  const dispatch = useDispatch();
  const [description,setDescription] = useState(product.description);

  const handleChange = (e) =>{
     setDescription(e.target.value);
  }
    return (
        <div className="product-cart">
          <div className="img-container">
            <img src={product.imgUrl}></img>
          </div>
          <div className="product-name-price-container">
            <div className="product-name">{product.name}</div>
            <div className="product-price">Rs { product.price}</div>
              <div>
                <StarRating rating={product.rating} />
              </div>
          </div>
          <div className="cart-right-container">
            <div>{ product.description} </div>
            <div className="cart-right-btn-container">
              <button style={{color:"black"}} onClick={() => dispatch(removeFromCart(product.id))}>Remove</button>
            </div>
          </div>
        </div>
      );
}

export default CartItem
import React, {useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions";
import ProductItem from "./ProductItem";
import '../styles/ProductListStyle.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseinit";


const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state)=>state.products);
  const [sortedProducts, setSortedProducts] = useState(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data().data,
        }));
        dispatch(setProducts(data));
        setSortedProducts(data); // Initialize sortedProducts with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

useEffect(()=>{
  setSortedProducts(products);
},[products])

  const handleSorting = () => {
    const sortedData = [...sortedProducts].sort((a, b) => a.price - b.price);
    setSortedProducts(sortedData); // Update the local state
  };

  const removeFilter = () =>{
    setSortedProducts(products)
  }

  return (
    <div className="product-list-container">
      <div className="sort-by-price-btn-container">
        <button onClick={handleSorting} className="sort-by-price-btn">Sort by Price</button>
        <button onClick={removeFilter} className=""><img style={{height:"30px"}} src="/svg/cross.svg" /></button>
      </div>
      <div className="product-list">
        {sortedProducts?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

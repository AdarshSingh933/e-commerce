import React from 'react';
import { useForm } from 'react-hook-form';
import '../styles/AddProduct.css';
import { db } from '../firebaseinit';
import { collection, addDoc } from "firebase/firestore"; 

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Validation rules
  const validationRules = {
    name: { required: 'Name is required' },
    description: {
      required: 'Description is required',
      minLength: { value: 10, message: 'Minimum length is 10 characters' },
    },
    price: {
      required: 'Price is required',
      min: { value: 0, message: 'Price must be positive' },
    },
    rating: {
      required: 'Rating is required',
      min: { value: 1, message: 'Rating must be at least 1' },
      max: { value: 5, message: 'Rating cannot exceed 5' },
    },
    imgUrl: {
      required: 'Image URL is required',
      pattern: {
        value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
        message: 'Invalid URL format',
      },
    },
  };

  // Function to handle form submission
  const onSubmit = async(data) => {
    console.log('Product Data:', data);
    const docRef = await addDoc(collection(db, "products"), {
        data
      });
    console.log("Document written with ID: ", docRef.id);
    reset(); // Reset the form after submission
  };

  return (
    <div className='add-product-form-container'>
    <form className='add-product-form' onSubmit={handleSubmit(onSubmit)}>
      <h2>Add Product</h2>

      {/* Product Name Field */}
      <div>
        <div>Product Name:</div>
        <input
          type="text"
          {...register('name', validationRules.name)}
        />
        {errors.name && <p className='error-msg'>{errors.name.message}</p>}
      </div>

      {/* Description Field */}
      <div>
        <div>Description:</div>
        <textarea
          {...register('description', validationRules.description)}
        />
        {errors.description && <p className='error-msg'>{errors.description.message}</p>}
      </div>

      {/* Price Field */}
      <div>
        <div>Price:</div>
        <input
          type="number"
          step="0.01"
          {...register('price', validationRules.price)}
        />
        {errors.price && <p className='error-msg'>{errors.price.message}</p>}
      </div>

      {/* Rating Field */}
      <div>
        <div>Rating (1-5):</div>
        <input
          type="number"
          step="0.1"
          {...register('rating', validationRules.rating)}
        />
        {errors.rating && <p className='error-msg'>{errors.rating.message}</p>}
      </div>

      {/* Image URL Field */}
      <div style={{marginBottom:"30px"}}>
        <div>Image URL:</div>
        <input
          type="url"
          {...register('imgUrl', validationRules.imgUrl)}
        />
        {errors.imgUrl && <p className='error-msg'>{errors.imgUrl.message}</p>}
      </div>
      <div style={{textAlign:"right"}}>
         <button className='add-product-btn' type="submit">Add Product</button>
      </div>
    </form>
    </div>
  );
};

export default AddProduct;

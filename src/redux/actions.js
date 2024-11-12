export const setProducts = products => ({
    type: 'SET_PRODUCTS',
    payload: products,
  });
  
  export const addProduct = product => ({
    type: 'ADD_PRODUCT',
    payload: product,
  });
  
  export const editProduct = product => ({
    type: 'EDIT_PRODUCT',
    payload: product,
  });
  
  export const deleteProduct = id => ({
    type: 'DELETE_PRODUCT',
    payload: id,
  });
  
  export const addToCart = product => ({
    type: 'ADD_TO_CART',
    payload: product,
  });
  
  export const removeFromCart = id => ({
    type: 'REMOVE_FROM_CART',
    payload: id,
  });
  
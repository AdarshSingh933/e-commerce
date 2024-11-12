const initialState = {
    products: [],
    cart: [],
  };
  
  export const productsReducer = (state = initialState.products, action) => {
    switch (action.type) {
      case 'SET_PRODUCTS':
        return action.payload;
      case 'ADD_PRODUCT':
        return [...state, action.payload];
      case 'EDIT_PRODUCT':
        return state.map(product =>
          product.id === action.payload.id ? action.payload : product
        );
      case 'DELETE_PRODUCT':
        return state.filter(product => product.id !== action.payload);
      default:
        return state;
    }
  };
  
  export const cartReducer = (state = initialState.cart, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return [...state, action.payload];
      case 'REMOVE_FROM_CART':
        return state.filter(item => item.id !== action.payload);
      default:
        return state;
    }
  };
      
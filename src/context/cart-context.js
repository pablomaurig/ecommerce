import * as React from 'react'

const CartContext = React.createContext()

export const PRODUCTS = [
  { id: 1, name: "Producto 1", price: 100 },
  { id: 2, name: "Producto 2", price: 200 },
  { id: 3, name: "Producto 3", price: 300 },
  { id: 4, name: "Producto 4", price: 400 },
  { id: 5, name: "Producto 5", price: 500 },
  { id: 6, name: "Producto 6", price: 600 },
]

export const TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_ONE_FROM_CART: "REMOVE_ONE_FROM_CART",
  REMOVE_ALL_FROM_CART: "REMOVE_ALL_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};

function CartReducer(state, action) {
  switch (action.type) {
    case TYPES.ADD_TO_CART: {
      let newItem = PRODUCTS.find(
        (product) => product.id === action.payload.id
      );

      let itemInCart = state.cart.find((item) => item.id === newItem.id);

      return itemInCart
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === newItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: [...state.cart, { ...newItem, quantity: 1 }],
          };
    }
    case TYPES.REMOVE_ONE_FROM_CART: {
      let itemToDelete = state.cart.find((item) => item.id === action.payload.id);

      return itemToDelete.quantity > 1
        ? {
            ...state,
            cart: state.cart.map((item) =>
              item.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          }
        : {
            ...state,
            cart: state.cart.filter((item) => item.id !== action.payload),
          };
    }
    case TYPES.REMOVE_ALL_FROM_CART: {
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    }
    case TYPES.CLEAR_CART:
      return [];
    default:
      return state;
  }
}

function CartProvider({children}) {
  const [state, dispatch] = React.useReducer(CartReducer, { cart: [] })
  // NOTE: you *might* need to memoize this value

  const value = {state, dispatch}
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart() {
  const context = React.useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}


export { CartProvider, useCart }
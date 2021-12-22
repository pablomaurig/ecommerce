import React from 'react';
import { useCart } from '../context/cart-context'

const Products = () => {
  const { state, dispatch } = useCart()

  const removeFromCart = product => {
    dispatch({type: 'REMOVE_ONE_FROM_CART', payload: product})
  }

  console.log(state)

  return (
    <>
      {state.cart.map(product => 
        <div key={product.id}>
          {product.name}
          <button onClick={() => removeFromCart(product)}>Remove from cart</button>
        </div>
      )}
    </>
  )
}

export default Products;
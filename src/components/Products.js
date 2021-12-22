import React from 'react';
import { useCart, PRODUCTS } from '../context/cart-context'

const Products = () => {
  const { state, dispatch } = useCart()

  const addToCart = product => {
    dispatch({type: 'ADD_TO_CART', payload: product})
  }

  console.log(state)

  return (
    <>
      {PRODUCTS.map(product => 
        <div key={product.id}>
          {product.name}
          <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
      )}
    </>
  )
}

export default Products;
import React from 'react'

const CartContext = React.createContext({
   products: [],
   carts: [],
   totalAmount: 0,
   addToCart: () => { },
   removeFromCart : ()=>{},
})

export default CartContext

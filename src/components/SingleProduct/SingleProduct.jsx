import {useContext} from 'react'
import { Card, Button } from 'react-bootstrap'
import Rating from '../Rating/Rating'
import classes from './SingleProduct.module.css'
import CartContext from '../../context/Context'
const SingleProduct = ({ product }) => {
   const { cart, addToCart, removeFromCart } = useContext(CartContext)
   const itemAndAmount = { ...product, amount:1}
   const findItem = cart.some(item => item.id === product.id)
   // console.log(cart, totalAmount,'cart')

   return (
      <div className={classes.products}>
         <Card>
            <Card.Img variant='top' src={product.image} alt={product.name}></Card.Img>
            <Card.Body>
               <Card.Title>
                  {product.name}
               </Card.Title>
               <Card.Subtitle
                  style={{ paddingBottom: 10 }}
               >
                  <span>
                     #{product.price.split('.')[0]}
                  </span>
                  {product.fastDelivery ?
                     <div>Fast Delivery </div> :
                     <div>4 days delivery</div>
                  }
                  <Rating rating={product.ratings} />
               </Card.Subtitle>
               {findItem ? <Button variant='danger' onClick={() => removeFromCart(itemAndAmount)} >Remove from cart</Button> : <Button disabled={!product.inStock} onClick={() => addToCart(itemAndAmount)} >{!product.inStock ? 'Out of Stock' : ' Add to cart'}</Button>}
               
               
            </Card.Body>
         </Card>
      </div>
   )
}

export default SingleProduct

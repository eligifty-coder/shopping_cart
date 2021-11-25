import {useContext} from 'react'
import { ListGroup, Button, Row, Col, Form, Image} from 'react-bootstrap'
import classes from './Cart.module.css'
import CartContext from '../../context/Context'
import Rating from '../../components/Rating/Rating'
import { AiFillDelete } from 'react-icons/ai'

const Cart = () => {
   const { cart, totalAmount, removeFromCart, addToCart, changQuantity, } = useContext(CartContext)

   const handleChange = (e, item) => {
      const val = +e.target.value
      const price = val * item.price
      const transformedItem = { ...item, amount: val, }
      console.log(item, transformedItem,item.price*val, 'paints')
      changQuantity(transformedItem)

   }
   const mappedCart = cart.map(item => {

      return <ListGroup.Item key={item.id} >
         <Row>
            <Col md={2}>
               <Image src={item.image} alt={item.name} fluid rounded />
            </Col>
            <Col md={2}>
               <span>{ item.name}</span>
            </Col>
            <Col md={2}>#{item.price} </Col>
            <Col md={2}><Rating rating={ item.ratings}/> </Col>
            <Col md={2}>
               <Form.Control
                  value={item.amount} as='select'
                  onChange={(e) => handleChange(e, item)}
               >

                  {[...Array(item.inStock).keys()].map((x) => {
                     return <option key={x+ 1}>{x + 1}</option>
                  })}
               </Form.Control>
            </Col>
            <Col md={2} >
               <Button
                  type='button'
                  variant='light'
                  onClick={()=>removeFromCart(item)}
               >
                  <AiFillDelete fontSize='20px' />
               </Button>
            </Col>
         </Row>
      </ListGroup.Item>
   })
   const cartNumber = cart.reduce((curNumber, item) => {
      return curNumber + item.amount
   }, 0)

   return (
      <div className={classes.home}>
         <div className={classes.productContainer}>
            <ListGroup>
               {mappedCart}
            </ListGroup>
         </div>
         <div className={`${classes.filters} ${classes.summary}`}>
            <span className={classes.title}>SubTotal {cartNumber} items</span>
            <span style={{ fontWeight: 700, fontSize: 20 }}>Total: #{totalAmount }</span>
            <Button type='button' disabled={cartNumber===0}>Proceed to Checkout</Button>
         </div>
      </div>
   )
}

export default Cart

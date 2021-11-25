import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { Container, FormControl, Navbar, Dropdown, Nav, Badge, Button } from 'react-bootstrap'
import CartContext from '../../context/Context'
import classes from './Header.module.css'

const Header = () => {
   const { cart, removeFromCart, productState,
      filterBySearch, } = useContext(CartContext)

   const cartNumber = cart.reduce((curNumber, item) => {
      return curNumber + item.amount
   }, 0)

   const mappedCart = cart.map(item => {
      return <div key={item.id}> <span className={classes.cartItem}>
         <img src={item.image}
            className={classes.cartItemImg}
            alt={item.name}
         />
         <div className={classes.cartItemDetail}>
            <span>{item.name}</span>
            <span>#{item.price.split('.')[0]}</span>
         </div>
         <AiFillDelete
            fontSize='20px'
            style={{ cursor: 'pointer' }}
            onClick={() => removeFromCart(item)}
         />
       </span>
         <Link  to='/cart' className={classes.anchor}>
            Go To Cart
         </Link>
      </div>
   })

   return (
      <Navbar bg='dark' variant='dark' style={{ height: '80px', position: 'relative', width: '100%', }}>
         <Container style={{ display: 'flex', }}>
            <Navbar.Brand>
               <Link to='/'>Shopping Cart</Link>
            </Navbar.Brand>
            <Navbar.Text className={classes.search}>
               <FormControl
                  style={{ width: 200 }}
                  placeholder='Search a product'
                  className='m-auto'
                  onChange={(event) => filterBySearch(event.target.value)}
               />
            </Navbar.Text>
            <Nav>
               <Dropdown >
                  <Dropdown.Toggle variant='success'>
                     <FaShoppingCart color='white' fontSize='25px' />
                     <Badge variant='success' >{cartNumber}</Badge>
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: 370, left: '-210px' }}>
                     {cartNumber === 0 ? <span style={{ textAlign: 'center', display: 'block' }}>Cart is Empty</span> :
                        <>
                           {mappedCart}
                        </>

                     }

                  </Dropdown.Menu>
               </Dropdown>
            </Nav>
         </Container>
      </Navbar>
   )
}

export default Header

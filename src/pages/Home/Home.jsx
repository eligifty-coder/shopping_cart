import {useContext, useEffect} from 'react'
import SingleProduct from '../../components/SingleProduct/SingleProduct'
import Filter from '../../components/Filter/Filter'
import CartContext from '../../context/Context'
import classes from './Home.module.css'

const Home = () => {
   const { products, cart, totalAmount, productState: { sort, byStock, byRating, byFastDelivery, searchQuery}} = useContext(CartContext)
   const transformedProduct = () => {
      let sortedProducts = products
      
      if (sort) {
         sortedProducts = sortedProducts.sort((a, b) => {
           return sort==='lowToHigh'? a.price-b.price:b.price-a.price
         })
      }
      if (!byStock) {
         sortedProducts = sortedProducts.filter(item=>item.inStock)
      }
      if (byFastDelivery) {
         sortedProducts = sortedProducts.filter(item => item.fastDelivery)
      }
      if (byRating) {
         sortedProducts = sortedProducts.filter(
            (item) => item.ratings >= byRating
         );
      }
      if (searchQuery) {
         sortedProducts = sortedProducts.filter(item => {
           return  item.name.toLowerCase().includes(searchQuery)
         })
      }
      return sortedProducts
   }
   const mappedProducts = transformedProduct().map((product) => {
      return <SingleProduct
         key={product.id}
         product={product}
      />
   })
   return (
      <div className={classes.home}>
         <Filter/>
         <div className={classes.productContainer}>
            {mappedProducts}
         </div>
         
      </div>
   )
}

export default Home

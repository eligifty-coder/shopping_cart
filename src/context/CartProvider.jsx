import { useReducer } from "react"
import { cartReducer, productReducer} from './Reducer'
import CartContext from "./Context"
import faker from 'faker'
const CartProvider = props => {
   faker.seed(99)
   const products = [...Array(20)].map(() => {
      return {
         id: faker.datatype.uuid(),
         name: faker.commerce.productName(),
         price: faker.commerce.price(),
         image: faker.random.image(),
         inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
         fastDelivery: faker.datatype.boolean(),
         ratings: faker.random.arrayElement([1,2,3,4,5]),
      }
   })

   


   const [state, dispatch] = useReducer(cartReducer, { products, cart: [], totalAmount: 0 })
   const [productState, productDispatch] = useReducer(productReducer, {
      byStock: false,
      byFastDelivery: false,
      byRating: 0,
      searchQuery: '',
      sort: '',
   })
   const handleAdd = (item) => {
      dispatch({ type:'ADD_TO_CART', item})
   }
   const handleRemove = (item) => {
      dispatch({ type:'REMOVE_FROM_CART', item})
   }
   const changQuantity = (item) => {
      dispatch({ type:'CHANGE_QUANTITY', item})
   }
   const sortByPrice = (sort) => {
      productDispatch({ type:'SORT_BY_PRICE', payload:sort})
   }
   const filterByDelivery = () => {
      productDispatch({ type:'FILTER_BY_DELIVERY'})
   }
   const filterByRating = (rating) => {
      productDispatch({ type:'FILTER_BY_RATING', payload:rating})
   }
   const filterBySearch = (search) => {
      productDispatch({ type:'FILTER_BY_SEARCH', payload:search})
   }
   const filterByStock = () => {
      productDispatch({ type:'FILTER_BY_STOCK'})
   }
   const clearFilter = () => {
      productDispatch({ type:'CLEAR_FILTER'})
   }
   const cartContext = {
      products:state.products,
      cart: state.cart,
      totalAmount: state.totalAmount,
      addToCart: handleAdd,
      removeFromCart: handleRemove,
      changQuantity,
      productState,
      sortByPrice,
      filterByDelivery,
      filterByRating,
      filterBySearch,
      clearFilter,
      filterByStock,
   }

   return <CartContext.Provider value={cartContext}>
      {props.children}
   </CartContext.Provider>
}
export default CartProvider
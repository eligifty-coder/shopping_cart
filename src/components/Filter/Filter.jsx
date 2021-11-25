import React, {  useContext} from 'react'
import Rating from '../Rating/Rating'
import { Form, Button } from 'react-bootstrap'
import classes from './Filter.module.css'
import CartContext from '../../context/Context'

const Filter = () => {

   const { 
      productState,
      sortByPrice,
      filterByDelivery,
      filterByRating,
      filterByStock,
      clearFilter, } = useContext(CartContext)
      
   const handleChangeRate = (value) => {
      filterByRating(value)
   }

   return (
      <div className={classes.filters}>
         <span className={classes.title}>Filter Products</span>
         <span>
            <Form.Check
               inline
               label='Ascending'
               name='group1'
               type='radio'
               id={'inline-1'}
               onChange={() => sortByPrice('lowToHigh')}
               checked={productState.sort ==='lowToHigh'? true:false}
            />
         </span>
         <span>
            <Form.Check
               inline
               label='Descending'
               name='group1'
               type='radio'
               id={'inline-2'}
               onChange={() => sortByPrice('highToLow')}
               checked={productState.sort === 'highToLow' ? true : false}
            />
         </span>
         <span>
            <Form.Check
               inline
               label='Include Out of Stock'
               name='group1'
               type='checkbox'
               id={'inline-3'}
               onChange={() => filterByStock()}
               checked={productState.byStock}
            />
         </span>
         <span>
            <Form.Check
               inline
               label='Fast Delivery Only'
               name='group1'
               type='checkbox'
               id={'inline-4'}
               onChange={() => filterByDelivery()}
               checked={productState.byFastDelivery}
            />
         </span>
         <span>
            <label style={{paddingRight:10}} >Rating:</label>
            <Rating
               rating={productState.byRating}
               style={{ cursor: 'pointer' }}
               onClick={handleChangeRate}
            />
         </span>
         <Button variant='light' onClick={clearFilter} >Clear Filters</Button>
         
      </div>
   )
}

export default Filter

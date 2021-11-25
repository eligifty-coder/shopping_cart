import React from 'react'
import classes from './Rating.module.css'
import { AiOutlineStar, AiFillStar} from 'react-icons/ai'
const Rating =  ({ rating, style, onClick }) => {
   const mappedRating = [...Array(5)].map((_, index) => {
      return<span className={classes.rate}key={index} onClick={()=>onClick(index+1)} style={style} >
         {rating > (index)?(<AiFillStar fontSize='15px'/>):(<AiOutlineStar fontSize='15px' />)}
      </span>
   })
   return (
      mappedRating
   )
}

export default Rating

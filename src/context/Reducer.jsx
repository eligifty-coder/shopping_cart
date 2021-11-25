

export const cartReducer = (state, action) => {
   switch (action.type) {
      case 'ADD_TO_CART':
         const index = state.cart.findIndex(item => {
            return  item.id===action.item.id
         })
         const itemInCart = state.cart[index]
         if (!itemInCart) {
            const price = +action.item.price
            const amount = +action.item.amount
            const checkAmount = price * amount
            return { ...state, cart: [...state.cart, action.item], totalAmount:state.totalAmount+ (checkAmount)}
         } else {
            const price = +action.item.price
            const amount = +action.item.amount
            const checkAmount = price*amount
            const transformedCart= state.cart.map((item, id) => {
               if (index === id) {
                  return {
                     ...item,
                     amount: item.amount + action.item.amount,
                     price: item.price +(action.item.price)
                  }
               }
               return item
            })
            return {
               ...state,
               cart: transformedCart,
               totalAmount: state.totalAmount + (checkAmount)
            }
         }
      case 'CHANGE_QUANTITY':
         
         const prices = +action.item.price
         const calculatedPrice = prices * action.item.amount
     
         const mappItems = state.cart.map(item => {
            if (item.id === action.item.id) {

               return { ...item, amount: action.item.amount, price: prices}
            }
            return { ...item, price:+item.price}
         })
         const reducedPrice = mappItems.reduce((accu, item) => {
            return accu + (item.price*item.amount)
         }, 0)
         const splitMap = mappItems.map(item => {
            return {...item, price:`${item.price}`}
         })
         return { ...state, cart: splitMap, totalAmount: reducedPrice}
      case 'REMOVE_FROM_CART':
         
         const existingIndex = state.cart.findIndex(item => {
            return item.id===action.item.id
         })
         const existingItem = state.cart[existingIndex]
         const price = +existingItem.price
         const updatedTotalAmount = state.totalAmount - price
         if (existingItem.amount === 1) {
            const removeItem = state.cart.filter((item,id) => {
               return item.id !== action.item.id
            })
            return {
               ...state,
               cart: removeItem,
               totalAmount: updatedTotalAmount
            }
         } 
         else {
            const mappedRemovedItems = state.cart.map(item => {
               if (item.id === action.item.id) {
                  return {...item, amount:item.amount-1}
               }
               return item
            })
            return {...state,
               cart: mappedRemovedItems,
               totalAmount: updatedTotalAmount
            }
          
         }
      default:
         return state
   }
}

export const productReducer = (state, action) => {
   switch (action.type) {
      case 'SORT_BY_PRICE':
         return {...state, sort:action.payload}
      case 'FILTER_BY_STOCK':
         return { ...state, byStock: !state.byStock}
      case 'FILTER_BY_DELIVERY':
         return { ...state, byFastDelivery: !state.byFastDelivery}
      case 'FILTER_BY_RATING':
         return { ...state, byRating: action.payload}
      case 'FILTER_BY_SEARCH':
         return { ...state, searchQuery: action.payload}
      case 'CLEAR_FILTER':
         return {
            byStock: false,
            byFastDelivery: false,
            byRating: 0,
            searchQuery: '',
            sort:'',
         }
      default:
         return state

   }
}
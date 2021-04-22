import book_set from '../book-set'
import { ADD_TO_CART, APPLY_FOR_DISCOUNT, APPLY_COUPON, CLEAR_CART, CLOSE_MODAL, DECREMENT, FILTER_BY_GENRE, GET_GENRE, GET_TOTAL, INCREMENT, OPEN_MODAL, PROCEED_TO_PAY, REMOVE_ITEM, SUBMIT_COUPON, DISABLE_APPLY_BUTTON } from './actionType'


const initialState = {
    bookList: book_set,
    bookInCart: [],
    categoryList: [],
    filteredBookList: [],
    cartAmount: 1,
    grandTotal: 0,
    isModalOpen: false,
    isProceedToPay:false,
    coupon_text :'',
    disableApplyButton: false
}

const myReducer = (state=initialState,action)=> {
    if(action.type === ADD_TO_CART) {
        let tempBook = state.bookList.find((book)=> book.id===action.payload.id)
        let amount = {
            amount:1,
            indivisualTotalPrice:tempBook.price,
            isApplyCouponButton:false,
            isCouponValid: false
        }
        Object.assign(tempBook,amount) // insert new amount object in the existing object

        if(state.bookInCart.length !==5) {
            state.bookInCart = [...state.bookInCart,tempBook]
        } else {
            state.bookInCart = [...state.bookInCart]
        }
       return {...state }
    }
    if(action.type=== CLOSE_MODAL) {

        return {...state,isModalOpen:false,isProceedToPay:false}
    }
    if(action.type=== OPEN_MODAL) {

        return {...state,isModalOpen:true}
    }
    if(action.type === REMOVE_ITEM) {
        return {...state,bookInCart: state.bookInCart.filter((item)=> item.id !==action.payload.id)}  
    }
    if(action.type===INCREMENT) {

        let tempCart = state.bookInCart.map((item)=> {
            if((item.id===action.payload.id) & (item.stock !==0) ) {
                let myprice = item.price.split('$')

                myprice = parseFloat(myprice[1])
                item = {...item,amount:item.amount + 1,stock: item.stock-1}  
                // console.log("The value of isCouponvalid whitel increment",item.isCouponValid)
                if(item.isCouponValid) {
                    item = {...item,indivisualTotalPrice: 0.50*parseFloat((item.amount*myprice).toFixed(2))}
                }
                else {
                    item = {...item,indivisualTotalPrice: parseFloat((item.amount*myprice).toFixed(2))}
                }
            }
            return item
        })
        return {...state,bookInCart:tempCart}
    }
    if(action.type===DECREMENT) {
        let tempCart = state.bookInCart.map((item)=> {
            const {price} = item;
            let intPrice = price.split('$')

            let bookPrice = parseFloat(intPrice[1]);
            // console.log('price',bookPrice)
            if((item.id===action.payload.id) & (item.amount!==0)) {
               if(item.isCouponValid ) {
                item = {...item,amount: item.amount - 1,stock: item.stock +1}
                item = {...item,indivisualTotalPrice: 0.50*parseFloat((item.amount*bookPrice).toFixed(2))}
               } else {
                item = {...item,amount: item.amount - 1,stock: item.stock +1}
                item = {...item,indivisualTotalPrice: parseFloat((item.amount*bookPrice).toFixed(2))}
               }

            }
            return item
        })
        return {...state,bookInCart:tempCart}
    }
    if(action.type===GET_TOTAL) {
        let {cartAmount,grandTotal} = state.bookInCart.reduce((cartTotal,cartItem)=> {
            const {amount,price,indivisualTotalPrice} = cartItem;
            console.log("my type of individual price",typeof(indivisualTotalPrice))
 
            if(typeof(indivisualTotalPrice)==='string') {
                let intPrice = price.split('$')
                // console.log('price',typeof())
                let bookPrice = amount*parseFloat(intPrice[1]);
                cartTotal.grandTotal += bookPrice;
                cartTotal.cartAmount += amount
            } else {
                cartTotal.grandTotal += indivisualTotalPrice;
                cartTotal.cartAmount += amount
            }
            return cartTotal

        },{
            cartAmount:0,
            grandTotal:0
        })

        grandTotal = parseFloat(grandTotal.toFixed(2))


        return {...state, cartAmount,grandTotal}
    }
    if(action.type===CLEAR_CART) {
        return {...state, bookInCart:[]}
    }
    if(action.type === PROCEED_TO_PAY) {
        // console.log("The proceeding")
        return {...state,bookInCart:[], isProceedToPay:true}
    }
    if(action.type=== FILTER_BY_GENRE) {
     
        let genreList = new Set(state.bookList.map((book)=> book.genre))
        console.log('category list',genreList)
        return {...state,categoryList:["All",...genreList]}

    }
    if(action.type === GET_GENRE) {
       if(action.payload.genre==="All") {
        return {...state,filteredBookList:state.bookList}
       } else {
        let tempBooList = state.bookList.filter((item)=> item.genre === action.payload.genre)
        return {...state,filteredBookList:tempBooList}
       }
       
    }
    if(action.type===APPLY_COUPON) {
        let myTempItem = state.bookInCart.map((item)=> {
            if(item.id===action.payload.id){
                item = {...item,isApplyCouponButton: !item.isApplyCouponButton}
            }
            return item
        })
        return {...state,bookInCart:myTempItem}
    }
    if(action.type===APPLY_FOR_DISCOUNT) {
       return {...state,coupon_text:action.payload.couponText}

    }
    if(action.type===SUBMIT_COUPON) {
        let discountedItem = state.bookInCart.map((item)=> {
            if(item.id===action.payload.id & action.payload.value===`${item.name}123`) {
                if(typeof(item.indivisualTotalPrice)==='string') {
                    const {indivisualTotalPrice} = item;
                    let intPrice = indivisualTotalPrice.split('$')
        
                    let bookPrice = 0.50*parseFloat(intPrice[1]); 
                    item = {...item,indivisualTotalPrice:bookPrice,isCouponValid:true,isApplyCouponButton:false}
                    alert("You got 50% off. Thank You.")
                } else {
                    item = {...item,indivisualTotalPrice:0.50*item.indivisualTotalPrice,isCouponValid:true,isApplyCouponButton:false}
                }
            } else {
                alert("Invalid Coupon. Try Again")
            }

            return item
            
        })
        return {...state,bookInCart:discountedItem}
    }

    return state
    
}

export default myReducer
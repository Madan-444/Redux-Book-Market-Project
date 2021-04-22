import {INCREMENT,DECREMENT, ADD_TO_CART, CLOSE_MODAL,OPEN_MODAL, REMOVE_ITEM, GET_TOTAL, CLEAR_CART, PROCEED_TO_PAY, FILTER_BY_GENRE, GET_GENRE, APPLY_COUPON, APPLY_FOR_DISCOUNT, SUBMIT_COUPON, DISABLE_APPLY_BUTTON} from './actionType'


export function addToCart(id,price){
    return {
        type: ADD_TO_CART,
        payload: {
            id,
            price
        }
    }
}
export function openModal(){
    return {
        type: OPEN_MODAL
    }
}
export function closeModal(){
    return {
        type: CLOSE_MODAL
    }
}
export function removeItem(id){
    return {
        type: REMOVE_ITEM,
        payload: {
            id
        }
    }
}
export function increment(id,stock){
    return {
        type: INCREMENT,
        payload: {
            id,
            stock,
        }
    }
    
}
export function decrement(id,stock){
    return {
        type: DECREMENT,
        payload: {
            id,
            stock,
        }
    }
    
}
export function getTotal(){
    return {
        type: GET_TOTAL
    }
    
}
export function clearCart(){
    return {
        type: CLEAR_CART
    }
    
}
export function proceedToPay(){
    return {
        type: PROCEED_TO_PAY
    }
    
}

export function filterByGenre() {
    return {
        type: FILTER_BY_GENRE
    }
}
export function getGenre(genre) {
    return {
        type: GET_GENRE,
        payload: {
            genre
        }
       
    }
}
export function applyCoupon(id) {
    return {
        type: APPLY_COUPON,
        payload: {
            id
        }
    }
}
export function applyForDiscount(couponText) {
    return {
        type: APPLY_FOR_DISCOUNT,
        payload: {
            couponText,
        }
    }
}
export function submitCoupon(id,value) {
    return {
        type: SUBMIT_COUPON,
        payload: {
            id,
            value
        }
    }
}



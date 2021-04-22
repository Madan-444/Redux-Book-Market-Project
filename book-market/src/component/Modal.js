import React from "react";
import { FaTimes } from "react-icons/fa";
import { connect } from "react-redux";
import {
  applyCoupon,
  applyForDiscount,
  clearCart,
  closeModal,
  decrement,
  disableApplyButton,
  getTotal,
  increment,
  proceedToPay,
  removeItem,
  submitCoupon,
} from "../redux/action";
// import {connect} from 'react-redux'

const mapStateToProps = (store) => {
  const {
    isModalOpen,
    bookInCart,
    cartAmount,
    grandTotal,
    isProceedToPay,
    coupon_text,
  } = store;
  return {
    isModalOpen,
    bookInCart,
    cartAmount,
    grandTotal,
    isProceedToPay,
    coupon_text,
  };
};

function Modal({
  isModalOpen,
  closeModal,
  bookInCart = [],
  removeItem,
  decrement,
  increment,
  grandTotal,
  getTotal,
  clearCart,
  proceedToPay,
  isProceedToPay,
  applyCoupon,
  applyForDiscount,
  coupon_text,
  submitCoupon,
}) {
  React.useEffect(() => {
    getTotal();
  });
  return (
    <div>
      <div
        className={`${
          isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        {!isProceedToPay ? (
          <div className="modal-container">
            <h3>Your cart Items</h3>
            <button className="close-modal-btn" onClick={closeModal}>
              <FaTimes className="close-modal-icon"></FaTimes>
            </button>
            <div>
              {bookInCart.length === 0 ? (
                <div>
                  <h2>The cart is empty.</h2>
                </div>
              ) : (
                <div>
                  <div className="clear-cart-proceed-to-pay">
                    <div className="clear-cart">
                      <button onClick={clearCart}>Clear Cart ??</button>
                    </div>
                    <div className="proceed-to-pay">
                      <button onClick={proceedToPay}>Proceed To Pay</button>
                    </div>
                  </div>
                  <hr />
                  {bookInCart.map((item) => {
                    const {
                      id,
                      image,
                      name,
                      price,
                      author,
                      genre,
                      stock,
                      amount,
                      indivisualTotalPrice,
                      isApplyCouponButton,
                      isCouponValid,
                    } = item;

                    return (
                      <div key={id} className="cart-container">
                        <div className="cart-container--items">
                          <div className="cart-image-details">
                            <img src={image} alt="my image" />
                            <div className="cart-item-details">
                              <p>Name: {name}</p>
                              <p>Author: {author}</p>
                              <p>Genre: {genre}</p>
                              <p>Price: {price}</p>
                              <p>Stock: {stock}</p>
                              <div className="remove-couple-button">
                                <div className="remove-button">
                                  <button onClick={() => removeItem(id)}>
                                    Remove
                                  </button>
                                </div>
                                <div className="apply-coupon">
                                  {!isApplyCouponButton ? (
                                    <div>
                                      {!isCouponValid ? (
                                        <button onClick={() => applyCoupon(id)}>
                                          Apply Coupon
                                        </button>
                                      ) : (
                                        <button disabled>
                                          Apply Coupon
                                        </button>
                                      )}
                                    </div>
                                  ) : (
                                    <div>
                                      <div className="apply-coupon-container">
                                        <p className="apply-coupon-text">
                                          You can get 50% off.
                                        </p>
                                        <p className="apply-coupon-text">
                                          Coupon : NameofBook123
                                        </p>
                                        <p className="apply-coupon-text">
                                        eg. Span123
                                        </p>
                                        <form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            submitCoupon(id, coupon_text);
                                          }}
                                        >
                                          <input
                                            type="text"
                                            placeholder="Apply Coupon here"
                                            value={coupon_text}
                                            name={coupon_text}
                                            onChange={(e) =>
                                              applyForDiscount(e.target.value)
                                            }
                                          />
                                          <div className="apply-decline-button">
                                            <label className="apply-discount">
                                              <button type="submit">
                                                Apply
                                              </button>
                                            </label>
                                            <label
                                              className="cancel-apply-discount"
                                              onClick={() => applyCoupon(id)}
                                            >
                                              <button>Decline</button>
                                            </label>
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="handle-amount">
                          <button
                            className="button-up"
                            onClick={() => increment(id, stock)}
                          >
                            +
                          </button>
                          <p>{amount}</p>
                          <button
                            className="button-down"
                            onClick={() => decrement(id, stock)}
                          >
                            -
                          </button>
                        </div>
                        <div className="book-total-price">
                          <p className="total-price">{indivisualTotalPrice}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <hr />
            <div className="grand-total">
              <div className="grand-total-text">Grand Total</div>
              <div className="grand-total-amount">${grandTotal}</div>
            </div>
          </div>
        ) : (
          <div className="modal-container">
            <button className="close-modal-btn" onClick={closeModal}>
              <FaTimes className="close-modal-icon"></FaTimes>
            </button>
            <div className="after-procedding-form">
              <h2>Thank you for Shoping.</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    closeModal: () => dispatch(closeModal()),
    removeItem: (id) => dispatch(removeItem(id)),
    increment: (id, stock) => dispatch(increment(id, stock)),
    decrement: (id, stock) => dispatch(decrement(id, stock)),
    getTotal: () => dispatch(getTotal()),
    clearCart: () => dispatch(clearCart()),
    proceedToPay: () => dispatch(proceedToPay()),
    applyCoupon: (id) => dispatch(applyCoupon(id)),
    applyForDiscount: (couponText) => dispatch(applyForDiscount(couponText)),
    submitCoupon: (id, value) => dispatch(submitCoupon(id, value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

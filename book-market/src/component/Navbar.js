import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { connect } from "react-redux";
import { openModal } from "../redux/action";

const mapStateToProps = (store) => {
  const { cartAmount } = store;
  return { cartAmount };
};

function Navbar({ cartAmount,openModal }) {
  return (
    <div className="nav-container">
      <div className="navbar">
        <div>React-Redux</div>
        <div className="cart-shower">
          <AiOutlineShoppingCart className="cart-icon" onClick={openModal} />
          <div className="cart-amount-circle">{cartAmount}</div>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openModal: ()=> dispatch(openModal())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

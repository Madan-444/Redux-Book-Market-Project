import React from "react";
import { connect } from "react-redux";
import { addToCart, increment } from "../redux/action";

const mapStateToProps = (store) => {
  const { bookList, grandTotal, isModalOpen, cartAmount,bookInCart,filteredBookList} = store;
  return { bookList, grandTotal, isModalOpen, cartAmount,bookInCart,filteredBookList };
};

function BookContainer({bookList = [],addToCart,filteredBookList}) {
  return (
    <section className="booklist-body">
      {bookList.length == 0 ? (
        <div>
          <h2>The book list is empty.</h2>
        </div>
      ) : (
        <div className="booklist-body-items">
          {filteredBookList.map((book) => {
            const {
              id,
              name,
              image,
              author,
              genre,
              published_date,
              stock,
              price,
            } = book;
            return (
              <section key={id}>
                <div className="book-item-box">
                  <img src={image} alt="imgae here" />
                  <div className="book-details">
                    <div>
                      <p>Name: {name}</p>
                      <p>Author: {author}</p>
                      <p>Genre: {genre}</p>
                    </div>
                    <div>
                      <p>Published Date: {published_date}</p>
                      <p>Stock: {stock}</p>
                    </div>
                  </div>
                  <div className="add-to-cart-button-price">
                    <p>Price: {price}</p>
                    <p><button onClick={()=> addToCart(id,price)}>Add to Cart</button></p>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    </section>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch(increment()),
    addToCart: (id,price)=> dispatch(addToCart(id,price))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookContainer);

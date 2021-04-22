import "./App.css";
import BookContainer from "./component/BookContainer";
import Navbar from "./component/Navbar";
import { Provider } from "react-redux";
import store from "./redux/store";
import Modal from "./component/Modal";
import FilterbyGenre from "./component/FilterbyGenre";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Navbar />
        <FilterbyGenre />
        <Modal />
        <BookContainer />
      </div>
    </Provider>
  );
}

export default App;

import { FaShoppingCart } from "react-icons/fa";
import { useGlobalContext } from "../hooks/useGlobalContext";

function Product({ product }) {
  const { dispatch, cart } = useGlobalContext();

  const itemInCart = cart.find((item) => item.id == product.id);
  return (
    <div className="card">
      <div className="card__info">
        <h5 className="card__title">{product.name}</h5>
        <h5 className="card__title">{product.description}</h5>
        <small className="card__price">Price: ${product.price}</small>
        <h5 className="card__title">{product.brand}</h5>
        <h5 className="card__title">{product.category}</h5>
      </div>
      {!itemInCart && (
        <button
          onClick={() =>
            dispatch({
              type: "ADD_TO_CART",
              payload: { ...product, amount: 1 },
            })
          }
          className="btn card__btn"
        >
          <FaShoppingCart className="icon" /> Add
        </button>
      )}
      {itemInCart && (
        <div className="card-action-btns">
          <button
            onClick={() => {
              if (itemInCart.amount == 1) {
                dispatch({ type: "DELETE", payload: itemInCart.id });
              } else {
                dispatch({ type: "DECREASE", payload: itemInCart.id });
              }
            }}
            className="btn card__btn__amount"
          >
            &#8722;
          </button>
          <span className="amount">{itemInCart.amount}</span>
          <button
            onClick={() =>
              dispatch({ type: "INCREASE", payload: itemInCart.id })
            }
            className="btn card__btn__amount"
          >
            &#43;
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;

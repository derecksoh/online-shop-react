import React, { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import Modal from "./UI/Modal";
import CartItem from "./CartItem";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";

const cssCartItem: string = "grid grid-cols-6 items-center gap-4 my-2";

const Cart: React.FC = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleHideCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal
      className={
        userProgressCtx.progress === "cart" ? "w-full text-center" : ""
      }
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleHideCart : () => {}}
    >
      <h2 className="my-4 font-bold text-2xl">Your Cart</h2>
      <ul className="list-none my-2 p-0">
        <li className={`${cssCartItem} + font-bold`}>
          <p>number</p>
          <p>Title</p>
          <p>Quantity</p>
          <p>Price</p>
          <p>Total Price</p>
        </li>
        {cartCtx.items.map((item, index) => (
          <CartItem
            indexNum={index + 1}
            key={item.id}
            title={item.title}
            quantity={item.quantity}
            price={item.price}
            onDecrease={() => cartCtx.removeItem(item.id)}
            onDelete={() => cartCtx.deleteItem(item.id)}
            onIncrease={() => cartCtx.addItem(item)}
          />
        ))}
        <li className={`${cssCartItem} text-xl font-bold`}>
          <p>Total Price</p>
          <p></p>
          <p></p>
          <p></p>
          <p>{currencyFormatter.format(cartTotal)}</p>
        </li>
      </ul>

      <p className="flex justify-end gap-4 ">
        <Button
          className="text-purple-900 active:text-stone-900 hover:text-stone-900"
          textOnly
          onClick={handleHideCart}
        >
          Close
        </Button>
      </p>
    </Modal>
  );
};

export default Cart;

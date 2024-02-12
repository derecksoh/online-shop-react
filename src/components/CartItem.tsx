import React from "react";
import { currencyFormatter } from "../util/formatting";

const cssCartItem: string = "grid sm:grid-cols-1 md:grid-cols-6 items-center gap-4 my-2";
const cssCartActions: string = "flex gap-4 items-center justify-center";
const cssCartActionButton: string =
  "cursor-pointer text-base w-6 h-6 rounded-[50%] border-none bg-stone-800 text-pink-400 flex items-center justify-center hover:bg-stone-900 hover:text-pink-300 active:bg-stone-900 active:text-pink-300";

const CartItem: React.FC<{
  indexNum: number;
  title: string;
  quantity: number;
  price: number;
  onDecrease: () => void;
  onIncrease: () => void;
  onDelete: () => void;
}> = ({
  indexNum,
  title,
  quantity,
  price,
  onDecrease,
  onIncrease,
  onDelete,
}) => {
  return (
    <li className={cssCartItem}>
      <p>{indexNum}</p>
      <p>{title}</p>
      <p className={cssCartActions}>
        <button className={`${cssCartActionButton}`} onClick={onDecrease}>
          -
        </button>
        <span>{quantity}</span>
        <button className={cssCartActionButton} onClick={onIncrease}>
          +
        </button>
      </p>
      <p>{currencyFormatter.format(price)}</p>
      <p>{currencyFormatter.format(price * quantity)}</p>
      <p className={cssCartActions}>
        <button className={cssCartActionButton} onClick={onDelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </p>
    </li>
  );
};

export default CartItem;

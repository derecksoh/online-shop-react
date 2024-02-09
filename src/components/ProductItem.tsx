import { currencyFormatter } from "../util/formatting";
import React, { useContext } from "react";
import Product from "../models/Product";
import { CartContext } from "../store/CartContext";
import Button from "./UI/Button";

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(product);
  }

  return (
    <li className="bg-stone-800 rounded-2xl overflow-hidden text-center shadow-md">
      <article className="h-full flex flex-col justify-between">
        <img
          className="w-full h-80 object-contain "
          src={product.image}
          alt={product.title}
        />
        <div>
          <h3 className="text-2xl font-bold my-3">{product.title}</h3>
          <p className="inline-block bg-pink-800 text-yellow-200 text-lg font-bold py-2 px-8 rounded m-0">
            price: {currencyFormatter.format(product.price)}
          </p>
          <p className="m-4">{product.description}</p>
        </div>
        <p className="mb-6">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
};

export default ProductItem;

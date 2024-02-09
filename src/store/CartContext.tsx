import React, { useReducer } from "react";
import Product from "../models/Product";

export type CartContextObj = {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: number) => void;
  deleteItem: (id: number) => void;
};

type State = {
  items: Product[];
};

type Action =
  | { type: "ADD_ITEM"; item: Product }
  | { type: "REMOVE_ITEM"; id: number }
  | { type: "DELETE_ITEM"; id: number };

export const CartContext = React.createContext<CartContextObj>({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  deleteItem: () => {},
});

function cartReducer(state: State, action: Action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item: Product) => item.id === action.item.id,
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      /*const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            updatedItems[existingCartItemIndex] = updatedItem;*/
      // below code is inline and better
      updatedItems[existingCartItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
    } else {
      updatedItems.push({
        ...action.item,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
    }

    return {
      ...state,
      items: updatedItems,
    };
  }

  if (action.type === "DELETE_ITEM") {
    const existingCartItemIndexAll = state.items.findIndex(
      (item) => item.id === action.id,
    );

    const updatedItems = [...state.items];
    updatedItems.splice(existingCartItemIndexAll, 1);

    return {
      ...state,
      items: updatedItems,
    };
  }

  return state;
}

export const CartContextProvider: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item: Product) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id: number) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  function deleteItem(id: number) {
    dispatchCartAction({ type: "DELETE_ITEM", id });
  }

  const cartCtx = {
    items: cart.items,
    addItem,
    removeItem,
    deleteItem,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

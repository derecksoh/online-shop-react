import React from "react";
import UserProgressContextProvider from "./store/UserProgressContext";
import CartContextProvider from "./store/CartContext";
import Products from "./components/Products";
import Header from "./components/Header";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <UserProgressContextProvider>
        <CartContextProvider>
          <Header />
          <Products />
          <Cart />
        </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;

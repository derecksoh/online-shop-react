import logoImg from "../logo.svg";
import React, { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import Button from "./UI/Button";
import useHttp from "../hooks/UseHttp";
import Error from "./Error";

let mainHeaderTitleCss: string = "flex gap-4 items-center ";

const requestConfig = {};

const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data: loadedUser,
    isLoading,
    error,
  } = useHttp("https://fakestoreapi.com/users/1", requestConfig, []);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  if (isLoading) {
    return <p className="text-center">logging in user</p>;
  }

  if (error) {
    return <Error title="Failed to login" message={error} />;
  }

  return (
    <header className="flex justify-between items-center py-12 px-[10%]">
      <div className={mainHeaderTitleCss}>
        <i className="fa-regular fa-circle-user fa-3x text-cyan-400"></i>
        <h2 className="text-cyan-200">Welcome {loadedUser.username}</h2>
      </div>
      <div className={mainHeaderTitleCss}>
        <img className="w-16 h-16 object-contain border-2 border-yellow-500 rounded-[50%]" src={logoImg} alt="Shop page pic" />
        <h1>Our Shop</h1>
      </div>
      <nav>
        <Button className="text-2xl font-sans" textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;

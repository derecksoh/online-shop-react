import React, { useState } from "react";

type UserProgressContextObj = {
  progress: string;
  showCart: () => void;
  hideCart: () => void;
};

export const UserProgressContext = React.createContext<UserProgressContextObj>({
  progress: "", // 'cart' , 'checkout'
  showCart: () => {},
  hideCart: () => {},
});

const UserProgressContextProvider:React.FC<{children: React.ReactNode}> = (props) => {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function hideCart() {
    setUserProgress("");
  }

  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
  };

  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {props.children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContextProvider;

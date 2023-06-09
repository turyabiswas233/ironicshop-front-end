import React, { createContext, useContext, useEffect, useState } from "react";
import watch from "../../assets/watch.png";
export const SELECTION = {
  toggle: "TOGGLE",
  deleteAll: "DELETE",
};
export const allDatas = createContext([]);

export const CartContext = createContext();

export function useCartContext() {
  const arr = useContext(allDatas);
  const [newData, setNewData] = useState(arr);
  const [price, setPrice] = useState(0);
  // done toggle items
  function toggleItems(id) {
    setNewData(() => {
      return newData.map((ele, uid) => {
        if (id == uid) {
          return {
            ...ele,
            isSelected: ele?.isSelected ? false : !ele?.isSelected,
          };
        }
        return { ...ele };
      });
    });
  }
  // function for auto update price
  function priceSeter() {
    newData.map((ele) => {
      setPrice((pre) => pre + ele.taka);
    });
  }
  useEffect(() => {
    setPrice(0);
    priceSeter();
  }, [newData]);
  // delete all items from cart
  function deleteCart() {
    setNewData((pre) => pre.filter((ele) => !ele.isSelected));
    setPrice(0);
  }

  return { newData, price, toggleItems, priceSeter, deleteCart };
}
export const CartContextProvider = ({ children }) => {
  const { newData, price, toggleItems, priceSeter, deleteCart, addToCart } =
    useCartContext();
  return (
    <CartContext.Provider
      value={(newData, price, toggleItems, priceSeter, deleteCart, addToCart)}
    >
      {children}
    </CartContext.Provider>
  );
};

import React, { createContext, useContext, useState } from "react";
import { datas } from "../../data/data";
export const SELECTION = {
  toggle: "TOGGLE",
  deleteAll: "DELETE",
};
export const allDatas = createContext(datas);

export const CartContext = createContext();

export function useCartContext() {
  const arr = useContext(allDatas);
  const [newData, setNewData] = useState([]);
  const [price, setPrice] = useState(0);
  // done toggle items
  function toggleItems(id) {
    setNewData(() => {
      return newData.map((ele) => {
        if (id == ele.itemID) {
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
  function priceSeter(id) {
    newData.map((ele) => {
      switch (ele.itemID) {
        case id:
          if (!ele.isSelected) {
            setPrice((pre) => pre + ele.taka);
            break;
          } else if (price !== 0) {
            setPrice((pre) => pre - ele.taka);
          }

        default:
          return price;
      }
    });
  }
  // delete all items from cart
  function deleteCart() {
    setNewData((pre) => pre.filter((ele) => !ele.isSelected));
    setPrice(0);
  }

  //add to cart
  function addToCart(id) {
    setNewData((pre) =>
      (pre.find((ele) => ele?.itemID == id) || undefined) !==
      arr.find((ele) => ele.itemID == id)
        ? [...pre, arr.find((ele) => ele.itemID == id)]
        : pre
    );
    console.log(newData);
  }
  return { newData, price, toggleItems, priceSeter, deleteCart, addToCart };
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

import React, { createContext, useContext, useEffect, useState } from "react";
import { datas } from "../../data/data";
export const SELECTION = {
  toggle: "TOGGLE",
  deleteAll: "DELETE",
};
export const allDatas = createContext(datas);

export const CartContext = createContext();

export function useCartContext() {
  const arr = useContext(allDatas);
  const [newData, setNewData] = useState(arr);
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

  //add to cart
  function addToCart(id) {
    // setNewData((pre) => {
    //   pre.find((ele) => {
    //     if (!ele) {
    //       alert(`Added ${id}`);
    //       return [...pre, arr.find((elem) => elem.itemID == id)];
    //     } else {
    //       alert("Already added.");
    //       return [...pre];
    //     }
    //   });
    // });
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

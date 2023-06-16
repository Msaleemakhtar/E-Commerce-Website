"use client";

import React, { ReactNode, createContext, useEffect, useReducer } from "react";
import { cartReducer } from "../reducer";

export const cartContext = createContext<any>(null);

const ContextWrapper = ({ children }: { children: ReactNode }) => {
  const initialValue = {
    cart: [
      {
        productId : "",
        quantity : 0,
      }
    ],
  };

  const [state, dispatch] = useReducer(cartReducer, initialValue);


  
  
  useEffect(()=>{
    let cart = localStorage.getItem("cart") as string;
    if(cart === null){
      localStorage.setItem("cart", JSON.stringify(state.cart));
    }else{
      initialValue.cart = JSON.parse(cart)

    }})


  useEffect(()=>{
    localStorage.setItem("cart", JSON.stringify(state.cart)) 
  },[state.cart])

  console.log("this is state", state.cart)
  return (   
    <cartContext.Provider value={{ state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};

export default ContextWrapper;

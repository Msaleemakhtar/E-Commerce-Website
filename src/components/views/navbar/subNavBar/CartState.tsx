
"use client"


import { cartContext } from "@/global/context"
import {useContext} from "react"
import { BsCart2 } from "react-icons/bs"




const CartState = () => {

const{quantity} = useContext(cartContext)





   return (
    
  <div className="flex-shrink-0 relative w-11 h-11 bg-gray-400 rounded-full flex items-center justify-center">
    <div className="absolute bg-red-400 text-sm top-1 right-0 w-4 h-4 rounded-full flex items-center justify-center ">
      {quantity}
    </div>
    <BsCart2 size={24} />
  </div>
   )
}
 

export default CartState;
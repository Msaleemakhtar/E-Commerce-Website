"use client"
import {oneProductType} from "@/components/utils/ProductDataTypes"
import { useContext, useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { client } from "../../../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image"
import { cartContext } from "@/global/context";
import toast, { Toaster } from "react-hot-toast";
const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}







const CartCheckOut =  ({cartData}:{cartData:Array<oneProductType>})=>{
    const[showCartData, setShowCartData] = useState<any>()
    const[totalPrice, setTotalprice] = useState(0)
    const {cartArray, userData, dispatch }=useContext( cartContext);

 
    function handleRemove(product_id: string) {
        if (userData) {
            let user_id = userData.uuid;
            dispatch("removeFromCart", { product_id, user_id });
        }
    }




    useEffect(()=>{
        
    if(cartArray){
        let data = cartData.filter((item:oneProductType)=>{
            
            for(let index  = 0; index <cartArray.length; index++){
                const element = cartArray[index]
                if(element.product_id=== item._id && element.user_id === userData.uuid){
                    return true
                }
            }
         
        });

        
    
          let updatedData = data.map((Subitem:oneProductType)=>{
          
            for(let index  = 0; index <cartArray.length; index++){
                const element = cartArray[index]
                if(element.product_id === Subitem._id){
                    return {
                       ...Subitem,
                       quantity:  element.quantity,
                    };
                }
            }
         
        });

        
          setShowCartData(updatedData)
         
    }    

    }, [cartArray])



    function handleInc(product_id:string, price:any) {
        let Cartquantity:number  = 0;
        cartArray.forEach((elem:any)=>{
         if(elem.product_id === product_id ){
          Cartquantity  == elem.quantity
         }
        })
    }

    function handleDec(product_id:string, price:any) {
        let Cartquantity:number  = 0;
        cartArray.forEach((elem:any)=>{
         if(elem.product_id === product_id ){
          Cartquantity  == elem.quantity
         }
        })
        if(Cartquantity -1 <= 0){
            notification("quantity cannot be in Minus")
        }else{

            dispatch ("updateCart",{
                product_id: product_id,
                user_id:userData.uuid,
                quantity: Cartquantity - 1 ,
                price : price,

            })
            notification("Decrement by One")
        }
    };
    const notification = (title: string) =>
    toast.success(`${title} `, {
      duration: 4000,
      position: "top-center",
      className: "border-2 border-indigo-200 border-t-indigo-500",
    });
    return(
         <div className="py-10 px-4 md:px-10">
           <Toaster />

        {/* first */}
        <div className="py-6">
            <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
        </div>


        {/* second */}
        <div className="flex flex-col lg:flex-row gap-6">


     <div className="flex flex-col basis-[69%] gap-4">
{showCartData?.map((item:oneProductType, index:number)=>(
                        <div key = {index} className=" flex flex-shrink-0 gap-6">
                            <div className="w-[14rem]">
                                 <Image className="rounded-xl" width={1000} height={1000} src={urlFor(item.image[0]).width(1000).height(1000).url()} alt={item.image[0].alt} /> 
                            </div>
                            <div className="space-y-1 md:space-y-3 w-full">
                                <div className="flex justify-between">
                                    <h2 className="md:text-2xl font-light text-gray-700">{item.productName}</h2>
                                    <div className="cursor-pointer" onClick={() => handleRemove(item._id)}>
                                        <RiDeleteBin6Line size={28} />
                                    </div>
                                </div>
                                <p className="text-gray-400 font-medium">{item.productTypes[1]}</p>
                                <h3 className="text-sm md:text-base">Delivery Estimation</h3>
                                <h4 className="text-orange-400 font-semibold md:text-xl">5 Working Days</h4>
                                <div className="flex justify-between">
                                    <p className="font-semibold md:text-lg">{"$"}{item.price}</p>
                                    <div className="flex gap-2  items-center text-lg">
                                        <button
                                          onClick={()=>handleDec(item._id, item.price)}
                                            className="select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full bg-gray-200">
                                            -
                                        </button>
                                        <p>{item.quantity}</p>
                                        <button
                                         onClick={()=>handleInc(item._id, item.price)}
                                            className="border select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full  border-gray-800"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
           
               ))}
             
            </div>
           



            <div className="basis-1/4 space-y-6 px-6">
                <h6 className="font-semibold text-xl">Order Summary</h6>
                <div className="flex justify-between">
                    <p className="text-lg font-light">Quantity:</p>
                    <p>{cartArray.length} Products</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-lg font-light">Subtotal:</p>
                    <p>${totalPrice}</p>
                </div>
                <button
                 
                    className="text-white bg-gray-900 border border-gray-500 px-4 py-2 w-full">
                   
                        Process to Checkout
                 
                </button>
            </div>

        </div>


    </div>
)
}






export default CartCheckOut;
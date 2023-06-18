"use client"
import {oneProductType} from "@/components/utils/ProductDataTypes"
import { useEffect, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { client } from "../../../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Image from "next/image"

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}







const CartCheckOut =  ({cartData}:{cartData:Array<oneProductType>})=>{
    const[showCartData, setShowCartData] = useState<any>()

      
    useEffect(()=>{
        let storageData:any = localStorage.getItem("cart") as string;
        storageData = JSON.parse(storageData)
    if( storageData){
        let data = cartData.filter((item:oneProductType)=>{
            for(let index  = 0; index <storageData.length; index++){
                const element = storageData[index]
                if(element.productId === item._id){
                    return true
                }
            }
         
        })
          setShowCartData(data)
    }
        
    }, [cartData])
  
    return(
         <div className="py-10 px-4 md:px-10">
     

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
                                    <div >
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
                                          
                                            className="select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full bg-gray-200">
                                            -
                                        </button>
                                        <p>5</p>
                                        <button
                                       
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
                    <p>{"cartArray.length"} Products</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-lg font-light">Subtotal:</p>
                    <p>${"Price"}</p>
                </div>
                <button
                 
                    className="text-white bg-gray-900 border border-gray-500 px-4 py-2 w-full">
                   
                        "Process to Checkout"
                 
                </button>
            </div>

        </div>


    </div>
)
}






export default CartCheckOut;
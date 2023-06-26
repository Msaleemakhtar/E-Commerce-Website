"use client";

import toast, { Toaster } from "react-hot-toast";
import { FC, useContext } from "react";
import {
  oneProductType,
  imagesType,
} from "@/components/utils/ProductDataTypes";
import Image from "next/image";
import { client } from "../../../../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { cartContext, } from "@/global/context";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const ProductDetail: FC<{ item: oneProductType }> = ({ item }) => {
  let { dispatch, userData, cartArray } = useContext(cartContext);
  const [previewImage, setPreviewImage] = useState<string>(item.image[0]._key);
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity !== 0) {
      setQuantity(quantity - 1);
    }
  };


  

  function cartHandle() {
    let isExsits = cartArray.some((elem: any) => elem.product_id === item._id);
    console.log(isExsits)
if(userData) {
  console.log(userData)
   let dataToAddInCart  =   {
        product_id: item._id,
        quantity: quantity,
        price: item.price,
        user_id: userData.uuid,
      }
      if(!isExsits) {
         dispatch("addToCart", dataToAddInCart);
      }else{
        dispatch("updateCart", dataToAddInCart);
      }
   
    notification(item.productName);
  }

}
   



  const notification = (title: string) =>
    toast.success(`${quantity}${title} added to Cart`, {
      duration: 4000,
      position: "top-center",
      className: "border-2 border-indigo-200 border-t-indigo-500",
    });

  return (
    <div>
      <Toaster />
      <div className=" flex flex-col lg:flex-row items-center justify-center gap-6 py-7">
        {/* imges */}
        <div className="flex gap-4 md:gap-8">
          {/* left side imges */}
          <div className="space-y-3">
            {item.image.map((subItems: imagesType, index: number) => (
              <div
                onClick={() => setPreviewImage(subItems._key)}
                key={index}
                className="w-16 md:w-24"
              >
                <Image
                  width={1000}
                  height={1000}
                  alt={subItems.alt}
                  src={urlFor(subItems).width(1000).height(1000).url()}
                />
              </div>
            ))}
          </div>
          {/* right side imges */}
          <div className="w-[17rem] md:w-[33rem] flex flex-wrap-0">
            {item.image.map((subItems: imagesType, index: number) => {
              if (subItems._key === previewImage) {
                return (
                  <Image
                    key={index}
                    width={1000}
                    height={1000}
                    alt={subItems.alt}
                    src={urlFor(subItems).width(1000).height(1000).url()}
                  />
                );
              }
            })}
          </div>
        </div>

        {/* right side of main div  */}
        <div className=" space-y-10 ">
          {/* title */}

          <div>
            <h1 className="text-3xl text-gray-800">{item.productName}</h1>
            <p className="text-xl text-pink-300 font-medium">
              {item.productTypes[1]}
            </p>
          </div>

          {/* sizes */}

          <div className="space-y-2">
            <p className="text-xl text-gray-700 font-medium">Select Size</p>
            <div className="flex gap-2 tex-pink-600">
              {item.size.map((subItems: string, index: number) => (
                <div
                  key={index}
                  className=" cursor-pointer hover:shadow-xl flex justify-center items-center hover:bg-gray-100 font-semibold w-12 h-12 rounded-full"
                >
                  {subItems}
                </div>
              ))}
            </div>
          </div>

          {/* counter */}
          <div className="flex gap-6">
            <p className="text-xl text-gray-700 font-medium">Quantity:</p>
            <div className="flex justify-center items-center gap-2">
              <div
                onClick={decrementQuantity}
                className="select-none  bg-gray-100 w-8 h-8 rounded-full flex justify-center items-center font-bold"
              >
                -
              </div>
              <span>{quantity}</span>
              <div
                onClick={incrementQuantity}
                className=" select-none bg-gray-100 w-8 h-8 rounded-full flex justify-center items-center font-bold"
              >
                +
              </div>
            </div>
          </div>

          {/* add to cart */}

          <div className=" flex items-center gap-4">
            <button
              onClick={() => cartHandle()}
              className="flex items-center bg-gray-900 rounded-sm px-3 py-3 text-white "
            >
              <BsCart2 size={23} />
              &nbsp; &nbsp; Add To Cart
            </button>
            <p className="text-2xl font-bold">
              ${item.price}
              {".00"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

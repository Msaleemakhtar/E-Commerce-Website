"use client"
import { FC } from "react"
import {oneProductType,imagesType} from "@/components/utils/ProductDataTypes"
import Image from "next/image";
import {client} from "../../../../sanity/lib/client"
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source)
}

const ProductDetail:FC<{item:oneProductType}> = ({item}) => {
  console.log(item)
    return (
        <div>
               {/* imges */}
              <div>
               {/* left side imges */}
              <div>
                {
                item.image.map((subItems:imagesType, index:number)=>(
                    <div key={index} className="w-24">
                           <Image width={1000} height={1000} alt={subItems.alt} src={urlFor(subItems).width(1000).height(1000).url()} />
                    </div>
                )) 
                }
              </div>
                {/* right side imges */}
              <div></div>
              </div>



        </div>
    
    )
  }
  
  export default ProductDetail;
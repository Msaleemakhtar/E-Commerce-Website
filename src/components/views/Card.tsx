
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import {oneProductType} from "../utils/ProductDataTypes"
import React, {FC} from "react"
import {client} from "../../../sanity/lib/client"

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source)
}

const Card:FC<{singleProductData: oneProductType}> = ({singleProductData})=>{
return(

    <div>
    {singleProductData.productName}
    <Image width ={1000} height = {1000} src = {urlFor(singleProductData.image[0]).width(1000).url()}/>
    </div>
)
}



export default Card;
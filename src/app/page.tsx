

import BASE_PATH_FORAPI from "@/components/shared/BasePath";
import Hero from "@/components/views/Hero";
import ProductType from "@/components/views/ProductType";
import {responseType} from "@/components/utils/ProductDataTypes";
import ProductCarousal from "@/components/views/ProductCarousal";
import Jewellery from "@/components/views/Jewellery";
import Newsletter from "@/components/views/Newsletter";

async function getData (){
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-05/data/query/production?query=*[_type == "products"]`, {
    next:{
      revalidate: 60
    }
  });

  if(!res.ok){
    throw new Error("failed to fetch data");
  }
  return res.json();

}





export default async function Home() {
  const {result }:responseType = await getData ();

  return (
    <main>
  <Hero/>
  <ProductType/>
 <ProductCarousal ProductData = {result}/>
 <Jewellery/>
 <Newsletter/>
   </main>
  )
}

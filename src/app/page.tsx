

import BASE_PATH_FORAPI from "@/components/shared/BasePath";
import Hero from "@/components/views/Hero";
import ProductType from "@/components/views/ProductType";
import ProductCarousal from "@/components/views/ProductCarousal"

async function getData (){
  const res = await fetch(`${BASE_PATH_FORAPI}/api/products`);

  if(!res.ok){
    throw new Error("failed to fetch data")
  }
  return res.json();

}





export default async function Home() {
  const{response}= await getData ();
  return (
    <main>
  <Hero/>
  <ProductType/>
  <ProductCarousal ProductData = {response}/>
   </main>
  )
}

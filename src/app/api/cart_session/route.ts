import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";
import { oneProductType } from "@/components/utils/ProductDataTypes";

interface stripeDataType {
  name: string;
  price: string;
  quantity: number;
}

let stripeData: Array<stripeDataType> = [
  {
    name: 'Raglan Sweatshirt',
    price: 'price_1NNipGImvkOQxtifjfkfQ2qi',
    quantity: 1,
  },

  {
    name: 'Brushed Raglan Sweatshirt',
    price: 'price_1NNinaImvkOQxtifOjzTUdVU',
    quantity: 1,
  },
  
  {
    name: 'Pink Fleece Sweatpants',
    price:' price_1NNim5ImvkOQxtifxCIaYoli',
    quantity: 1,
  },
  {
    name: 'Hooded Sweatshirt',
    price: 'price_1NNiklImvkOQxtifjKtwSXmi',
    quantity: 1,
  },
  {
    name: 'Tie Dress',
    price: 'price_1NNiiiImvkOQxtifrsstLU0Z',
    quantity: 1,
  },
  {
    name: 'Alpaca Hoodie',
    price: 'price_1NNihbImvkOQxtifihfArxiR',
    quantity: 1,
  },
  {
    name: 'Muscle Tank',
    price: 'price_1NNifsImvkOQxtifYN9uf10e',
    quantity: 1,
  },
  {
    name: 'Flex Push Button Bomber',
    price: 'price_1NNimuImvkOQxtifloHv1mh1',
    quantity: 1,
  },
  {
    name: 'Flex Sweatshirt',
    price: 'price_1NNioFImvkOQxtifp4NnRjEc',
    quantity: 1,
  },
]


// @ts-ignore
 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest){
  let cartData = await req.json();


 try {
  let matchedData = stripeData.filter((item: stripeDataType) => {
    for (let index = 0; index < cartData.length; index++) {
      const element = cartData[index];
      if (element.productName === item.name) {
        return true;
      }
     
    }
  
  });
  let updatedMatchedData: any = matchedData.map((item: stripeDataType) => {
          for (let index = 0; index < cartData.length; index++) {
            const element: oneProductType = cartData[index];
            if (element.productName === item.name) {
              return {
                price: item.price,
                quantity: element.quantity,
              }
    
            }
          }
        });
  

        let session = await stripe.checkout.sessions.create({
                line_items:  updatedMatchedData,
                mode: "payment",
                success_url: `${req.nextUrl.origin}/?success=true`,
                cancel_url: `${req.nextUrl.origin}/?success=false`
            })
    
            return NextResponse.json({link:session.url});
       

  

 } catch (error) {
  console.log((error as {message:string}).message)
  return NextResponse.json({error});
 }
  
} 



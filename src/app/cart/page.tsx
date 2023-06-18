
import CartCheckOut from "@/components/views/CartCheckOut"
import ContextWrapper from "@/global/context"

async function getData (){
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-05/data/query/production?query=*[_type == "products"]`, {
        cache: "no-store",
    });
  
    if(!res.ok){
      throw new Error("failed to fetch data");
    }
    return res.json();
  
  }

const Cart = async () => {
    let AllData = await getData();
  return (
   
  <CartCheckOut cartData = {AllData.result}/>
  
  )
}

export default Cart;
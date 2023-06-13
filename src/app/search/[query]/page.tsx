
import {oneProductType} from "@/components/utils/ProductDataTypes"
import {client} from "../../../../sanity/lib/client"
import CardAll from "@/components/views/CardsAll";

async function getData (){
  const response = await client.fetch(`*[_type == "products"]`)

  return response

}



 const SearchQuery = async ({params}:{params:{query:string}}) => {
  let slug = (params.query).toLowerCase()
   let allData = await getData ()
 
  let filterData = allData.filter((item:oneProductType)=>{
    if(item.productName.toLowerCase().indexOf(slug) >= 0){
      return true;
    }
    return false;
  })
;
  
  return (
    <div
    className="grid grid-cols-2 md:grid-cols-3 py-10 lg:grid-cols-4 gap-4"
  >
    {filterData &&
    filterData.map((items: oneProductType, index: number) => {
      return (
        <CardAll key={index} singleProductData={items} />
      );
    })}
  </div>
  )
}




export default SearchQuery



import { oneProductType } from "@/components/utils/ProductDataTypes";
import { NextRequest, NextResponse } from "next/server";

 
 export async function GET(request:NextRequest) {
   const originalData:Array<oneProductType> = []
  
    const url = request.nextUrl.searchParams;
  
    
    let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-06-05/data/query/production?query=*[_type == "products"]`)

    let api_data = await res.json() 
    
    originalData.push(...api_data.result) 
  

    if(url.has("start") || url.has("end") ) {

        if(originalData[Number( url.get( "start"))]){
          
     let sliceData =  originalData.slice(Number( url.get( "start")), Number( url.get("end")))
      return NextResponse.json({sliceData}) 
        } 
        return NextResponse.json({sliceData: "No data found"}) 
      
    }
    return NextResponse.json({originalData}) 

  };
  

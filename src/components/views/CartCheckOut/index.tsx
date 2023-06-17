
import {oneProductType} from "@/components/utils/ProductDataTypes"


const CartCheckOut = ({cartData}:{cartData:Array<oneProductType>})=>{



    return(
        <div>{cartData[0].productName}</div>
    )
}


export default CartCheckOut;
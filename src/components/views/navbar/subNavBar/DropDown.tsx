import { NavbarItems, NavbarArray} from "@/components/utils/NavbarData"
import Link from "next/link"
import { FC } from "react"

const DropDown: FC<{item:NavbarItems}> = ({item}) => {
  return (
    <ul>
        {item.dropDownData?.map((item:NavbarItems, index:number)=>(
           <li key={index} className="hover:ml-2 -translate-y-7 group-hover:translate-y-0 duration-300">
            <Link href={item.href} >{item.label}</Link>
            </li> 
        ))}
    </ul>
  )
}

export default DropDown;
"use client";

import { FC } from "react";
import { NavbarItems, NavbarArray } from "@/components/utils/NavbarData";
import { HiOutlineChevronDown } from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";

const Expand: FC<{ item: NavbarItems }> = ({ item }) => {
  const [isExpand, setExpand] = useState(false);
  const [isTimeOut, setTimeOut] = useState(false);

  const handleClicked = () => {
    setExpand(!isExpand);
    setTimeout(() => {
      setTimeOut(!isTimeOut);
    }, 100);
  };

  return (
    <li className={`${isExpand ? "h-48" : "h-12"} duration-300 list-none`}>
      <div
        onClick={handleClicked}
        className=" flex justify-between items-center py-2 px-3 rounded-md hover:bg-purple-600 duration-300 "
      >
        <Link href={item.href}>{item.label} </Link>
        {item.isDropDown ? 
          <HiOutlineChevronDown
            className="mt-1 -rotate-180 group-hover:rotate-0 duration-300"
            size={15}
          />
         : 
          ""
        }
      </div>


      <div className = " flex flex-col space-y-1 mt-2">
      { isTimeOut && item.dropDownData?.map((item:NavbarItems, index:number)=>(
         
         <Link  key = {index} href={item.href} className="hover:bg-gray-50 rounded-md py-1 px-5 duration-300 " >{item.label}</Link>))}
           
      </div>
    </li>
  );
};

export default Expand;

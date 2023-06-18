"use client";
import { NavbarItems, NavbarArray } from "@/components/utils/NavbarData";
import { HiOutlineChevronDown } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import DropDown from "./subNavBar/DropDown";
import Expand from "./subNavBar/Expand";
import { useRouter } from "next/navigation";
import CartState from "./subNavBar/CartState";
import ContextWrapper from "@/global/context";


const Navbar = () => {
  const Router = useRouter()
  const [isNavbarOpen, setNavbarOpen] = useState<boolean>(false);
  const[searchQuery, setSearchQuery]= useState ("") 


  const searchHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.keyCode === 13 && searchQuery.trim() !== '') {
      Router.push(`/search/${searchQuery}`);
    }
  };





  return (

    <ContextWrapper>
    <div className="sticky tp-0 z-50 bg-white">
      <div className=" py-5 flex items-center justify-between space-x-12">
        {/* *****Logo*** */}

        <div className="w-36 flex-shrink-0 ">
          <Image src={"/Logo.webp"} height={500} width={500} alt="logo" />
        </div>

        {/* *****Labels and dropdown Menues*** */}
        <div className="hidden lg:flex justify-between items-center w-full">
          <ul className=" flex space-x-5 font-500 text-lg text-purple-800">
            {NavbarArray.map((item: NavbarItems, index: number) => (
              <li
                key={index}
                className="relative flex items-center hover: bg-gray-100  border rounded-md px-3 py-1  cursor-pointer group "
              >
                <Link href={item.href}>{item.label} </Link>
                {item.isDropDown ? (
                  <HiOutlineChevronDown
                    className="mt-1 -rotate-180 group-hover:rotate-0 duration-300"
                    size={15}
                  />
                ) : (
                  ""
                )}

                {item.isDropDown && (
                  <div
                    className={`invisible group-hover:visible absolute top-8 left-0 py-2 px-6 bg-gray-100 font-light min-w-[7.8rem]`}
                  >
                    {<DropDown item={item} />}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* *****Search Bar*** */}


          

          <div className="flex items-center border px-3 rounded-md ">
          {searchQuery.trim() !== '' ? (
        <Link href={`/search/${searchQuery}`}>
          <BiSearch />
        </Link>
      ) : (
        <div>
          <BiSearch style={{ color: 'gray', cursor: 'not-allowed' }} />
        </div>
      )}
            <input
            value={searchQuery}
            onKeyDown={searchHandle}
            onChange={(e)=>setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search Your Product "
              className=" pl-1 pr-5  py-1 w-80"
            
            />
          </div>
          
          {/* *****Cart*** */}

          <Link href={"/cart"}>

          <CartState/>
          </Link>

       
        </div>

        {/* *****hamberg and close icon on Mobile View*** */}

        <div
          className=" cursor-pointer"
          onClick={() => setNavbarOpen(!isNavbarOpen)}
        >
          {isNavbarOpen ? (
            <div className="flex lg:hidden">
              <IoMdClose size={25} />
            </div>
          ) : (
            <div className="flex lg:hidden">
              <GiHamburgerMenu size={25} />
            </div>
          )}
        </div>
      </div>
      {isNavbarOpen && <MobileView />}
    </div>
    </ContextWrapper>
  );
};

export default Navbar;

const MobileView = () => {
  return (
    <div className="w-full px-6 py-4 bg-gray-100">
      {NavbarArray.map((item: NavbarItems, index: number) => {
        return <Expand key={index} item={item} />;
      })}
    </div>
  );
};

import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="text-gray-500 body-font">
        <div className = " container flex flex-col flex-wrap mx-auto text-start px-5 py-10 md:flex-nowrap md:flex-row md:items-start">

           {/* ***image**** */}
        <div className="w-64 space-y-3 flex-shrink-0 mx-auto text-start md:mx-0 md:text-left">
            <Link href = {"/"}> 
            
            <Image src={"/logo.webp"} width={150} height={150} alt= "logo"/>
             </Link>

             <p >Small, artisan label that offers a thoughtfully curated collection of high quality everyday essentials made</p>


        </div>
                 {/* ***other**** */}

                 <div className = "flex flex-grow flex-wrap text-start  mt-10 md:mt-0 md:text-left md:pl-20 mouse-pointer">

                 <div className = "w-full md:w-1/2 lg:w-1/4 px-4 "> 
                    <h2 className= "text-xl font-bold tracking-widest mb-3">Company</h2>
                    <nav className="list-none mb-10 space-y-4">
                        <li>
                            <a className = "text-gray-400 hover:text-gray-800">About</a></li>
                        <li><a className = "text-gray-400 hover:text-gray-800"> Terms of Use</a></li>
                        <li><a className = "text-gray-400 hover:text-gray-800">Privacy Policy</a></li>
                        <li><a className = "text-gray-400 hover:text-gray-800">How it Works</a></li>
                        <li><a className = "text-gray-400 hover:text-gray-800">Contact Us</a></li>
                        
                    </nav>

                 </div>

                 <div className = "w-full md:w-1/2 lg:w-1/4 px-4 "> 
                    <h2 className= "text-xl font-bold tracking-widest mb-3">Support</h2>
                    <nav className="list-none mb-10 space-y-4">
                        <li><a className = "text-gray-400 hover:text-gray-800">Support Carrer</a></li>
                        <li><a className = "text-gray-400 hover:text-gray-800">24h Service</a></li>
                        <li><a className = "text-gray-400 hover:text-gray-800">Quick Chat</a></li>
                      
                        
                    </nav>


                 </div>
                 <div className = "w-full md:w-1/2 lg:w-1/4 px-4"> 
                    <h2 className= "text-xl font-bold tracking-widest mb-3">Contact</h2>
                    <nav className="list-none mb-10 space-y-4">
                        <li><a className = "text-gray-400 hover:text-gray-800">Whatsapp</a></li>
                        <li><a className = "text-gray-600 hover:text-gray-800">Support 24h</a></li>
                   
                        
                    </nav>


                 </div>
                 </div>
        
                 </div>
        

         {/* ***bottom part**** */}
        
        <div></div>
        
        
        
        </footer>
  )
}

export default Footer;
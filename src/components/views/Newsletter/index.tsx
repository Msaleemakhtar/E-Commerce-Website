
const Newsletter = () => {
  return (
    <div className="relative space-y-5 flex flex-col justify-center items-center min-h-[40vh] md:min-h-[70vh] lg:min-h-[40rem]">
<p className=" absolute -z-50 font-bold text-6xl md:text-[8rem] text-center max-auto text-gray-200">Newsletter</p>
<h6 className=" text-3xl md:text-4xl font-bold text-center">Subscribe Our Newsletter</h6>
<h6 className="max-w-[16rem] md:max-w-none text-lg">Get the latest information and promo offers directly</h6>
<div className=" flex gap-4 py-1 justify-center items-end flex-wrap">
  <input type="text " placeholder="Enter your Email" className="border border-gray-300 py-2 px-2 flex flex-grow w-60 md:w-80"/>
  <button className="text-white bg-gray-800  border border-gray-600 py-2 px-4">Get Started</button>
</div>

    </div>
  )
}

export default Newsletter
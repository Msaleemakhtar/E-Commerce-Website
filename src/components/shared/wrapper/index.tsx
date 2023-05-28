

export default function Wrapper  ({
  children,
}: {
  children: React.ReactNode
}){
  return (
    <div className='mx-w-7xl mx-auto px-4 md:px-10 '>
      {children}  
    </div>
  )
}


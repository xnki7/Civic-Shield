import React from 'react'

const Navbar = () => {
  return (
    <div className='Navbar w-[100%] h-[7rem] bg-[#020B2D] flex gap-[34rem] '>
      <div className='logo ' >
      <img  src="../../public/Hero-Logo.png" alt="" />
      </div>
      <div className=' text-[#FFF] text-[1.5rem]  flex  gap-[40px] items-center font-normal font-mono ' >    
        <h1>Home</h1>
        <h1>About</h1>
      </div>
      <div>
        <button className='w-[132px] text-[#FFF] mt-[2.2rem] text-[20px] border-white border-solid border-2 p-1 rounded-3xl hover:bg-white hover:text-[black] ' >Login|Signup</button>
      </div>
    </div>
  )
}

export default Navbar

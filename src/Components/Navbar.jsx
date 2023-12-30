import React from 'react'
import logo from "./logo.svg";

const Navbar = () => {
  return (
    <div className='Navbar w-[100%] h-[5rem] bg-[#020B2D] flex justify-between items-center '>
      <div className='logo h-[100%] flex justify-between items-center' >
        <img src={logo} alt="" className='h-[100%]' />
        <p className="logo font-bold text-xl text-[#FFF]">Civic-Shield</p>
      </div>
      <div className='text-[#FFF] text-[1rem] flex  gap-[40px] items-center font-normal font-mono ' >
        <h1>Home</h1>
        <h1>About</h1>
      </div>
      <div>
        <button className='max-w-max text-[#FFF] text-[1rem] border-white border-solid border-2 px-2 rounded-3xl hover:bg-white hover:text-[black] p-2 mr-2' >Login | Sign Up</button>
      </div>
    </div>
  )
}
 
export default Navbar

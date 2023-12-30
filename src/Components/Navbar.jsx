import React, { useState } from "react";
import logo from "./logo.svg";
import { IoMdMenu } from "react-icons/io";
import Styles from "./Navbar.module.css";
import { IoCloseSharp } from "react-icons/io5";


const Navbar = () => {
  const [menu, setmenu] = useState(false);
  return (
    <div className="Navbar w-[100%] h-[5rem] bg-[#020B2D] flex justify-between items-center ">
      <div className="logo h-[100%] flex justify-between items-center">
        <img src={logo} alt="" className="h-[100%]" />
        <p className="logo font-bold text-xl text-[#FFF]">Civic-Shield</p>
      </div>
     {
      !menu?<div className={Styles.function}>
       <div className="text-[#FFF] text-[1rem] flex  gap-[40px] items-center font-normal font-mono ">
        <h1>Home</h1>
        <h1>About</h1>
      </div>
     </div>:null
     }
      {
        !menu?<div className={Styles.logsignbtn}>
        <button className="max-w-max text-[#FFF] text-[1rem] border-white border-solid border-2 px-2 rounded-3xl hover:bg-white hover:text-[black] p-2 mr-2">
          Login | Sign Up
        </button>
      </div>:null
      }
        {
          !menu?<div onClick={()=>{setmenu(true)}} className={Styles.hamburger }>
          <IoMdMenu />
        </div>:null
        }
        {
          menu?<div  className={Styles.menucontent} >
            <IoCloseSharp onClick={()=>{setmenu(false)}} className={Styles.close} />
            <img className={Styles.log} src={logo} alt="" />
            <ul className={Styles.list} >
              <li>Home</li>
              <li>About</li>
              <li>Login</li>
              <li>Sign up</li>
            </ul>
            
        </div>:null
        }
    </div>
  );
};

export default Navbar;

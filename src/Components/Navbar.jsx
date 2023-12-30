// import React, { useState } from "react";
// import logo from "./logo.svg";
// import { IoMdMenu } from "react-icons/io";
// import Styles from "./Navbar.module.css";
// import { IoCloseSharp } from "react-icons/io5";

// const Navbar = () => {
//   const [menu, setmenu] = useState(false);
//   return (
//     <div className="Navbar w-[100%] h-[5rem] bg-[#020B2D] flex justify-between items-center ">
//       <div className="logo h-[100%] flex items-center">
//         <img src={logo} alt="" className="h-[100%]" />
//         <p className="logo font-bold text-xl text-[#FFF]">Civic-Shield</p>
//       </div>
//       {!menu ? (
//         <div className={Styles.function}>
//           <div className="text-[#FFF] text-[1rem] flex  gap-[40px] items-center font-normal font-mono ">
//             <h1>Home</h1>
//             <h1>About</h1>
//           </div>
//         </div>
//       ) : null}
//       {!menu ? (
//         <div className={Styles.logsignbtn}>
//           <button className="max-w-max text-[#FFF] text-[1rem] border-white border-solid border-2 px-2 rounded-3xl hover:bg-white hover:text-[black] p-2 mr-2">
//             Login | Sign Up
//           </button>
//         </div>
//       ) : null}
//       {!menu ? (
//         <div
//           onClick={() => {
//             setmenu(true);
//           }}
//           className={Styles.hamburger}
//         >
//           <IoMdMenu />
//         </div>
//       ) : null}
//       {menu ? (
//         <div className={Styles.menucontent}>
//           <IoCloseSharp
//             onClick={() => {
//               setmenu(false);
//             }}
//             className={Styles.close}
//           />

//           <ul className={Styles.list}>
//             <li>Home</li>
//             <li>About</li>
//             <li>Login</li>
//             <li>Sign up</li>
//           </ul>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default Navbar;

import { useState } from 'react';
import logo from './logo.svg';
import { IoMdMenu } from 'react-icons/io';
import { IoCloseSharp } from 'react-icons/io5';

const Navbar = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div className="w-full h-20 bg-[#020B2D] flex justify-between items-center ">
      <div className="flex items-center h-full">
        <img src={logo} alt="" className="h-full" />
        <p className="text-white font-bold text-xl">Civic-Shield</p>
      </div>

      {!menu && (
        <>
          <div className="hidden md:flex text-white text-lg gap-10 items-center font-mono">
            <h1>Home</h1>
            <h1>About</h1>
          </div>

          <button className="hidden md:block bg-transparent text-white border border-white rounded-full px-4 py-2 hover:bg-white hover:text-black mr-2">
            Login | Sign Up
          </button>

          <div
            onClick={() => setMenu(true)}
            className="block md:hidden text-white text-2xl mr-8 cursor-pointer"
          >
            <IoMdMenu />
          </div>
        </>
      )}

      {menu && (
        <div className="fixed top-0 right-0 w-[38%] h-[20rem] bg-[#020B2D] rounded-bl-xl transition-all duration-700 flex items-center justify-center z-10">
          <IoCloseSharp
            onClick={() => setMenu(false)}
            className="absolute top-[5%] right-[80%] text-white text-[1.5rem] cursor-pointer"
          />

          <ul className=" text-white flex flex-col items-center gap-8 ">
            <li className="cursor-pointer">Home</li>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Login</li>
            <li className="cursor-pointer">Sign up</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;


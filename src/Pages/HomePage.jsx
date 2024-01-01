import React from 'react'
import Navbar from "../Components/Navbar"
import Carousel from "../Components/Carousel"
import Features from "../Components/Features"

const HomePage = () => {
  return (
    <div className='HomePage'>
      <Navbar/>
      <Carousel/>
      <Features/>
    </div>
  )
}

export default HomePage

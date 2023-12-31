import Feature_carousel from './Feature_carousel'
import React, { useState } from 'react'
import"./Carousel-imgs/img1.svg"
import Features_footer from './Features_footer'

const Features = () => {
    
  return (
    <div className='w-[100%] h-[200vh] bg-[#020B2D] pt-5' >
        <h1 className='text-center text-[white] text-[2.2rem] ' >What do we offer ?</h1>
        <img src="./Carousel-imgs/img1.svg" alt="" />
        <Feature_carousel />
        <Features_footer/>
    </div>
  )
}

export default Features

import React, { useState } from 'react';
import img1 from "./Carousel-imgs/img1.svg";


const Feature_Carousel = () => {
    const images=[img1,img1];
    console.log(images[0]);
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-[80%] mt-5 mx-auto rounded-lg overflow-hidden">
        {/* <img src="" alt="" /> */}
      <img 
        src={images[currentImage]}
        alt={`Slide ${currentImage + 1}`}
        className="w-full h-auto rounded-lg"
      />

      <button
        className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={prevImage}
      >
        Prev
      </button>

      <button
        className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={nextImage}
      >
        Next
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 bg-gray-500 rounded-full cursor-pointer ${
              index === currentImage ? 'bg-white' : ''
            }`}
            onClick={() => setCurrentImage(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Feature_Carousel;



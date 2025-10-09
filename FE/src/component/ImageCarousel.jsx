import React, { useState } from 'react';
import '../stylesheet/ImageCarousel.css';
import imagePlaceholder from '../placeholder/imagePlaceHolder.jpg'
import arrowIcon from '../placeholder/arrow-icon.svg'

const ImageCarousel = ({ images }) => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length); 
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-image-container">
        <img
          src={images.length > 0 ? images[currentIndex].image.imageUrl : imagePlaceholder}
          alt={`Imagen ${currentIndex + 1}`}
          className="carousel-image"
        />
      </div>
    {
      images.length > 1 && (
        <div className="carousel-buttons">
        <button onClick={prevImage} className="carousel-button prev-button">
          <img src={arrowIcon}/>
        </button>
        <button onClick={nextImage} className="carousel-button next-button">
          <img src={arrowIcon}/>
        </button>
      </div>
      )
    }
    </div>
  );
};

export default ImageCarousel;

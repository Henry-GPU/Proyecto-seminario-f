import React, { useState, useEffect } from "react";
import imageIcon from '../placeholder/imageIcon.svg';
import deleteIcon from '../placeholder/deleteIcon.svg';
import { useSelector, useDispatch } from 'react-redux';

function UploadImages({ onBack, onNext }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    // Cargar imágenes iniciales desde product
    if (product?.productImages?.length > 0) {
      const initialPreviews = product.productImages.map(
        (img) => img.image.imageUrl // Solo se usan las URLs de las imágenes
      );
      setImagePreviews(initialPreviews);

      // Aquí nos aseguramos de que las imágenes previas se mantengan y no se borren
      const initialImages = product.productImages.map((img) => img.image); // Usamos la imagen completa
      setImages(initialImages);
    }
  }, [product]);

  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    processImages(selectedImages);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImages(updatedImages);
    setImagePreviews(updatedPreviews);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedImages = Array.from(e.dataTransfer.files);
    processImages(droppedImages);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const processImages = (newImages) => {
    // Usamos el estado anterior para actualizar las imágenes
    setImages((prevImages) => {
      return [...prevImages, ...newImages];
    });

    const newPreviews = newImages.map((image) => {
      // Verifica si la imagen es un archivo (File), solo en ese caso crea un objeto URL
      return image instanceof File ? URL.createObjectURL(image) : image;
    });

    setImagePreviews((prevPreviews) => {
      return [...prevPreviews, ...newPreviews];
    });
  };

  const handleOnNext = () => {
    onNext(images);
  };

  return (
    <div className="form-card">
      <div className="product-form-content">
        <div className="images-form-content">
          <h2 className="form-title">Imágenes</h2>
          <div className="upload-images-item">
            <div
              className="flex flex-col flex-wrap items-center justify-center w-full gap-5 p-6 rounded-lg h-52 bg-[#d6f26659]"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <span className="w-full text-center text-[#151514]">Sube o arrastra las imágenes</span>
              <input
                className="hidden"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                id="images-input"
              />
              <label
                htmlFor="images-input"
                className="w-16 btn bg-[#d7f266]"
              >
                <svg 
                  className="fill-[#151514]"
                  xmlns="http://www.w3.org/2000/svg" height="35px" viewBox="0 -960 960 960" width="35px">
                  <path d="M480-480ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h320v80H200v560h560v-320h80v320q0 33-23.5 56.5T760-120H200Zm40-160h480L570-480 450-320l-90-120-120 160Zm440-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80Z"/>
                  </svg>
              </label>
            </div>
          </div>
          <div className="previews-container">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative preview-image-container">
                <img
                  src={deleteIcon}
                  className="absolute w-16 h-16 p-2 bg-black rounded-full opacity-0 cursor-pointer bg-opacity-60 hover:opacity-100"
                  onClick={() => handleDeleteImage(index)}
                  alt="Delete"
                />
                <img className="h-20" src={preview} alt={`Preview ${index}`} />
              </div>
            ))}
          </div>
          <div className="form-footer">
            <button className="btn back" onClick={() => onBack()}>Atrás</button>
            <button className="btn accept" onClick={() => handleOnNext()}>Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImages;

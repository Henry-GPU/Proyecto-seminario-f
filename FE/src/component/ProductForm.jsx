// components/ProductForm.js
import React from 'react';

const ProductForm = ({ product, handleInputChange }) => (
  <div className='form-container'>
    <label htmlFor="code">Código</label>
    <input
      type="text"
      name="code"
      value={product.code}
      onChange={handleInputChange}
      required
    />
    <label htmlFor="name">Nombre</label>
    <input
      type="text"
      name="name"
      value={product.name}
      onChange={handleInputChange}
      required
    />
    <label htmlFor="price">Precio</label>
    <input
      type="number"
      name="price"
      value={product.price}
      onChange={handleInputChange}
      required
    />
    <label htmlFor="recomendedPrice">Precio recomendado</label>
    <input
      type="number"
      name="recomendedPrice"
      value={product.recomendedPrice}
      onChange={handleInputChange}
      required
    />
  </div>
);

export default ProductForm;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../stylesheet/ProductDetail.css'
import ImageCarousel from './ImageCarousel';
import CardMessage from "./CardMessage";
import { Link } from 'react-router-dom';
import CardLoader from './CardLoader';
import { useAccToken } from './context/AccToken';
import { getProductById } from '../services/productServices';

function ProductDetail({}) {
  const { accessToken } = useAccToken();
  const [visibleItems, setVisibleItems] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serials, setSerials] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const token = accessToken;



  const capitalize = (text) => {
    if (!text) return '';
    const words = text.split(' ');
    if(words.length > 0){
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    }
    return words.join(' ');
  };

  const loadProductInfo = async()=>{
    try {
      const response = await getProductById(id);
      setProduct(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error al cargar la información del producto', error);
      setMessage("Error al cargar la información del producto.");
      setMessageType(3);
      setIsMessageVisible(true);
      
    }
  }
  useEffect(() => {

    loadProductInfo();
    

  }, [id]); 


  return (
    (isMessageVisible && messageType === 3) ? (
      <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={()=>setIsMessageVisible(false)}
          path={'/gestionar-productos'}
      />
    ) : isLoading ? <CardLoader
    isLoading={isLoading}
  /> :
    <div className='product-main-container'>
      <Link 
        className='back-btn'
        to='/inventario'
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          height="24px" viewBox="0 -960 960 960" 
          width="24px" fill="#000000">
            <path d="m313-440 224 224-57 
            56-320-320 320-320 57 56-224 
            224h487v80H313Z"
            />
        </svg>
      </Link>
    
    {product && (
      <div className="product-detail">
        <div className='product-carrousel-container'>
          <ImageCarousel
          images={product.productImages?.length > 0 ? product.productImages : []}/>
        </div>
        <div className='detail-card'>
          <div className='product-details'>
            
            <h2 className='product-title'>{product?.name}</h2>
            <p className='product-fact'><strong>Código:</strong> {product?.code}</p>
            <p className='product-fact'><strong>Marca:</strong> {product?.brand.name}</p>
            <p className='product-fact'><strong>Modelo:</strong> {product?.model.name}</p>
            <p className='product-fact'><strong>Categoría:</strong> {product?.category.name}</p>
            <p className='product-fact'><strong>Precio recomendado:</strong> Q{product?.recomendedPrice}</p>
            <p className='product-fact'><strong>Stock disponible:</strong> {product?.stock}</p>
            <p className='product-fact'><strong>Bodega:</strong> {product?.store?.name}</p>
          </div>
          <div className='product-details'>
            <h3 className='mt-1 font-bold'>Especificaciones:</h3>
            <ul className='product-details'>
              {Array.isArray(product?.productSpecifications) && product?.productSpecifications?.map(spec => (
                <li className='product-fact' key={spec.id}>
                  <strong>{capitalize(spec?.specification?.name)}:</strong> {spec?.value}
                </li>
              ))}
            </ul>
            <h3 className="m-1 font-bold">Números de serie disponibles:</h3>
          <ul className='product-serials'>
            {Array.isArray(product?.productSerials) && product?.productSerials
            .filter((serial) => serial.status === 1)
            .map((serial) => (
              <li className='product-fact' key={serial.id}>
                {serial?.serialNumber}
              </li>

              
            ))}
          </ul>      
          </div>
        </div> 
      </div>
      )
      }
    </div>
    
    
  );
};

export default ProductDetail;

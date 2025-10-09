import React, { act, useEffect, useState } from "react";
import "../stylesheet/ProductInventory.css";
import imagePlaceHolder from "../placeholder/imagePlaceHolder.jpg"
import { Link, useNavigate } from "react-router-dom";
import createProductIcon from '../placeholder/create-product.svg'
import CardLoader from "./CardLoader";
import CardMessage from "./CardMessage";
import { useAccToken } from "./context/AccToken";
import { delProduct, desProduct, getAllProducts, getProducts, actProduct } from "../services/productServices";

const ProductInventory = ({url, permissions}) => {
  const { accessToken } = useAccToken();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isProductOptionsVisible, setIsProductOptionsVisible] = useState(false);
  const [isHardDelete, setIsHardDelete] = useState(false);
  const token = accessToken;
  const navigate = useNavigate();

  const toggleMenu = (id) => {
    setIsProductOptionsVisible(isProductOptionsVisible === id ? null : id);
  }

  const loadProducts = async () => {
    try {
      if(Array.isArray(permissions) && (permissions.includes('SWITCH_PRODUCT_STATUS') || permissions.includes('SUPERADMIN'))){
        const response = await getAllProducts();
        setProducts(response.data);
      }
      else{
        const response = await getProducts();
        setProducts(response.data);
      }   
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMessage("Error en el servidor al cargar los productos.");
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error('Error inesperado:', error.message);
        setMessage("Error inesperado al cargar los productos.");
      }
      
      setMessageType(3);
      setIsMessageVisible(true);
    }
     finally {
      setIsLoading(false);
    }
  };

  const getImageUrl = (product) => {
    
    return product?.productImages?.[0]?.image?.imageUrl 
    || imagePlaceHolder;
  };

  const handleDesactivate = () =>{
    setMessage("¿Estás seguro que quieres desactivar este producto?");
    setMessageType(4);
    setIsMessageVisible(true);
    setIsHardDelete(false);
    setIsProductOptionsVisible(false);
  }

  const handleHardDelete = () =>{
    setMessage("¿Estás seguro que quieres eliminar este producto?");
    setMessageType(4);
    setIsMessageVisible(true);
    setIsHardDelete(true);
    setIsProductOptionsVisible(false);
  }

  const desactivateProduct = async() =>{
    setIsMessageVisible(false);
    setIsLoading(true);
    try {
      if(isHardDelete){
        const response = delProduct(selectedProduct);
        setMessage(response.data);
      }else{
        const response = await desProduct(selectedProduct);
        setMessage(response.data);       
      }
      setIsLoading(false);
      setMessageType(1);
      setIsMessageVisible(true);
      loadProducts();
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMessage(error.response.data);
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error('Error inesperado:', error.message);
        setMessage("Error inesperado al eliminar el producto.");
      }
      setIsLoading(false);
      setMessageType(3);
      setIsMessageVisible(true);
    }
  }

  const handleActivate = () => {
    setMessage("¿Estás seguro que quieres activar este producto?");
    setMessageType(5);
    setIsMessageVisible(true);
    setIsProductOptionsVisible(false);
  }
  
  const activateProduct = async() => {
    setIsMessageVisible(false);
    setIsLoading(true);
    try {
      const response = await actProduct(selectedProduct);
      setIsLoading(false);
      setMessage(response.data);
      setMessageType(1);
      setIsMessageVisible(true);
      loadProducts();
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMessage("Error en el servidor al activar el producto.");
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error('Error inesperado:', error.message);
        setMessage("Error inesperado al activar el producto.");
      }
      setIsLoading(false);
      setMessageType(3);
      setIsMessageVisible(true);
    }
  }
  
  useEffect(()=>{
    loadProducts();
  }, [])
  return (
    (isMessageVisible && messageType === 2) ? (
      <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={()=>setIsMessageVisible(false)}
          path={'/inventario'}
      />
    ) : (isMessageVisible && messageType === 1) ? (
      <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={()=>setIsMessageVisible(false)}
          path={'/inventario'}
      />
    )
    : (isMessageVisible && messageType === 3) ? (
      <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={()=>setIsMessageVisible(false)}
          path={'/inventario'}
      />
    )
    : (isMessageVisible && messageType === 4) ? (
      <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={desactivateProduct}
          onCancel={()=>setIsMessageVisible(false)}
      />
    )
    : (isMessageVisible && messageType === 5) ? (
      <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={activateProduct}
          onCancel={()=>setIsMessageVisible(false)}
      />
    )
    : isLoading ? <CardLoader
      isLoading={isLoading}
    />
    :
    <div className="product-grid">

      
      {products.map((product) => (
        <div className="product-card" key={product?.id}>
          {Array.isArray(permissions) && ((permissions.includes('ADD_STOCK') 
            ||  permissions.includes('SUPERADMIN')
            ||  permissions.includes('EDIT_PRODUCT')
            ||  permissions.includes('SWITCH_PRODUCT_STATUS')
            ||  permissions.includes('HARD_DELETE_PRODUCT')
            ||  permissions.includes('WITHDRAW_SERIAL')
        ))
            &&
            <div className={`product-option-button-container`}>
            <svg 
              className={`product-option-button`}
              onClick={()=>toggleMenu(product.id)}
              xmlns="http://www.w3.org/2000/svg" 
              height="24px" 
              viewBox="0 -960 960 960" 
              width="24px" 
              fill="#666666"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg>
          </div>}
          <div>
            <Link 
            key={product.id} 
            className="w-full h-full p-0 m-0"
            to={`${product.id}`}
          >
            <div className="product-image-container">
              <img
              className="product-image"
                src={getImageUrl(product)}
                alt={product.name} 
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              {/* <p className="product-price">Q{product.price.toLocaleString('en-US')}</p> */}
              <p className="product-stock">
                {product.stock > 0 ? `Stock: ${product.stock}` : "Sin stock"}
              </p>
              <p className={
                product.status === 1 
                ? 'text-green-500 font-bold' : 'text-red-500 font-bold'
              }>{product.status === 1 ? 'Activo' : 'Inactivo'}</p>
            </div> 
           </Link>
           {isProductOptionsVisible === product?.id && (
          <div
            className="cursor-auto product-options-menu"
          >
                {Array.isArray(permissions) && (permissions.includes('ADD_STOCK') || permissions.includes('SUPERADMIN')) && <div className="product-menu-option" onClick={()=>navigate(`${product.id}/addstock`)} >
                  Agregar stock
                </div> }
                {Array.isArray(permissions) && (permissions.includes('EDIT_PRODUCT') || permissions.includes('SUPERADMIN')) && <div className="product-menu-option" onClick={()=>navigate(`${product.id}/update`)} >
                  Editar
                </div> }
                {Array.isArray(permissions) && ((permissions.includes('SWITCH_PRODUCT_STATUS') || permissions.includes('SUPERADMIN')) && product.status === 1) && <div className="product-menu-option" onClick={() => {handleDesactivate(); setSelectedProduct(product.id)}} >
                  Desactivar
                </div> }
                {Array.isArray(permissions) && ((permissions.includes('SWITCH_PRODUCT_STATUS')  || permissions.includes('SUPERADMIN')) && product.status === 0) && <div className="product-menu-option" onClick={() => {handleActivate(); setSelectedProduct(product.id)}} >
                  Activar
                </div> }
                {Array.isArray(permissions) && (permissions.includes('HARD_DELETE_PRODUCT') || permissions.includes('SUPERADMIN')) && <div className="product-menu-option" onClick={() => {handleHardDelete(); setSelectedProduct(product.id)}}>
                  Eliminar definitivamete
                </div> }
                {Array.isArray(permissions) && (permissions.includes('WITHDRAW_SERIAL') || permissions.includes('SUPERADMIN')) && <div className="product-menu-option" onClick={()=>navigate(`${product.id}/retirar`)}>
                  Retirar serie
                </div> }

          </div>
            )}
          </div>

        </div>
        
      ))}
      { Array.isArray(permissions) && (permissions.includes('CREATE_PRODUCT') || permissions.includes('SUPERADMIN')) && <Link 
        className="add-product-card"
        to='crear'
      >
        <div className="product-image-container">
            <img
              className="product-image"
              src={createProductIcon}
              alt="Crear un nuevo producto"
            />
          </div>
        <div className='product-info'>
          <h3 className="product-name">CREAR UN PRODUCTO</h3>
          <p className="product-stock">Crea un producto que no esté en existencia.</p>
        </div>
      </Link>}
    </div>
  );
};

export default ProductInventory;

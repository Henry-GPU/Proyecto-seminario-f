import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';

function AddProductResumen(
    {
        onSendData,     
        onBack,
        images,
        isUpdate
    }){
    const [visibleItems, setVisibleItems] = useState(5);
    const dispatch = useDispatch();
    const product = useSelector((state)=> state.product);

    const capitalize = (text) => {
        if (!text) return '';
        const words = text.split(' ');
        if(words.length > 0){
          words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
        }
        return words.join(' ');
      };

    const handleShowMore = () => {
        setVisibleItems((prev) => prev + 15); 
      };

    const handleShowLess = () => {
        setVisibleItems((prev) => prev - (visibleItems-10)); 
    };

    return(

        <div className="form-card">
            <div className="product-general-data">
                <h2 className="form-title">Datos Generales:</h2>
                <div className="product-resumen-item">
                    <h3 className="item-name">Código:</h3>
                    <p
                    className="item-value">{product.code}</p>
                </div>
                <div className="product-resumen-item">
                    <h3 className="item-name">Nombre:</h3>
                    <p
                    className="item-value">{product.name}</p>
                </div>
                <div className="product-resumen-item">
                    <h3 className="item-name">Costo:</h3>
                    <p className="item-value">Q{product.price}</p>
                </div>
                <div className="product-resumen-item">
                    <h3 className="item-name">Precio recomendado:</h3>
                    <p className="item-value">Q{product.recomendedPrice}</p>
                </div>
                <div className="product-resumen-item">
                    <h3 className="item-name">Categoría:</h3>
                    <p className="item-value">{product.category.name}</p>
                </div>
                <div className="product-resumen-item">
                    <h3 className="item-name">Marca:</h3>
                    <p className="item-value">{product.brand.name}</p>
                </div>
                <div className="product-resumen-item">
                    <h3 className="item-name">Modelo:</h3>
                    <p className="item-value">{product.model.name}</p>
                </div>
                <div className="product-resumen-item">
                    <h3 className="item-name">Bodega:</h3>
                    <p className="item-value">{product.store.name}</p>
                </div>
            </div>
            <div className="product-general-data">
                <h2 className="form-title">Especificaciones:</h2>
                    {product.productSpecifications.map((item, index) => (
                    <div className="product-resumen-item" key={index}>
                        <h3 className="item-name">{capitalize(item.name)}:</h3>
                        <p className="item-value">{item.value}</p>
                    </div>
                ))}
            </div>
            <div className="product-general-data">
                <div>
                    <h2 className="form-title">Imágenes:</h2>
                    <div className="previews-container">
                    {
                        
                        images.map((preview, index) =>
                            
                            <div key={index} className="preview-image-container">
                                <img 
                                    className="h-20" 
                                    src={preview instanceof File ? URL.createObjectURL(preview) : preview?.imageUrl} 
                                    alt={`Preview ${index}`} 
                                />
                            </div>
                        )
                    }

                    </div>
                </div>
                 
            </div>
            
            {!isUpdate && <div className="product-general-data">
                <h2 className="form-title">{product.productSerials ? `Series:` : ''}</h2>
                    {product.productSerials.slice(0, visibleItems).map((item, index) => (
                        <div className="product-resumen-item" key={index}>
                            <h3 className="item-name">{item.serialNumber}</h3>
                            <p className="item-value">{item.purchaseDate}</p>
                        </div>
                    ))}
                {visibleItems < product.productSerials.length && (
                    <button className="show-more-button" onClick={handleShowMore}>
                    Ver más
                    </button>
                )}
            </div>}
            <div className="form-footer">

                    <Link
                        className="btn cancel"
                        to="/inventario"
                    >   Cancelar</Link>
                    <Link 
                        className='btn back' 
                        onClick={onBack}   
                        >Atrás</Link>
                        
                    <button className='btn accept' onClick={onSendData}>{isUpdate ? `Actualizar`: 'Crear'}</button>
                </div>
        </div>
    )
}

export default AddProductResumen;
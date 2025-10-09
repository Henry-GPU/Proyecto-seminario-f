import { useState, useEffect } from 'react';
import CardLoader from './CardLoader';
import { Link } from 'react-router-dom';
import CardMessage from './CardMessage';
import { useSelector, useDispatch } from 'react-redux';
import { setProduct } from '../store/productSlice';
import AddModal from './AddModal';
import { getSpecs } from '../services/specificationServices';

function SpecsForm({ onBack, url, onNext, specValues, setSpecValues }) {
    const dispatch = useDispatch();
    const product = useSelector((state)=> state.product);
    const [specs, setSpecs] = useState([]); // Maneja las especificaciones disponibles
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(null);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const token = localStorage.getItem('authToken');
    const [isAddModalVisible, setIsAddModalVisble] = useState(false);

    const handleInputChange = (event, specId) => {
        const { value } = event.target;
        setSpecValues((prevValues) => ({
            ...prevValues,
            [specId]: value,
        }));
    };

    const loadSpecs = async () => {
        try {
            const response = await getSpecs(product.category.id);

            let specsData = [];
            if(response){
                specsData = response;
            } 
            const initialSpecValues = {};
            specsData.forEach((spec, index) => {
                initialSpecValues[spec.id] = product?.productSpecifications[index]?.value || "";
            });
            setSpecs(specsData);
            setSpecValues(initialSpecValues); // Establece los valores iniciales
            setIsLoading(false);
        } catch (error) {
            console.error(
                "Error al cargar las especificaciones del producto de tipo :" + product.productType.name,
                error
            );
            setMessage('Ocurrió un error al cargar las especificaciones.');
            setMessageType(3);
            setIsMessageVisible(true);
        }
    };
    


    useEffect(() => {
        loadSpecs();
    }, []);

    const handleOnNext = () => {

        const missingValues = specs.some((spec) => {
            const value = specValues[spec.id];
            return !value || value.trim() === "";
        });

        if (missingValues) {
            setMessage('Asegurate de llenar todos los campos.');
            setMessageType(2);
            setIsMessageVisible(true);
            return;
        } 
        const result = specs.map((spec) => ({
            id: spec.id,
            name: spec.name,
            value: specValues[spec.id] || "",
        }));
        
        dispatch(setProduct({
            productSpecifications: result,
        }));
        onNext();
    };

    return (
        <>
            {isMessageVisible && (
                <CardMessage 
                     message={message} 
                    messageType={messageType}
                    onAccept={()=>setIsMessageVisible(false)}
            />
            )}
            {(isMessageVisible && messageType === 3) && (
                <CardMessage 
                    message={message} 
                    messageType={messageType}
                    onAccept={()=>setIsMessageVisible(false)}
                    path={'/gestionar-productos'}
                />
            )}
            {
                isLoading && (<CardLoader
                isLoading={isLoading}
                />)
            }
                <div className="form-card">
                {!isLoading  && 
                    <div className='product-form-content'>
                    <div className='gap-12 product-specifications'>
                        <h2 className='form-title'>Especificaciones</h2>
                        {specs.length > 0 ? (
                            specs.map((item, index) => (
                                <div className="specs-form-item" key={item.id}>
                                    <label 
                                        className="item-name">{item.name}</label>
                                    <input
                                        type="text"
                                        className="item-value form-input"
                                        placeholder="Valor"
                                        value={specValues[item.id] || ""}
                                        onChange={(e) => handleInputChange(e, item.id)}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No hay especificaciones existentes.</p>
                        )}
                        <div className="form-footer">
                            <button className="btn add" onClick={()=>setIsAddModalVisble(true)}>
                                Agregar
                            </button>
                            <Link className='btn cancel' 
                                to="/inventario">
                                Cancelar
                            </Link>
                            <button className="btn back" onClick={onBack}>
                                Atrás
                            </button>
                            <button className="btn accept" onClick={handleOnNext}>
                                Siguiente
                            </button>
                        </div>
                    
                    </div>
                
                </div>  
                }      
            </div>
        {isAddModalVisible && (
          <AddModal 
            param={'spec'}
            loadSpecs={()=>loadSpecs()}
            onClose={()=>{setIsAddModalVisble(false);}}
          >
          </AddModal>)}
        </>
            
    );
}

export default SpecsForm;


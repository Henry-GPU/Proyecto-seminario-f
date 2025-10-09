import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardMessage from './CardMessage';
import CardLoader from './CardLoader';
import { createAddress, createCustomer } from '../services/customerService';
import { createStore } from '../services/productServices';
import { createBrand } from '../services/brandServices';
import { createCategory } from '../services/categoryServices';
import { createModel } from '../services/modelServices';
import { createSpec } from '../services/specificationServices';
function AddModal({
    param, 
    onClose,
    brand,
    loadCategories, 
    loadBrands, 
    loadModels,
    loadCustomerAdresses,
    loadCustomers,
    loadSpecs,
    loadStores
}){
    const dispatch = useDispatch();
    const product = useSelector((state)=> state.product);
    const customer = useSelector((state)=> state.customer);
    const sale = useSelector(state => state.sale);
    const [name, setName] = useState("");
    const [nombres, setNombres] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [direccion, setDireccion] = useState("");
    const [zona, setZona] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [telefono, setTelefono] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(null);
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [email, setEmail] = useState("");
    const [nit, setNit] = useState("");
    const [contactName, setContactName] = useState("");
    const [phone, setPhone] = useState("");
    const token = localStorage.getItem('authToken');
    const [isLoading, setIsLoading] = useState(false);


    const showMessage = (msg, type) => {
        setMessage(msg);
        setMessageType(type);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!nombres.trim()){
            alert("El nombre no puede estar vacio.");
            return;
        }
        setIsLoading(true);

        try {
            let response;
            const data ={
            name: inputValue,
            brand: product?.brand.id ? product.brand.id : brand,
            }

            switch (param) {
                case 'model':
                    response = await createModel(data);
                    showMessage('Modelo creado satisfactoriamente.', 1);
                    loadModels();
                    break;
                case 'category':
                    response = await createCategory({name: inputValue});
                    showMessage('Categoría creada satisfactoriamente.', 1);
                    loadCategories();
                    break;
                case 'brand':
                    response = await createBrand({name: inputValue, category: product.category.id});
                    showMessage('Marca creada satisfactoriamente.', 1);
                    loadBrands();
                    break;
                case 'spec':
                    response = await createSpec({name: inputValue, category: product.category.id});
                    showMessage('Especificación creada satisfactoriamente.', 1);
                    loadSpecs();
                    break;
                case 'address':
                    const adressData = {
                        addressLine: inputValue,
                        customer: sale.customer.id,
                        city: city,
                        state: state
                    }
                    response = await createAddress(adressData);
                    showMessage('Dirección creada satisfactoriamente.', 1);
                    loadCustomerAdresses();
                    break;
                case 'customer':
                    const customerData = {
                        nombres: nombres,
                        apellidos: apellidos,
                        nit: nit,
                        telefono: telefono,
                        email: email,
                        direccion: direccion,
                        zona: zona,
                        ciudad: ciudad,
                        departamento: departamento
                    }
                    response = await createCustomer(customerData);
                    showMessage('Cliente satisfactoriamente.', 1);
                    loadCustomers();
                    break;
                case 'store':
                    response = await createStore({name: inputValue, status: 1});
                    showMessage('Bodega creada satisfactoriamente.', 1);
                    loadStores(); 
                    break; 
                default:
                    break;
            }          
        } catch (error) {
            showMessage(error.message || 'Ocurrio un error al crear el registro.', 3)
        } finally{
            setIsLoading(false);
        }
           
    }
    useEffect(() => {
        switch (param) {
            case 'model':
                setName('modelo');
                break;
            case 'category':
                setName('categoría');
                break;
            case 'store':
                setName('Bodega');
                break;
            case 'brand':
                setName('marca');
                break;
            case 'address':
                setName('Dirección');
                break;
            case 'customer':
                setName('cliente');
                break;
            case 'spec':
                setName('Especificación');
                break;
            default:
                setName("");
                break;
        }
    }, [param]);
    return(

        message !== "" ? (
            <CardMessage 
                message={message} 
                messageType={messageType}
                onAccept={()=> onClose()}
            />
        ): isLoading
        ?  
            <CardLoader
              isLoading={isLoading}
            />
        :
       
    <div className="modal-container">
        <form className='card' onSubmit={handleSubmit}>
            <h2 className='form-title'>Agregar {name}</h2>
                    <>
                        <label 
                            className='form-input-label'
                            htmlFor='nombres'>Nombres</label>
                        <input 
                            className='form-input'
                            type='text' 
                            name='nombres' 
                            id='nombres' 
                            value={nombres}
                            onChange={(e) => setNombres(e.target.value)}
                            />
                        </>
                        <>
                        <label 
                            className='form-input-label'
                            htmlFor='apellidos'>Apellidos</label>
                        <input 
                            className='form-input'
                            type='text' 
                            name='apellidos' 
                            id='apellidos' 
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            />
                        </>
                        <>
                            <label 
                                className='form-input-label'
                                htmlFor='nit'>NIT</label>
                            <input 
                                className='form-input'
                                type='text' 
                                name='nit' 
                                id='nit'  
                            value={nit}
                            onChange={(e) => setNit(e.target.value)}
                            />
                        
                        </>
                        <>
                            <label 
                                className='form-input-label'
                                htmlFor='telefono'>Telefono</label>
                            <input 
                                className='form-input'
                                type='phone' 
                                name='telefono' 
                                id='telefono'  
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                                />
                        
                        </>
                        <>
                            <label 
                                className='form-input-label'
                                htmlFor='email'>Email</label>
                            <input 
                                className='form-input'
                                type='email' 
                                name='email' 
                                id='email'  
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                        
                        </>
                        <>
                            <label 
                                className='form-input-label'
                                htmlFor='direccion'>Dirección</label>
                            <input 
                                className='form-input'
                                type='text' 
                                name='direccion' 
                                id='direccion'  
                                value={direccion}
                                onChange={(e) => setDireccion(e.target.value)}
                                />
                        
                        </>
                        <>
                            <label 
                                className='form-input-label'
                                htmlFor='zona'>Zona</label>
                            <input 
                                className='form-input'
                                type='text' 
                                name='zona' 
                                id='zona'  
                                value={zona}
                                onChange={(e) => setZona(e.target.value)}
                                />
                        
                        </>
                        <>
                            <label 
                                className='form-input-label'
                                htmlFor='ciudad'>Ciudad</label>
                            <input 
                                className='form-input'
                                type='text' 
                                name='ciudad' 
                                id='ciudad'  
                                value={ciudad}
                                onChange={(e) => setCiudad(e.target.value)}
                                />
                        
                        </>
                        <>
                            <label 
                                className='form-input-label'
                                htmlFor='departamento'>Departamento</label>
                            <input 
                                className='form-input'
                                type='text' 
                                name='departamento' 
                                id='departamento'  
                                value={departamento}
                                onChange={(e) => setDepartamento(e.target.value)}
                                />
                        
                        </>
                
                <div className="form-footer">
                    <button 
                        className='btn cancel' 
                        onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        }}>Cancelar</button>
                    <button className='btn accept' type='submit'>Aceptar</button>
                </div>
                
            </form>

    </div>
    );
}
export default AddModal;
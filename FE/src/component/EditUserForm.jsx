import { useState } from "react";
import { setUser, resetUser } from "../store/UserSlice";
import { setCustomer, resetCustomer} from "../store/CustomerSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import CardMessage from "./CardMessage";
import { getCustomerById, updCustomer } from "../services/customerService";
import { getUserById, updUser } from "../services/userService";

function EditUserForm({onCancel, selectedItem, onClose, isCustomer}){
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const customer = useSelector((state) => state.customer);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(null);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('authToken');
    
    useEffect(() => {
      dispatch(resetUser());
    }, [dispatch]);

  const updateUser = async() =>{
    let data = {}
    if(isCustomer){
        console.log(customer);
       data = {
          id: customer.id_cliente,
          nombres: customer.nombres,
          apellidos: customer.apellidos,
          email: customer.email,
          nit: customer.nit,
          telefono: customer.telefono,
          direccion: customer.direccion,
          zona: customer.zona,
          ciudad: customer.ciudad,
          departamento: customer.departamento,
      }  
    }else{
      data ={
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      } 
    }

    
    try {
      setIsLoading(true);
      let response='';
      if(isCustomer){
        console.log(data);
        response = await updCustomer(selectedItem, data);
      }else{
        response = await updUser(selectedItem, data);
      }

      setIsLoading(false);
      setMessage(response.data);
      setMessageType(1);
      setIsMessageVisible(true);
    } catch (error) {
      if(error.response){
        setIsLoading(false);
        setMessage(error.response.data);
        setMessageType(3);
        setIsMessageVisible(true);
      }
    }
  }
  const loadUserInfo = async() =>{
    try {
      console.log(isCustomer);
      let response = '';
      if(isCustomer){
        response = await getCustomerById(selectedItem);
      }else{
        response = await getUserById(selectedItem);
      }
        const data = response.data;
        if(isCustomer){
          dispatch(setCustomer({
            id_cliente: selectedItem,
            nombres: data.nombres,
            apellidos: data.apellidos,
            email: data.email,
            nit: data.nit,
            telefono: data.telefono,
            direccion: data.direccion,
            zona: data.zona,
            ciudad: data.ciudad,
            departamento: data.departamento,
          }));
          
        }else{
          dispatch(setUser({
            id: data.id,
            username: data.username,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
          }));
          
        }
        
      setIsLoading(false);
    } catch (error) {
      if(error.response){
        setMessage(error.response.data);
        setMessageType(3);
        setIsMessageVisible(true);
      }
    }
  };
  
  useEffect(()=>{
    loadUserInfo();
  },[])

  const handleSelectChange = (e) =>{
    const value = e.target.value;
    dispatch(setUser({role: value}));
  }
    const handleInputChange = (e) =>{
      const {name, value} = e.target;
      if(isCustomer){
        dispatch(setCustomer({[name]: value}));
      }else{
        dispatch(setUser({[name]: value}));
      }

    }

  const handleAccept = () => {
    
    if (!user.fullName && !isCustomer) {
      setMessage('El campo nombre debe contener algún valor.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    if (!customer.nombres && isCustomer) {
      setMessage('El campo nombre debe contener algún valor.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    
    if (!customer.apellidos && isCustomer) {
      setMessage('El campo apellidos debe contener algún valor.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    if (!user.username && !isCustomer) {
      setMessage('El campo nombre de usuario debe contener algún valor.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    
    if (!customer.nit && isCustomer) {
      setMessage('El campo nit debe contener algún valor.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }

    if (!user.phone && !isCustomer) {
      setMessage('Agrega un numero de telefono antes de continuar.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    if (!customer.telefono && isCustomer) {
      setMessage('Agrega un numero de telefono antes de continuar.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
  
    if (!user.email && !isCustomer) {
      setMessage('Agrega un email antes de continuar.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    if (!customer.email && isCustomer) {
      setMessage('Agrega un email antes de continuar.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    updateUser();
  };
  
  return(
    <div className="absolute z-40 flex items-center justify-center w-full h-svh">
        <div className="modal-form-bg"></div>
        {isMessageVisible && (
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={()=>setIsMessageVisible(false)}
        />
      )}
       {(isMessageVisible && messageType === 1) && (
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={()=>{setIsMessageVisible(false); onClose();}}
        />
      )}
        <div className="text-sm modal-card">
          
          <h1 className="form-title">Editar {isCustomer ? 'cliente':'usuario'}</h1>
            <div className="flex flex-wrap gap-1">
            <label className="form-input-label" htmlFor="username">{isCustomer ? 'Nombre':'Nombre de usuario'}</label>
            <input 
            className='form-input' 
            type="text" 
            name={isCustomer ? 'name':'username'}
            id={isCustomer ? 'name':'username'}
            value={isCustomer ? customer.nombres : user.username ? user.username : ''}
            onChange={handleInputChange}/>
          </div>
          {isCustomer && <div className="flex flex-wrap gap-1">
            <label className="form-input-label" htmlFor="nit">Apellidos</label>
            <input 
            className='form-input' 
            type="text" 
            name="nit"
            id="nit"
            value={customer.apellidos}
            onChange={handleInputChange}/>
          </div>}
          
          <div className="flex flex-wrap gap-1">
            <label htmlFor="name" className="form-input-label">{isCustomer ? 'NIT' : 'Nombre completo'}</label>
            <input 
            className='form-input' 
            type="text" 
            name={isCustomer ? 'contactName':'name'} 
            id={isCustomer ? 'contactName':'name'}
            value={isCustomer ? customer.nit : user.fullName ? user.fullName : ''}
            onChange={handleInputChange}/>
          </div>
          <div className="flex flex-wrap gap-1">
            <label htmlFor="telefono" className="form-input-label">Teléfono</label>
            <input 
            className='form-input' 
            type="text" 
            name="telefono" 
            id="telefono"
            onChange={handleInputChange}
            value={isCustomer ? customer.telefono : user.email ? user.email : ''} />
          </div>
          <div className="flex flex-wrap gap-1">
            <label htmlFor="email" className="form-input-label">Email</label>
            <input 
            className='form-input' 
            type="text" 
            name="email" 
            id="email"
            onChange={handleInputChange}
            value={isCustomer ? customer.email : user.email ? user.email : ''} />
          </div>
          <div className="flex flex-wrap gap-1">
            <label htmlFor="direccion" className="form-input-label">Dirección</label>
            <input 
            className='form-input' 
            type="text" 
            name="direccion" 
            id="direccion"
            onChange={handleInputChange}
            value={isCustomer ? customer.direccion : user.phone ? user.phone : ''}/>
          </div>
          <div className="flex flex-wrap gap-1">
            <label htmlFor="zona" className="form-input-label">Zona</label>
            <input 
            className='form-input' 
            type="text" 
            name="zona" 
            id="phozonane"
            onChange={handleInputChange}
            value={isCustomer ? customer.zona : user.phone ? user.phone : ''}/>
          </div>
          <div className="flex flex-wrap gap-1">
            <label htmlFor="ciudad" className="form-input-label">Ciudad</label>
            <input 
            className='form-input' 
            type="text" 
            name="ciudad" 
            id="ciudad"
            onChange={handleInputChange}
            value={isCustomer ? customer.ciudad : user.phone ? user.phone : ''}/>
          </div>
          <div className="flex flex-wrap gap-1">
            <label htmlFor="departamento" className="form-input-label">Departamento</label>
            <input 
            className='form-input' 
            type="text" 
            name="departamento" 
            id="departamento"
            onChange={handleInputChange}
            value={isCustomer ? customer.departamento : user.phone ? user.phone : ''}/>
          </div>
          <div className="form-footer">
            <button className="btn cancel" onClick={onCancel}>Cancelar</button>
            <button className="btn accept" onClick={handleAccept}>Aceptar</button>
          </div>
        </div>
    </div>
  )
}

export default EditUserForm;
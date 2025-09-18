import React, { useCallback, useEffect } from "react";
import ListComponent from "./ListComponent";
import url from "../config/url";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { resetUser, setUser } from "../store/UserSlice";
import CardMessage from "./CardMessage";
import CardLoader from "./CardLoader";
import { createUser, getRoles } from "../services/userService";

function CreateUser({}){
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem('authToken');
  const [roles, setRoles] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleAccept = () => {
    if (!user.name) {
      setMessage('El campo nombre debe contener algún valor.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
  
    if (!user.lastName) {
      setMessage('El campo apellidos debe contener algún valor.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }

    if (!user.username) {
      setMessage('El campo nombre de usuario debe contener algún valor.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }

    if (!user.phone) {
      setMessage('Agrega un numero de telefono antes de continuar.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
  
    if (!user.email) {
      setMessage('Agrega un email antes de continuar.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
  
    if (!user.password) {
      setMessage('Crea una contraseña antes de continuar.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    handleSendData();
  };

    useEffect(() => {
      dispatch(resetUser());
    }, [dispatch]);
  
  const loadRoles = useCallback(async() =>{
    try {
      const response = await getRoles();
      
      if(response.data.length > 0){
        setRoles(response.data);
        dispatch(setUser({role: 2}));
      }
      setIsLoading(false);
    } catch (error) {
    
    }
  },[dispatch, url]);

  const handleSelectChange = (e) =>{
    const value = e.target.value;
    const selectedItem = parseInt(value); 
    dispatch(setUser({role: selectedItem}));
  }

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    dispatch(setUser({[name]: value}));
  }

  const handleSendData = async() =>{
    const data = {
      fullName: user.name + ' ' + user.lastName,
      username: user.username,
      phone: user.phone,
      email: user.email,
      password: user.password,
      role: user.role,  
    }
    try {
      const response = await createUser(data);
      setIsLoading(false);
      setMessage(response.data);
      setMessageType(1);
      setIsMessageVisible(true);
      dispatch(resetUser());
      
    } catch (error) {
      if(error.response){
        setMessage(error.response.data.error);
        setMessageType(3);
        setIsMessageVisible(true);
      }
    }
  }


  useEffect(()=>{
    loadRoles();
  },[loadRoles]);
return(
  <div className="form-main-container">
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
            onAccept={()=>setIsMessageVisible(false)}
            path={'/home/usuarios'}
        />
      )}
      {(isMessageVisible && messageType === 3) && (
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={()=>setIsMessageVisible(false)}
            path={'/home/usuarios'}
        />
      )}
      {
        isLoading && (<CardLoader
          isLoading={isLoading}
        />)
      }
      
        { !isLoading && 
    <div className="form-card" autoComplete="off">
      <h1 className="form-card-title">Crear usuario</h1>
      <div className="flex justify-between">
        <input 
          className="form-input-md"
          type="text"
          name="name"
          placeholder="Nombre"
          autoComplete="off"
          value={user.name}
          onChange={handleInputChange}/>
        <input 
          className="form-input-md"
          type="text" 
          name="lastName"
          placeholder="Apellidos"
          autoComplete="off"
          value={user.lastName}
          onChange={handleInputChange}/>     
      </div>
      <div className="flex justify-between">
        <input 
          className="form-input-md"
          type="text" 
          name="username"
          placeholder="Nombre de usuario"
          autoComplete="off"
          value={user.username}
          onChange={handleInputChange}/>
        <input 
          className="form-input-md"
          type="tel" 
          name="phone"
          placeholder="Teléfono"
          autoComplete="off"
          value={user.phone}
          onChange={handleInputChange}/>   
      </div>
      <div className="flex justify-between">
        <input 
          className="form-input-md"
          type="email" 
          name="email"
          placeholder="Email"
          autoComplete="off"
          value={user.email}
          onChange={handleInputChange}/>
        <input 
          className="form-input-md"
          type="password"
          name="password"
          placeholder="Contraseña"
          autoComplete="new-password"
          value={user.password}
          onChange={handleInputChange}/>      
      </div>
      <div className="flex flex-wrap gap-2">
      <label htmlFor="name" className="form-input-label">Rol</label>
            <select name="role" id="role" className="form-input" onChange={handleSelectChange} value={user?.role || ""}>
              <option value="2" key='2'>Administrador</option>
              <option value="3" key='3'>Vendedor</option>
              <option value="5" key='5'>Técnico</option>
              <option value="4" key='4'>Recepcionista</option>
            </select>  
      </div>
      <div className="form-footer">
        <button className="btn accept" onClick={() => handleAccept()}>Aceptar</button>
      </div>
    </div>
  }
  </div>)
}

export default CreateUser;
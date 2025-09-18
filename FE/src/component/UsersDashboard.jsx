import { useEffect, useState } from 'react';
import '../stylesheet/UsersDashboard.css';
import CardMessage from "./CardMessage";
import CardLoader from "./CardLoader";
import url from '../config/url';
import EditUserForm from './EditUserForm';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAccToken } from './context/AccToken';
import { actUser, delUser, desUser, getUsers } from '../services/userService';

function UsersDashboard({localUser}){
  const { accessToken } = useAccToken();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const token = accessToken;
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState("");
  const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditUserFormVisible, setIsEditUserFormVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  

  const toggleMenu = (id) => {
    setIsMoreMenuVisible(isMoreMenuVisible === id ? null : id);
  }

  const desactivateUser = async() =>{
    setIsMessageVisible(false);
    setIsLoading(true);
    try {
      const response = await desUser(selectedItem);
        setMessage(response.data);
        setIsLoading(false);
        setMessageType(1);
        setIsMessageVisible(true);
        loadUsers();
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMessage(error.response.data);
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error('Error inesperado:', error.message);
        setMessage("Error inesperado al desactivar el usuario.");
      }
      setIsLoading(false);
      setMessageType(3);
      setIsMessageVisible(true);
    }
  };
  
  const activateUser = async () => {
    setIsMessageVisible(false);
    setIsLoading(true);
    try {
        const response = await actUser(selectedItem);
        setMessage(response.data);
        setMessageType(1); // Éxito
        loadUsers(); // Asegúrate de que esta función no tenga errores
    } catch (error) {
        // Si el error tiene respuesta (error del servidor)
        if (error.response) {
            console.error('Error del servidor:', error.response.data);
            setMessage(error.response.data);
        } 
        // Si no hay respuesta, error de red
        else if (error.request) {
            console.error('Error de red:', error.request);
            setMessage("Error de red. Por favor verifica tu conexión.");
        } 
        // Otros tipos de error (sólo logueo del error)
        else {
            console.error('Error inesperado:', error.message);
            setMessage("Error inesperado al activar el usuario.");
        }
        
        setIsLoading(false);
        setMessageType(3); // Error
    } finally {
        setIsMessageVisible(true); // Muestra el mensaje siempre al final, éxito o error
        setIsLoading(false); // Asegúrate de que el loading se desactive
    }
};


  const deleteUser = async() =>{
    setIsMessageVisible(false);
    setIsLoading(true);
    try {
        const response = await delUser(selectedItem);
        setMessage(response.data);
        setIsLoading(false);
        setMessageType(1);
        setIsMessageVisible(true);
        loadUsers();
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMessage(error.response.data);
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error('Error inesperado:', error.message);
        setMessage("Error inesperado al eliminar el usuario.");
      }
      setIsLoading(false);
      setMessageType(3);
      setIsMessageVisible(true);
    }
  };

  const handleDesactivate = () =>{
    setMessage( "¿Estás seguro que quieres desactivar este usuario?");
    setMessageType(4);
    setIsDelete(false);
    setIsMessageVisible(true);
    setIsMoreMenuVisible(false);
  }

  const handleDelete = () =>{
    setMessage("¿Estás seguro que quieres eliminar este usuario?");
    setMessageType(4);
    setIsMessageVisible(true);
    setIsMoreMenuVisible(false);
    setIsDelete(true);
  }

  const handleActivate = () =>{
    setMessage("¿Estás seguro que quieres activar este usuario?");
    setMessageType(5);
    setIsMessageVisible(true);
    setIsMoreMenuVisible(false);
    setIsDelete(true);
  }
  
  const handlePermissions = (id) =>{
    navigate(`/home/usuarios/${id}/permisos`);
  }
  
  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUsers();
      setTimeout(() => {
        if(response.data.length > 0){
          setUsers(response.data);
        }
        setIsLoading(false);
      },300);
      
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMessage(error.response.data);
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error('Error inesperado:', error.message);
        setMessage("Error inesperado al cargar los usuarios.");
      }
      setTimeout(()=>{
        setIsLoading(false);
        setMessageType(3);
        setIsMessageVisible(true);
      },500);
      
    }
  }
  
  useEffect(()=>{
    loadUsers();
  },[isEditUserFormVisible]);

  return(
 
    <div className="dashboard-main-container">
      <div className="w-10 pt-2 pl-2 h-7 md:hidden">
        <Link 
        to="/home"
        className="w-5">
          <svg className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </Link>    
      </div>
      {(isMessageVisible && messageType === 1) &&
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={()=>setIsMessageVisible(false)}

        />  
      }
      {(isMessageVisible && messageType === 2) &&
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={()=>setIsMessageVisible(false)}
            path={'/home'}
        />  
      }
      {(isMessageVisible && messageType === 3) &&
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={()=>setIsMessageVisible(false)}

        />  
      }
      {(isMessageVisible && messageType === 4 && isDelete) &&
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={deleteUser}
            onCancel={()=>setIsMessageVisible(false)}
        />  
      }
      {(isMessageVisible && messageType === 4 && !isDelete) &&
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={desactivateUser}
            onCancel={()=>setIsMessageVisible(false)}
        />  
      }
      {(isMessageVisible && messageType === 5) &&
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={activateUser}
            onCancel={()=>setIsMessageVisible(false)}
        />  
      }
      {
        isLoading && 
        <CardLoader
          isLoading={isLoading}
        />
      }
      { isEditUserFormVisible &&
        <EditUserForm 
        selectedItem={selectedItem} 
        onCancel={()=>setIsEditUserFormVisible(false)}
        onClose={()=>{setIsEditUserFormVisible(false); loadUsers();}}/>
      }
      
      <div className='users-dashboard'>
        <div className='dashboard-table'>
          <div className='flex justify-between dashboard-table-title'>
            <h1>Usuarios</h1> 
            <Link 
            to='crear'
            className='text-xs btn add'
            >Nuevo usuario
            </Link>
          </div>
          <div className='text-[1px] dashboard-table-specs'>
            <p className='flex-[2]'>Nombre de usuario</p>
            <p className='flex-[4] hidden lg:block'>Email</p>
            <p className='flex-[2] hidden md:block'>Telefono</p>
            <p className='flex-[2] '>Rol</p>
            <p className='flex-[1] text-center'>Estado</p>
            <div className='flex-[2] lg:flex-1'></div>

          </div>
          {users.length > 0 ?
          users
          .filter((user) => user.username !== localUser)
          .map((user) =>(
            <div className='dashboard-table-item' key={user?.id}>
              <p className='flex-[2]'>{user.username}</p>
              <p className='flex-[4] hidden lg:block'>{user.email}</p>
              <p className='flex-[2] hidden md:block'>{user.phone}</p>
              <p className='flex-[2]'>{user.role}</p>
                  {user.active?
                    <div title="Desactivar" className='flex-[1] flex justify-center cursor-pointer'>
                    <svg 
                      onClick={()=>{handleDesactivate(); setSelectedItem(user.id);}}
                      className='fill-green-600'
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35zM480-480z"/></svg>              
                    </div>
                  :
                    <div title="Activar" className='flex-[1] flex justify-center cursor-pointer'>
                    <svg 
                      onClick={()=>{handleActivate(); setSelectedItem(user.id);}}
                      className='fill-red-600'
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35zm200-120z"/></svg>              
                    </div>
                  }
                  <div className='flex flex-[2] lg:flex-1'>
                    <div title="Editar" className='flex-[1] flex justify-end'>
                      <svg 
                      onClick={()=>{setIsEditUserFormVisible(true); setSelectedItem(user.id)}}
                      className='dashboard-table-item-more'
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M200-200h57l391-391-57-57-391 391v57zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120zm640-584l-56-56 56 56zm-141 85l-28-29 57 57-29-28z"/></svg>              
                    </div>
                    <div title="Permisos" className='flex-[1] flex justify-end'>
                      <svg 
                      onClick={()=>{handlePermissions(user.id)}}
                      className='dashboard-table-item-more'
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240zm0-80h480v-400H240v400zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280zM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80zM240-160v-400 400z"/></svg>              
                    </div>
                    <div title="Eliminar" className='flex-[1] flex justify-end'>
                      <svg 
                      onClick={()=>{handleDelete(); setSelectedItem(user.id);}}
                      className='dashboard-table-item-more'
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280zm400-600H280v520h400v-520zM360-280h80v-360h-80v360zm160 0h80v-360h-80v360zM280-720v520-520z"/></svg>              
                    </div>
                  </div>
            </div>
          )):
          <div className='dashboard-table-item'>
            <p className='flex-1 text-center'>No hay usuarios registrados.</p>
          </div>
        }
        {
          (users.length === 1 && users[0].username === localUser) &&
          <div className='dashboard-table-item'>
            <p className='flex-1 text-center'>No hay usuarios registrados.</p>
          </div>
        }
        </div>   
        
      </div>
      
    </div>
  )
}

export default UsersDashboard;
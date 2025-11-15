import { useEffect, useState } from 'react';
import '../stylesheet/UsersDashboard.css';
import CardMessage from "./CardMessage";
import CardLoader from "./CardLoader";
import { Link } from 'react-router-dom';
import AddModal from './AddModal';
import EditUserForm from './EditUserForm';
import { useAccToken } from './context/AccToken';
import { getCustomers } from '../services/saleService';
import { actCustomer, delCustomer, desCustomer } from '../services/customerService';

function CustomersDashboard(){
  const { accessToken } = useAccToken();
  const [customers, setCustomers] = useState([]);
  const token = accessToken;
  const [selectedItem, setSelectedItem] = useState(null);
  const [message, setMessage] = useState("");
  const [isMoreMenuVisible, setIsMoreMenuVisible] = useState(false);
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditCustomerFormVisible, setIsEditCustomerFormVisible] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isAddModalVisible, setIsAddModalVisble] = useState(false);
  
  const toggleMenu = (id) => {
    setIsMoreMenuVisible(isMoreMenuVisible === id ? null : id);
  }

  const desactivateCustomer = async() =>{
    setIsMessageVisible(false);
    setIsLoading(true);
    try {
        const response = await desCustomer(selectedItem);
        setMessage(response.data);
        setIsLoading(false);
        setMessageType(1);
        setIsMessageVisible(true);
        loadCustomers();
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMessage(error.response.data);
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error('Error inesperado:', error.message);
        setMessage("Error inesperado al desactivar el cliente.");
      }
      setIsLoading(false);
      setMessageType(3);
      setIsMessageVisible(true);
    }
  };
  
  const activateCustomer = async () => {
    setIsMessageVisible(false);
    setIsLoading(true);
    try {
        const response = await actCustomer(selectedItem);
        setMessage(response.data);
        setMessageType(1); // Éxito
        loadCustomers(); // Asegúrate de que esta función no tenga errores
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
            setMessage("Error inesperado al activar el cliente.");
        }
        
        setIsLoading(false);
        setMessageType(3); // Error
    } finally {
        setIsMessageVisible(true); // Muestra el mensaje siempre al final, éxito o error
        setIsLoading(false); // Asegúrate de que el loading se desactive
    }
};


  const deleteCustomer = async() =>{
    setIsMessageVisible(false);
    setIsLoading(true);
    try {
        const response = await delCustomer(selectedItem);
        setMessage(response.data);
        setIsLoading(false);
        setMessageType(1);
        setIsMessageVisible(true);
        loadCustomers();
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMessage(error.response.data);
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error('Error inesperado:', error.message);
        setMessage("Error inesperado al eliminar el cliente.");
      }
      setIsLoading(false);
      setMessageType(3);
      setIsMessageVisible(true);
    }
  };

  const handleDesactivate = () =>{
    setMessage( "¿Estás seguro que quieres desactivar este cliente?");
    setMessageType(4);
    setIsMessageVisible(true);
    setIsMoreMenuVisible(false);
  }

  const handleDelete = () =>{
    setMessage("¿Estás seguro que quieres eliminar este cliente?");
    setMessageType(4);
    setIsMessageVisible(true);
    setIsMoreMenuVisible(false);
    setIsDelete(true);
  }

  const handleActivate = () =>{
    setMessage("¿Estás seguro que quieres activar este cliente?");
    setMessageType(5);
    setIsMessageVisible(true);
    setIsMoreMenuVisible(false);
    setIsDelete(true);
  }
  
  
  const loadCustomers= async () => {
    setIsLoading(true);
    try {
      const response = await getCustomers();
      setTimeout(() => {
        if(response.data.length > 0){
          setCustomers(response.data);
        }
        setIsLoading(false);
      },300);
      console.log(response.data);
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
    loadCustomers();
  },[]);

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
            onAccept={deleteCustomer}
            onCancel={()=>setIsMessageVisible(false)}
        />  
      }
      {(isMessageVisible && messageType === 4 && !isDelete) &&
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={desactivateCustomer}
            onCancel={()=>setIsMessageVisible(false)}
        />  
      }
      {(isMessageVisible && messageType === 5) &&
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={activateCustomer}
            onCancel={()=>setIsMessageVisible(false)}
        />  
      }
      {
        isLoading && 
        <CardLoader
          isLoading={isLoading}
        />
      }
      { isEditCustomerFormVisible &&
        <EditUserForm 
        selectedItem={selectedItem} 
        onCancel={()=>setIsEditCustomerFormVisible(false)}
        onClose={()=>{setIsEditCustomerFormVisible(false); loadCustomers();}}
        isCustomer={true}/>
      }

      {
        isAddModalVisible &&
        <AddModal 
        param='customer'
        loadCustomers={() => {
          loadCustomers();
        }}
        onClose={() => setIsAddModalVisble(false)}
        />
       
      }
      
      <div className='users-dashboard'>
        <div className='dashboard-table'>
          <div className='flex justify-between dashboard-table-title'>
            <h1>Clientes</h1> 
            <button 
            onClick={()=>{setIsAddModalVisble(true)}}
            className='btn add'
            >Nuevo cliente
            </button>
          </div>
          <div className='text-[1px] dashboard-table-specs'>
            <p className='flex-[1]'>ID</p>
            <p className='flex-[2]'>Nombre</p>
            <p className='flex-[4] hidden lg:block'>Email</p>
            <p className='flex-[2] hidden md:block'>Telefono</p>
            <p className='flex-[2] '>Nit</p>
            <p className='flex-[1] text-center'>Estado</p>
            <div className='flex-[2] lg:flex-1'></div>
          </div>
          {customers.length > 0 ?
          customers.map((customer) =>(
            <div className='dashboard-table-item' key={customer?.id}>
              <p className='flex-[1]'>{customer.id}</p>
              <p className='flex-[2]'>{customer.nombres} {customer.apellidos}</p>
              <p className='flex-[4] hidden lg:block'>{customer.email}</p>
              <p className='flex-[2] hidden md:block'>{customer.telefono}</p>
              <p className='flex-[2]'>
                {customer.nit}</p>
                {customer.status === 1 ?
                    <div title="Desactivar" className='flex-[1] flex justify-center cursor-pointer'>
                    <svg 
                      onClick={()=>{handleDesactivate(); setSelectedItem(customer.id);}}
                      className='fill-green-600'
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35zM480-480z"/></svg>              
                    </div>
                  :
                    <div title="Activar" className='flex-[1] flex justify-center cursor-pointer'>
                    <svg 
                      onClick={()=>{handleActivate(); setSelectedItem(customer.id);}}
                      className='fill-red-600'
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47zm0-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35zm200-120z"/></svg>              
                    </div>
                  }
                <div className='flex flex-[2] lg:flex-1'>
                    <div title="Editar" className='flex-[1] flex justify-end'>
                      <svg 
                      onClick={()=>{setIsEditCustomerFormVisible(true); setSelectedItem(customer.id_cliente)}}
                      className='dashboard-table-item-more'
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M200-200h57l391-391-57-57-391 391v57zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120zm640-584l-56-56 56 56zm-141 85l-28-29 57 57-29-28z"/></svg>              
                    </div>
                    {/* <div title="Eliminar" className='flex-[1] flex justify-end'>
                      <svg 
                      onClick={()=>{handleDelete(); setSelectedItem(customer.id);}}
                      className='dashboard-table-item-more'
                      xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=""><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280zm400-600H280v520h400v-520zM360-280h80v-360h-80v360zm160 0h80v-360h-80v360zM280-720v520-520z"/></svg>              
                    </div> */}
                  </div>
            </div>
          )):
          <div className='dashboard-table-item'>
            <p className='flex-1 text-center'>No hay clientes registrados.</p>
          </div>
        }
        </div>   
        
      </div>
      
    </div>
  )
}

export default CustomersDashboard;
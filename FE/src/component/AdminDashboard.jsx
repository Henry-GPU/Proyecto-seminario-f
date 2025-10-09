import { useEffect, useState } from 'react';
import '../stylesheet/AdminDashboard.css';
import { Link } from 'react-router-dom';
import DateDisplay from '../hook/DateDisplay';
import CardLoader from './CardLoader';
import CardMessage from './CardMessage';
import { useAccToken } from './context/AccToken';
import { getInventoryFile, getLowStockProducts } from '../services/productServices';
import { getLastSales } from '../services/saleService';

function AdminDashboard({permissions}){
  const { accessToken } = useAccToken();
  const token = accessToken;
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{

  },[])

  return(
    <div className="dashboard-main-container">
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
      {
        isLoading && 
        <CardLoader
          isLoading={isLoading}
        />
      }
      <div className='dashboard-actions-container'>
        {Array.isArray(permissions) && ((permissions.includes('MANAGE_USERS') || permissions.includes('SUPERADMIN'))) && <Link
            to='usuarios'>
          <div className='dashboard-item-button users'>
            <svg 
            className="dashboard-item-svg"
            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z"/></svg>
            <p
            className='dashboard-item-title'>Usuarios</p>
          </div>
        </Link>}
        {Array.isArray(permissions) && (permissions.includes('MANAGE_CUSTOMERS') || permissions.includes('SUPERADMIN')) &&<Link
          to="clientes">
          <div className='dashboard-item-button customers'>
            <svg
            className="dashboard-item-svg"
            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
            <p
            className='dashboard-item-title'>Clientes</p>
          </div>
        </Link>}
        {/* <Link>
          <div className='dashboard-item-button defective-products'>
            <svg
            className="dashboard-item-svg"
            xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M200-80q-33 0-56.5-23.5T120-160v-160q0-33 23.5-56.5T200-400h560q33 0 56.5 23.5T840-320v160q0 33-23.5 56.5T760-80H200Zm0-80h560v-160H200v160Zm61-300L60-574l240-40-65-235 199 141 120-212 40 240 235-65-141 199 152 86H678l-106-60 62-88-104 29-18-106-52 93-88-62 29 104-106 18 120 72H261Zm226 0Zm-7 220Z"/></svg>
            <p
            className='dashboard-item-title'>Productos defectuosos</p>
          </div>
        </Link> */}
      </div>
      <div className="dashboard-tables-container">
      </div> 
    </div>
  )
}

export default AdminDashboard;
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function CardMessage({message, messageType, path, onAccept, wCancel, onCancel}) {
  const [messageTitle, setMessageTitle] = useState("");

  useEffect(() => {
    switch (messageType) {
      case 1:
        setMessageTitle('¡Éxito!');
        break;
      case 2:
        setMessageTitle('¡Atención!');
        break;
      case 3:
        setMessageTitle('¡Algo salió mal!');
        break;
      case 4:
        setMessageTitle('¡Eliminar!');
        break;
      case 5:
        setMessageTitle('¡Activar!');
        break;
      case 6:
        setMessageTitle('¡Atención!');
        break;
      default:
        break;
    }
  },[messageType])

  return(
    <div className='p-4 modal-container'>
      <div className="card">
        <div className='flex gap-3'>
          <div className='flex items-center justify-center'>
            {
              messageType === 1 
              ? <svg className={`block sm:mx-0 sm:shrink-0 p-2 rounded-full size-14 bg-green-600`}
                  xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>
              : messageType === 2
              ? <svg className={`block sm:mx-0 sm:shrink-0 p-2 rounded-full size-14 bg-yellow-500`}
                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z"/></svg>
              : messageType === 3
              ? <svg className={`block sm:mx-0 sm:shrink-0 p-2 rounded-full size-14 bg-red-600`}
                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q88 0 166.5 36T782-742L480-440v-360q-134 0-227 93t-93 227q0 134 93 227t227 93q69 0 132-28.5T720-270v110q-53 38-114 59T480-80Zm320-160v-320h80v320h-80Zm40 160q-17 0-28.5-11.5T800-120q0-17 11.5-28.5T840-160q17 0 28.5 11.5T880-120q0 17-11.5 28.5T840-80Z"/></svg>
              : messageType === 4 
              ? <svg  className={`block sm:mx-0 sm:shrink-0 p-2 rounded-full size-14 bg-red-600`}
                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
              : messageType === 5
              ? <svg className={`block sm:mx-0 sm:shrink-0 p-2 rounded-full size-14 bg-green-600`}
              xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-240q-100 0-170-70T40-480q0-100 70-170t170-70h400q100 0 170 70t70 170q0 100-70 170t-170 70H280Zm0-80h400q66 0 113-47t47-113q0-66-47-113t-113-47H280q-66 0-113 47t-47 113q0 66 47 113t113 47Zm400-40q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM480-480Z"/></svg>
              : messageType === 6
              ? <svg className={`block sm:mx-0 sm:shrink-0 p-2 rounded-full size-14 bg-orange-400`}
              xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M200-80q-33 0-56.5-23.5T120-160v-160q0-33 23.5-56.5T200-400h560q33 0 56.5 23.5T840-320v160q0 33-23.5 56.5T760-80H200Zm0-80h560v-160H200v160Zm61-300L60-574l240-40-65-235 199 141 120-212 40 240 235-65-141 199 152 86H678l-106-60 62-88-104 29-18-106-52 93-88-62 29 104-106 18 120 72H261Zm226 0Zm-7 220Z"/></svg>
              : ''
            }
          </div>    
          <div className='flex-1 mb-4 sm:w-auto'>
            <h2
              className='text-xl font-bold text-neutral-700'
            >{messageTitle}</h2>
            <p 
              className='w-auto text-xs font-semibold text-neutral-600 sm:text-sm'
            >{message}</p>
            { (messageType === 4 || messageType === 6) && 
              <p 
              className='w-auto text-xs font-semibold text-red-500 sm:text-sm'
            >Todos los datos asociados serán eliminados.</p>
            }
          </div>  
        </div>        
        <div className="flex justify-end w-full gap-2 pt-2">
          {(messageType === 4 || messageType === 5 || messageType === 6) &&
            <button 
              className='btn cancel'
              onClick={onCancel}>
              Cancelar
            </button>
          }
          <Link 
            className='btn accept'
            to={path ? path : ''}
            onClick={onAccept}
          >Aceptar</Link>
        </div>
      </div>
  </div>
  )

}

export default CardMessage;
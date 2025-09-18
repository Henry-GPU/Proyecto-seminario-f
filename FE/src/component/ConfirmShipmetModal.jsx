import { useState } from "react";
import CardMessage from "./CardMessage";
import { confirmDeliveryBySaleId } from "../services/shipmentService";



function ConfirmShipmentModal({onClose, saleId, onCancel, isDelivery}){
  const [shipment, setShipment] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [installationDate, setInstallationDate] = useState('');
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem('authToken');

  const handleInputChange = (e) =>{
    const {name, value} = e.target;
    if(name === 'shipment'){
      setShipment(value);
    }
    if(name === 'deliveryDate'){
      setDeliveryDate(value);
    }
    if(name === 'installationDate'){
      setInstallationDate(value);
    }
  }

  const confirmDelivery = async() =>{
    const data = {
      saleId: saleId,
      shipmentNumber: shipment,
      deliveryDate: deliveryDate,
      installationDate: (installationDate !== '' && installationDate !== null) ? installationDate : null,
    }
    setIsLoading(true);
    try {
      const response = await confirmDeliveryBySaleId(data);
      setTimeout(()=>{
        setIsLoading(false);
        setMessage(response.data);
        setMessageType(1);
        setIsMessageVisible(true);
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
        setMessage("Error inesperado al confirmar la entrega.");
      }
      setTimeout(()=>{
        setIsLoading(false);
        setMessageType(3);
        setIsMessageVisible(true);
      },300);
    }
  }
  
  const handleAccept = () => {
    
    if (!shipment && isDelivery) {
      setMessage('El campo envio debe contener algún valor.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    if (!deliveryDate && isDelivery) {
      setMessage('Debes asignar una fecha de entrega.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    if (!installationDate && !isDelivery) {
      setMessage('Debes asignar una fecha de instalacion.');
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
    confirmDelivery();
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
         <h1 className="form-title">Confirmar entrega</h1>
         {isDelivery &&
          <div className="flex flex-wrap gap-2">
            <label className="form-input-label" htmlFor="shipment">Numero de envio</label>
              <input 
              className='form-input' 
              type="number" 
              name='shipment'
              id='shipment'
              value={shipment}
              onChange={handleInputChange}/>
          </div>}
         {isDelivery && <div className="flex flex-wrap gap-2">
            <label className="form-input-label" htmlFor="deliveryDate">Fecha y hora de entrega</label>
            <input 
            className='form-input' 
            type="datetime-local" 
            name='deliveryDate'
            id='deliveryDate'
            value={deliveryDate}
            onChange={handleInputChange}/>
         </div>}
         {!isDelivery &&
         <div className="flex flex-wrap gap-2">
            <label className="form-input-label" htmlFor="installationDate">Fecha y hora de instalación</label>
            <input 
            className='form-input' 
            type="datetime-local" 
            name='installationDate'
            id='installationDate'
            value={installationDate}
            onChange={handleInputChange}/>
         </div>}
         <div className="form-footer">
            <button className="btn cancel" onClick={onCancel}>Cancelar</button>
            <button className="btn accept" onClick={handleAccept}>Aceptar</button>
          </div>
      </div>
    </div>
  )
}

export default ConfirmShipmentModal;


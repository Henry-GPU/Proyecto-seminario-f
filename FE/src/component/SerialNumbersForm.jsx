import { useEffect, useState } from 'react';
import deleteIcon from '../placeholder/deleteIcon.svg'
import infoIcon from '../placeholder/infoIcon.svg';
import moreIcon from '../placeholder/moreIcon.svg'
import { Link } from 'react-router-dom';
import CardMessage from './CardMessage';
import { useSelector, useDispatch } from 'react-redux';
import { setProduct } from '../store/productSlice';

function SerialNumbersForm({ onBack, onNext, specs}) {
  const dispatch = useDispatch();
  const product = useSelector((state)=> state.product);
  const [serialNumbers, setSerialNumbers] = useState([{ serial: '', purchaseDate: '' }]);
  const [isBattery, setIsBattery] = useState(false);
  const [range, setRange] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  
  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedSerialNumbers = [...serialNumbers];
    updatedSerialNumbers[index][field] = value;
    setSerialNumbers(updatedSerialNumbers);
  };

  const handleType = () =>{

    if(product.productType.id == 2){
      setIsBattery(true);
    }
}

  const handleSeriesRangeInputChange = (e) => {
    setRange(e.target.value);
  }

  const handleAddSerialField = () => {
    setSerialNumbers([...serialNumbers, { serial: '', purchaseDate: '' }]);
  };

  const handleRemoveSerialField = (index) => {
    if (serialNumbers.length > 1) {
      const updatedSerialNumbers = serialNumbers.filter((_, i) => i !== index);
      setSerialNumbers(updatedSerialNumbers);
    } else {
      setMessage('Debe haber al menos un número de serie en el formulario.');
      setMessageType(2);
      setIsMessageVisible(true);
    }
  };
  const extractNumbersFromText= (text) => {
    const numbers = text.replace(/\D/g, ''); 
    return parseInt(numbers, 10);
  }

  const handleOnNext = () => {



    if(isBattery){
      const capacity = extractNumbersFromText(product.productSpecifications[1].value);
      const voltage = extractNumbersFromText(product.productSpecifications[0].value);
      const date = new Date();
      const initials =
      product.brand.name.trim().length < 4
        ? product.brand.name.trim().toUpperCase()
        : product.brand.name
            .trim()
            .split(" ")
            .map((word) => word[0]?.toUpperCase() || "")
            .join("");

      const dateFormated = 
      String(date.getDate()).padStart(2,"0") +
      String(date.getMonth()+ 1).padStart(2, "0") +
      String(date.getFullYear()).slice(2);

      const numRange = parseInt(range, 10); 

      if (isNaN(numRange) || numRange <= 0) {
        setMessage('Por favor ingresa un rango válido.');
        setMessageType(2);
        setIsMessageVisible(true);
        return;
      }

      const generatedSerialNumbers = [...serialNumbers];
      for (let i = 0; i < numRange; i++) {
        if (!generatedSerialNumbers[i]) {
          generatedSerialNumbers[i] = {};
        }
        
        generatedSerialNumbers[i]['serial'] =`${initials}${dateFormated}${voltage}${capacity}${i + 1}`;
        generatedSerialNumbers[i]['purchaseDate'] = date.toISOString().split("T")[0];
        
      }
      setSerialNumbers(generatedSerialNumbers);
      
      dispatch(setProduct({
        productSerials: generatedSerialNumbers,
      }));
      onNext();
    }else{
      if(serialNumbers[0].serial !== '' && serialNumbers[0].purchaseDate !== ''){
        dispatch(setProduct({
          productSerials: serialNumbers,
        }));
        onNext();
        }else{
          setMessage('Debes rellenar al menos una serie para continuar.');
          setMessageType(2);
          setIsMessageVisible(true);
        }
    }
  };

  useEffect(() => {
    handleType();
  },[])

  return (

      <>
        {isMessageVisible && (
          <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={()=>setIsMessageVisible(false)}
          />
        )}
        
          <div className='form-card'>   
          {
         (!isBattery) ?
            <div className='serial-numbers-content'>
              <h2 className='form-title'>Series</h2>
              {serialNumbers.map((item, index) => (
                <div className="form-item" key={index}>
                  <label 
                    className="form-input-label">Número de Serie</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Número de Serie"
                    value={item.serial}
                    onChange={(e) => handleInputChange(e, index, 'serial')}
                  />
                  <label 
                    className="form-input-label">Fecha de Compra</label>
                  <input
                    type="date"
                    className="form-input"
                    value={item.purchaseDate}
                    onChange={(e) => handleInputChange(e, index, 'purchaseDate')}
                  />
                  {
                    (index > 0) && (
                      <div className='form-footer'>
                        <button
                          className="btn cancel"
                          onClick={() => handleRemoveSerialField(index)}
                          disabled={serialNumbers.length === 1} 
                        >
                          <img src={deleteIcon} alt="Eliminar" />
                        </button>
                      </div>
                    
                    )
                  }
                  
                </div>
              ))}

              
            </div>
          :
          <div>
            <h2>Series</h2>
            <div className="serial-number-form-item">
                  <label htmlFor="serial-range"className="spec-name">Rango</label>
                  <input
                    type="text"
                    step="1"
                    id='serial-range'
                    className="spec-value"
                    placeholder="Ingresa el numero de baterias."
                    value={range === null ? '' : range}
                    onChange={(e) => handleSeriesRangeInputChange(e)}
                  />
                <div 
                className='form-info'
                >
                  <img src={infoIcon}/>
                  <p>
                  Las series de baterias serán generadas automáticamente.
                  </p>
                  
                </div>
            </div>
            
          </div>
          
          }
          <div className="form-footer">
            {
              !isBattery &&
              <button className="btn add" onClick={handleAddSerialField}>
                  <img src={moreIcon}/>
              </button>
            }    
                <Link
                  className='btn cancel'
                  to='/gestionar-productos'>
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
          
      </>
  );
}

export default SerialNumbersForm;

import { useState, useCallback, useEffect } from "react";
import '../stylesheet/AddStockForm.css';
import CardMessage from "./CardMessage";
import { useSelector, useDispatch } from 'react-redux';
import { setProduct } from '../store/productSlice';
import { Link } from "react-router-dom";
import { validateSerialForm } from "./utils/validateSerials";
import { generateSerials } from "./utils/generateSerials";

function SerialForm({ onBack, onNext }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [isSingle, setIsSingle] = useState(false);
  const [isNormal, setIsNormal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [prefix, setPrefix] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(1);
  const [size, setSize] = useState(1);
  const [purchaseDate, setPurchaseDate] = useState('');

  const handleSendData = () => {
    const error = validateSerialForm({ purchaseDate, prefix, start, end, isSingle });
    if (error) {
      setMessage(error);
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
  
    const serials = generateSerials({ prefix, start, end, size, purchaseDate, isSingle, isNormal });
    
    if (!serials.length) {
      setMessage("Error al generar los números de serie.");
      setMessageType(2);
      setIsMessageVisible(true);
      return;
    }
  
    dispatch(setProduct({ productSerials: serials }));
    onNext();
  };
  
  const fillWithZero = (num, totalSize) => {
    const numberStr = num.toString();
    const remaining = totalSize - prefix.length;
    const paddedNumber = numberStr.padStart(remaining, '0');
    return prefix + paddedNumber;
  };

  const handleSize = (e) => {
    const val = Number(e);
    const minRequired = prefix.length + Math.max(start, end).toString().length;
    if (val >= minRequired) setSize(val);
  };
  
  const handlePrefix = (e) => {
    const value = e.target.value.replace(/\s/g, "");
    setPrefix(value);
    const minSize = value.length + Math.max(start, end).toString().length;
    if (size < minSize) setSize(minSize);
  };
  
  const handleStart = (e) => {
    const val = Number(e.target.value);
    if (val < 0) return;
    setStart(val);
    const minSize = prefix.length + Math.max(val, end).toString().length;
    if (size < minSize) setSize(minSize);
  };
  
  const handleEnd = (e) => {
    const val = Number(e.target.value);
    if (val < 0) return;
    setEnd(val);
    const minSize = prefix.length + Math.max(start, val).toString().length;
    if (size < minSize) setSize(minSize);
  };

  const toggleOption = (option) => {
    if (option === 1) setIsSingle(false);
    if (option === 2) setIsSingle(true);
    if (option === 3) setIsNormal(false);
    if (option === 4) setIsNormal(true);
  };


  return (
    <div className="form-main-container">
      {isMessageVisible && (
        <CardMessage
          message={message}
          messageType={messageType}
          onAccept={() => setIsMessageVisible(false)}
        />
      )}

      <div className="form-card">
        <div className="flex justify-center w-full gap-2 p-1 serial-options-container">
          <div onClick={() => toggleOption(1)} className={`serial-option${!isSingle ? '-selected' : ''}`}>Rango</div>
          <div onClick={() => toggleOption(2)} className={`serial-option${isSingle ? '-selected' : ''}`}>Individual</div>
        </div>

        <div className="flex justify-center w-full gap-2 p-1 serial-options-container">
          <div onClick={() => toggleOption(3)} className={`range-option${!isNormal ? '-selected' : ''}`}>Tamaño fijo</div>
          <div onClick={() => toggleOption(4)} className={`range-option${isNormal ? '-selected' : ''}`}>Normal</div>
        </div>

        <div className="flex flex-wrap">
          <div className="flex w-full gap-2">
            <div className="form-item flex-[3]">
              <label className="form-input-label">{(isSingle && isNormal) ? `Número de serie` : `Prefijo`}</label>
              <input className="flex-1 p-2 bg-gray-100" type="text" placeholder="Ej: 1992B" onChange={handlePrefix} />
            </div>
            {!isNormal &&
              <div className="flex-1 form-item">
                <label htmlFor="size" className="form-input-label">Tam.</label>
                <div id="size" className="flex flex-1 gap-1">
                  <input className="flex-1 p-2 bg-gray-100" readOnly type="number" value={size} min="1" max="30" />
                  <div className="flex flex-col gap-1">
                    <button className="flex-1 w-5 bg-gray-300 rounded-none" onClick={()=>handleSize(size+1)}>+</button>
                    <button className="flex-1 w-5 bg-gray-300 rounded-none" onClick={() =>handleSize(size-1)}>-</button>
                  </div> 
                </div>          
              </div>
            }
          </div>

          <div className="flex justify-center w-full gap-2">
            {!isSingle && <div className="form-item-sm">
              <label htmlFor="start" className="form-input-label">Inicio</label>
              <input id="start" className="form-input" type="number" value={start} onChange={handleStart} min="0" />
            </div>}
            {(!(isSingle && isNormal)) &&
              <div className="form-item-sm">
                <label htmlFor="end" className="form-input-label">Final</label>
                <input id="end" className="form-input" type="number" value={end} onChange={handleEnd} min="0" />
              </div>
            }
          </div>

          {/* Nuevo campo de entrada para la fecha de compra */}
          <div className="w-full form-item">
            <label htmlFor="purchaseDate" className="form-input-label">Fecha de compra</label>
            <input id="purchaseDate" className="form-input" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
          </div>

        </div>

        <p className="w-full pt-4 text-center text-neutral-500">
          {isSingle
            ? (!isNormal ? fillWithZero(end, size) : `${prefix}`)
            : (!isNormal ? `Inicio: ${fillWithZero(start, size)}, Final: ${fillWithZero(end, size)}`
                        : `Inicio: ${prefix}${start}, Final: ${prefix}${end}`)}
        </p>

        <div className="form-footer">
          <Link className='btn cancel' to='/inventario'>Cancelar</Link>
          <button className="btn back" onClick={onBack}>Atrás</button>
          <button className="btn accept" onClick={handleSendData}>Siguiente</button>
        </div>

      </div>
    </div>
  );
}

export default SerialForm;

import url from "../config/url";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CardMessage from "./CardMessage";
import "../stylesheet/AddStockForm.css";
import { validateSerialForm } from "./utils/validateSerials";
import { generateSerials } from "./utils/generateSerials";
import { getProductById, updateProductStock } from "../services/productServices";

function AddStockForm() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState('');
  const [isSingle, setIsSingle] = useState(false);
  const [isNormal, setIsNormal] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [prefix, setPrefix] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(1);
  const [size, setSize] = useState(1);
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const loadProductInfo = async () => {
      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (error) {
        console.error('Error al cargar la información del producto', error);
      }
    };
    loadProductInfo();
  }, [id]);

  const fillWithZero = (num, totalSize) => {
    const numberStr = num.toString();
    const remaining = totalSize - prefix.length;
    const paddedNumber = numberStr.padStart(remaining, '0');
    return prefix + paddedNumber;
  };
  
  const handleSendData = async () => {
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

    const data = {
      productId: id,
      purchaseDate: serials[0].purchaseDate,
      serials: serials.map(s => s.serialNumber),
    };

    try {
      const response = await updateProductStock(data);
      setMessage(response.data);
      setMessageType(1);
      setIsMessageVisible(true);
    } catch (error) {
      const errMsg = error.response?.data || 'Error al actualizar el stock.';
      setMessage(errMsg);
      setMessageType(3);
      setIsMessageVisible(true);
    }
  };

  const toggleOption = (option) => {
    if (option === 1) setIsSingle(false);
    if (option === 2) setIsSingle(true);
    if (option === 3) setIsNormal(false);
    if (option === 4) setIsNormal(true);
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
  
  

  return (
    <div className="form-main-container">
      {isMessageVisible && (
        <CardMessage
          message={message}
          messageType={messageType}
          onAccept={() => setIsMessageVisible(false)}
          path={messageType !== 2 ? '/inventario' : undefined}
        />
      )}

      <div className="form-card">
        <h1 className="form-card-title">Agregar stock</h1>

        <div className="flex justify-between w-full py-2">
          <img className="object-contain w-32 h-32" src={product?.productImages[0]?.image?.imageUrl} />
          <div className="flex flex-wrap text-sm">
            <p className="w-full">Nombre: {product?.name}</p>
            <p className="w-full">Marca: {product?.brand?.name}</p>
            <p className="w-full">Modelo: {product?.model?.name}</p>
            <p className="w-full">Stock actual: {product?.stock}</p>
          </div>
        </div>

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
              <input className="flex-1 p-2 bg-gray-100" type="text" onChange={handlePrefix} placeholder="Ej: 1992B" />
            </div>
            {!isNormal && (
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
            )}
          </div>

          <div className="flex justify-center w-full gap-2">
            {!isSingle && (
              <div className="form-item-sm">
                <label className="form-input-label">Inicio</label>
                <input className="form-input" value={start} onChange={handleStart} type="number" min="0" />
              </div>
            )}
            {(!(isSingle && isNormal)) && (
              <div className="form-item-sm">
                <label className="form-input-label">Final</label>
                <input className="form-input" value={end} onChange={handleEnd} type="number" min="0" />
              </div>
            )}
          </div>

          <div className="w-full form-item">
            <label className="form-input-label">Fecha de compra</label>
            <input className="form-input" type="date" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} />
          </div>
        </div>

        <p className="w-full pt-4 text-center text-neutral-500">
          {isSingle
            ? (!isNormal ? fillWithZero(end, size) : `${prefix}`)
            : (!isNormal ? `Inicio: ${fillWithZero(start, size)}, Final: ${fillWithZero(end, size)}`
                        : `Inicio: ${prefix}${start}, Final: ${prefix}${end}`)}
        </p>


        <div className="flex justify-end gap-2 mt-8">
          <Link className="btn cancel" to="/inventario">Cancelar</Link>
          <button className="btn accept" onClick={handleSendData}>Actualizar</button>
        </div>
      </div>
    </div>
  );
}

export default AddStockForm;

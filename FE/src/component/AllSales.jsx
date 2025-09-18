import { useState, useEffect } from "react";
import "../stylesheet/Sales.css";
import CardLoader from "./CardLoader";
import CardMessage from "./CardMessage";
import { Link } from "react-router-dom";
import DateDisplay from "../hook/DateDisplay";
import { useAccToken } from "./context/AccToken";
import { cancelSaleById, getSales } from "../services/saleService";

function AllSales({permissions}){
  const { accessToken } = useAccToken();
  const token = accessToken;
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isProductOptionsVisible, setIsProductOptionsVisible] = useState(false);

  const toggleMenu = (id) => {
    setIsProductOptionsVisible(isProductOptionsVisible === id ? null : id);
  }

  const handleCancel = () => {
    setMessage("¿Estás seguro que quieres cancelar la venta?");
    setMessageType(4);
    setIsMessageVisible(true);
    setIsProductOptionsVisible(false);
  }

  const cancelSale = async()=>{
    setIsMessageVisible(false);
    setIsLoading(true);
    try {
      const response = await cancelSaleById(selectedProduct);
      setMessage(response.data);
      setIsLoading(false);
      setMessageType(1);
      setIsMessageVisible(true);
      loadSales();
    } catch (error) {
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMessage("Error en el servidor al eliminar el producto.");
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error('Error inesperado:', error.message);
        setMessage("Error inesperado al eliminar el producto.");
      }
      setIsLoading(false);
      setMessageType(3);
      setIsMessageVisible(true);
    }
  }

  const loadSales = async() => {
    try {
      const response = await getSales();
      setSales(response.data);

    } catch (error) {
        setIsLoading(false);
      if (error.response) {
        console.error('Error del servidor:', error.response.data);
        setMessage("Error en el servidor al cargar los productos.");
      } else if (error.request) {
        console.error('Error de red:', error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error('Error inesperado:', error.message);
        setMessage("Error inesperado al cargar los productos.");
      }
      
      setMessageType(3);
      setIsMessageVisible(true);
    }
    finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    loadSales();
  }, []);

  return(
    (isMessageVisible && messageType === 2) ? (
      <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={()=>setIsMessageVisible(false)}
          path={'/ventas'}
      />
    ) : (isMessageVisible && messageType === 1) ? (
      <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={()=>setIsMessageVisible(false)}
          path={'/ventas'}
      />
    )
    : (isMessageVisible && messageType === 3) ? (
      <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={()=>setIsMessageVisible(false)}
          path={'/ventas'}
      />
    )
    : (isMessageVisible && messageType === 4) ? (
      <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={cancelSale}
          onCancel={()=>setIsMessageVisible(false)}
      />
    )
    : isLoading ? <CardLoader
      isLoading={isLoading}
    />
    :
    <div className="flex flex-wrap justify-center w-full gap-2 pt-2 pb-24 md:pb-0">

      {sales.map((sale)=>(
        <div className="sale-card pt-2" key={sale.id}>
          <Link 
          to={`${sale.id}`}
          className="flex flex-wrap justify-center overflow-hidden w-full pb-4 px-5 bg-white gap-y-1 hover:scale-[101%] pt-2">
              <div className="flex items-center justify-around w-full gap-2">
                <svg 
                className=" fill-purple-300"
                height="20px" viewBox="0 -960 960 960" 
                width="20px" 
                fill="#ffffff"
                >
                  <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 
                  23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 
                  56.5 23.5T840-720v560q0 33-23.5 
                  56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 
                  0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 
                  0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 
                  0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 
                  17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 
                  11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 
                  28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 
                  11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 
                  28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 
                  11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 
                  28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 
                  11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"
                  />
                </svg>
                <div className="flex-[1]"><DateDisplay dateString={sale.date} />
                </div>
              </div>
              <div className="flex items-center justify-around w-full gap-2">
                <svg 
                  className="fill-blue-300"
                  height="20px" 
                  viewBox="0 -960 960 960" 
                  width="20px" 
                  fill="#ffffff"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
                </svg>
                <div className="flex-[1]">{sale.customer.name}</div>
                  </div>
                <div className="flex items-center justify-around w-full gap-2">
                  <svg 
                    className="fill-teal-300"
                    height="20px" 
                    viewBox="0 -960 960 960" 
                    width="20px" 
                    fill="#ffffff"><path d="M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"/></svg>
                  <div className="flex-[1]">
                    {sale.seller.name}
                  </div>
                </div>
                <div className="flex items-center justify-around w-full gap-2">
                  <svg
                    className="fill-green-300"
                    height="20px" 
                    viewBox="0 -960 960 960" 
                    width="20px" 
                    fill="#ffffff"><path d="M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z"/></svg>
                  <div className="flex-[1]">
                    Q{sale.total.toLocaleString('en-US')}
                  </div>
                </div>
                <div className="flex items-center justify-around w-full gap-2">
                  <svg 
                    
                    className="fill-rose-300"
                    height="20px" 
                    viewBox="0 -960 960 960" 
                    width="20px" 
                    fill="#ffffff"><path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"/></svg>
                  <div className="flex-[1]">
                    {
                      sale.products.reduce((total, product) => total + product.serials.length, 0)
                    }
                  </div>
                </div>
                <div className="flex items-center justify-around w-full gap-2">
                  {
                    sale.shipmentNumber 
                    ? <svg className="fill-green-300 " height="20px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    : <svg className="fill-yellow-300" height="20px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                  }
                  <div className="flex-[1]">
                    {
                      sale.deliveryDate
                      ? <p className="text-green-400">Entregado</p> 
                      : <p className="text-yellow-400">Pendiente de entrega</p>
                    }
                  </div>
                </div>
          </Link>
          {(isProductOptionsVisible === sale?.id) && (
          <div
            className="cursor-auto product-options-menu"
          >
                {Array.isArray(permissions) && ((permissions.includes('CANCEL_SALE')|| permissions.includes('SUPERADMIN')) && sale?.shipmentNumber == null) && 
                <div className="product-menu-option" onClick={()=>{handleCancel(); setSelectedProduct(sale.id);}}>
                  Cancelar
                </div> }
          </div>
            )}
        </div>
        
      ))}
     { Array.isArray(permissions) && (permissions.includes('CREATE_SALE') || permissions.includes('SUPERADMIN')) && <Link 
        to='registrar-venta'
        className="flex flex-wrap items-center justify-center drop-shadow-sm border w-[calc(100%/2-10px)] sm:w-[calc(100%/3-10px)] md:w-[calc(100%/3-10px)] lg:w-[calc(100%/4-10px)] p-5 rounded-md bg-white gap-y-1 hover:scale-[101%]">
          <svg 
          className="w-20"
          viewBox="0 -960 960 960" 
          fill="#c5c5c5"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
          <div className="text-neutral-500">Registrar Venta</div> 
      </Link>}
    
    </div>
  )
}

export default AllSales;
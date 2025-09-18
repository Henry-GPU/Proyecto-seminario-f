import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import url from "../config/url";
import '../stylesheet/AddModal.css'
import CardMessage from "./CardMessage";
import CardLoader from "./CardLoader";
import SvgWithInfo from "./SvgWithInfo"
import ConfirmShipmentModal from "./ConfirmShipmetModal";
import DateDisplay from "../hook/DateDisplay";
import { useAccToken } from "./context/AccToken";
import { getSaleById } from "../services/saleService";
import { getProductById } from "../services/productServices";
import { getShipmentBySaleId } from "../services/shipmentService";

function SaleDetail({permissions}) {
  const { accessToken } = useAccToken();
  const { id } = useParams();
  const [sale, setSale] = useState(null);
  const [products, setProducts] = useState([]);
  const [shipment, setShipment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isDelivery, setIsDelivery] = useState(true);
  const [batteriesStatus, setBatteriesStatus] = useState({});
  const token = accessToken;

  const loadSaleInfo = async () => {
    setIsLoading(true);
    try {
      const response = await getSaleById(id);
      setTimeout(()=>{
        setSale(response.data);
        if (response.data.products) {
          response.data.products.forEach((product) => loadProductInfo(product.id));
        }
        setIsLoading(false); 

      },300);
    } catch (error) {
      setIsLoading(false);
      console.error("Error al cargar la información de la venta", error);
      setMessage("Error al cargar la información de la venta.");
      setMessageType(3);
      setIsMessageVisible(true);
    }
  };

  const loadProductInfo = async (productId) => {
    setIsLoading(true);
    try {
      const response = await getProductById(productId);
      setTimeout(()=>{
        setProducts((prevProducts) => {
          if (!prevProducts.some((p) => p.id === response.data.id)) {
            return [...prevProducts, response.data];
          }
          return prevProducts;
        });
        setIsLoading(false);
      },300);  
    } catch (error) {
      setIsLoading(false);
      setMessage("Error al cargar la información del producto.");
      setMessageType(3);
      setIsMessageVisible(true);
    }
  };

  const loadShipmentInfo = async () => {
    setIsLoading(true);
    try {
      const response = await getShipmentBySaleId(id);
      setTimeout(()=>{
        setShipment(response.data);
        setIsLoading(false);
      },300)
    } catch (error) {
      setIsLoading(false);
      console.error("Error al cargar la información de la venta", error);
      setMessage("Error al cargar la información de la venta.");
      setMessageType(3);
      setIsMessageVisible(true);
    }
  };


  useEffect(() => {
    loadSaleInfo();
  }, [id]);

  useEffect(() => {
      loadShipmentInfo();
  }, []);

  const processedProducts = products.map((product) => {
    const saleProduct = sale?.products?.find((sp) => sp.id === product.id);
    return {
      ...product,
      serials: saleProduct?.serials || [],
    };
  });

  const openModal = (serials) => {
    setModalContent(serials);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalContent([]);
  };

  useEffect(() => {
    const fetchBatteriesStatuses = async () => {
      setIsLoading(true);
      setIsLoading(false);
    };

    if (modalContent.length > 0) {
      fetchBatteriesStatuses();
    }
  }, [modalContent]);

  return (
    <div className="relative ">
      {isMessageVisible && messageType === 3 &&
        <CardMessage
        message={message}
        messageType={messageType}
        onAccept={() => setIsMessageVisible(false)}
        path={"/ventas"}
      /> 
      }
      {
        isLoading &&
        <CardLoader isLoading={isLoading} />
      }
      {isConfirmModalVisible &&
        <ConfirmShipmentModal
        isDelivery={isDelivery}
        onClose={()=>{setIsConfirmModalVisible(false); loadSaleInfo(); loadShipmentInfo();}}
        onCancel={()=>{setIsConfirmModalVisible(false);}}
        saleId={id}
      />}
      <div className="flex flex-wrap gap-2 p-4 pb-20 product-main-container md:pb-0">
      { sale &&
        <div className="bg-white w-full sm:flex-[1] rounded-lg shadow-md px-6 pt-2 pb-5 border flex flex-wrap">
        <h2 className="text-lg font-bold">Venta</h2>
        <div className="flex w-full gap-2">
          <SvgWithInfo
            svgPath={"M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"}
            info={"Cliente"}
            fill={"fill-blue-500"}/>
          <p>{`${sale?.customer.name}`}</p>
        </div>
        <div className="flex w-full gap-2">
          <SvgWithInfo
            svgPath={"M440-120v-80h320v-284q0-117-81.5-198.5T480-764q-117 0-198.5 81.5T200-484v244h-40q-33 0-56.5-23.5T80-320v-80q0-21 10.5-39.5T120-469l3-53q8-68 39.5-126t79-101q47.5-43 109-67T480-840q68 0 129 24t109 66.5Q766-707 797-649t40 126l3 52q19 9 29.5 27t10.5 38v92q0 20-10.5 38T840-249v49q0 33-23.5 56.5T760-120H440Zm-80-280q-17 0-28.5-11.5T320-440q0-17 11.5-28.5T360-480q17 0 28.5 11.5T400-440q0 17-11.5 28.5T360-400Zm240 0q-17 0-28.5-11.5T560-440q0-17 11.5-28.5T600-480q17 0 28.5 11.5T640-440q0 17-11.5 28.5T600-400Zm-359-62q-7-106 64-182t177-76q89 0 156.5 56.5T720-519q-91-1-167.5-49T435-698q-16 80-67.5 142.5T241-462Z"}
            info={'Vendedor'}
            fill={'fill-teal-500'}
          />
          <p>{`${sale?.seller.name}`}</p>
        </div>
        <div className="flex w-full gap-2">
          <SvgWithInfo
            svgPath={"M441-120v-86q-53-12-91.5-46T293-348l74-30q15 48 44.5 73t77.5 25q41 0 69.5-18.5T587-356q0-35-22-55.5T463-458q-86-27-118-64.5T313-614q0-65 42-101t86-41v-84h80v84q50 8 82.5 36.5T651-650l-74 32q-12-32-34-48t-60-16q-44 0-67 19.5T393-614q0 33 30 52t104 40q69 20 104.5 63.5T667-358q0 71-42 108t-104 46v84h-80Z"}
            fill={"fill-lime-500"}
            info={"Total"}
          />
          <p>{`Q${sale?.total.toLocaleString('en-US')}`}</p>
        </div>
        <div className="flex w-full gap-2">
          <SvgWithInfo
            svgPath={"M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z"}
            fill={"fill-red-400"}
            info={"Cantidad"}
          />
          <p>{`${sale?.products.reduce(
            (total, product) => total + product.serials.length,
            0
          )}`} productos</p>
        </div>
      </div>}
        
      {sale && shipment && <div className="w-full sm:flex-[1] flex flex-wrap gap-1 justify-start rounded-lg bg-white shadow-md px-6 pt-2 pb-5 border">
        <h2 className="w-full text-lg font-bold">Envío</h2>
        
          {sale?.shipmentNumber
          ? <div className="flex w-full gap-2">
            <SvgWithInfo
              svgPath={"m240-160 40-160H120l20-80h160l40-160H180l20-80h160l40-160h80l-40 160h160l40-160h80l-40 160h160l-20 80H660l-40 160h160l-20 80H600l-40 160h-80l40-160H360l-40 160h-80Zm140-240h160l40-160H420l-40 160Z"}
              info={"Número"}
              fill={"fill-indigo-400"}
            />
            <p className="">{sale?.shipmentNumber}</p>
            </div>
          : ''
          }
        <div className="flex w-full gap-2">
          <SvgWithInfo
            svgPath={"M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"}
            fill={'fill-pink-400'}
            info={'Dirección'}
          />
          <div className="flex flex-wrap gap-x-1"><p>{shipment?.address.addressLine},</p> <p>{shipment?.address.city},</p>{shipment?.address.state}<p></p></div>
        </div>
        <div className="flex w-full gap-2">
          {
            sale?.shipmentNumber 
            ? <SvgWithInfo
                svgPath={"m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"}
                fill={'fill-green-400'}
                info={'Estado'}
              />
            : <SvgWithInfo
              svgPath={"m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"}
              fill={'fill-yellow-400'}
              info={'Estado'}
              />
          }
            <div className="">
          {
            sale?.shipmentNumber 
            ? <p className="text-sm text-green-500">Entregado por: {shipment?.confirmUser} el <DateDisplay dateString={shipment?.deliveryDate}/></p> 
            : <p className="text-sm text-yellow-400">Pendiente de entrega</p>
          }
            </div>
        </div>
        <div className="flex w-full gap-2">
        </div>
        <div className="flex justify-center w-full mt-4">
          {(!shipment?.deliveryDate && (permissions.includes('CONFIRM_SHIPMENT') || permissions.includes("SUPERADMIN"))) &&
            <button 
            onClick={()=>setIsConfirmModalVisible(true)}
            className="btn accept">
            Confirmar envío
          </button>}
        </div>
      </div>}
      {products && 
      <div className="flex flex-wrap w-full gap-2 px-1 pt-2 pb-10 bg-white rounded-md">
      <h2 className="w-full text-lg font-bold">Productos</h2>
        {processedProducts.map((product) => (
          <div className="flex items-center gap-2 px-6 py-2 bg-white border rounded-md shadow-md" key={product.id}>
            <img
              className="object-contain w-20 h-20"
              src={product.productImages[0]?.image?.imageUrl || "/placeholder.png"}
              alt={product.name}
            />
            <div>
              <p className="text-xs font-normal">{product.name}</p>
              <button
                className="w-full text-xs text-green-500 underline"
                onClick={() => {openModal(product.serials)}}
              >
                Ver números de serie
              </button>
            </div>
            <p className="pl-2 text-xs font-semibold">x{product?.serials.length}</p>
          </div>
        ))}
        </div>}
        

      {/* Modal */}
      {isModalVisible && (
        <div className="modal-container">
          <div className="p-6 bg-white rounded-lg w-96">
            <h3 className="mb-4 text-lg font-bold">Números de Serie</h3>
            <ul className="overflow-y-auto max-h-64">
              {modalContent.map((serial, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {`${serial} ${batteriesStatus[serial] || ""}`}
                </li>
              ))}
            </ul>
            <div className="form-footer">
              <button className="btn accept" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
      </div>
  )
}

export default SaleDetail;

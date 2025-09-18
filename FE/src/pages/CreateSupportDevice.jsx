import AddModal from '../component/AddModal';
import ListComponent from '../component/ListComponent';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import SpecsForm from '../component/SpecsForm';
import AddProductResumen from '../component/AddProductResumen';
import { Link } from 'react-router-dom';
import UploadImages from '../component/UploadImages';
import CardLoader from '../component/CardLoader';
import CardMessage from '../component/CardMessage';
import { useSelector, useDispatch } from 'react-redux';
import { resetSupportDevice, setSupportDevice } from '../store/SupportDeviceSlice';
import SerialForm from '../component/SerialForm';
import EmergentMessage from '../component/EmergentCard';
import StandardInput from '../component/inputs/StandardInput';

function AddSupportDeviceForm({url}){
  const dispatch = useDispatch();
  const supportDevice = useSelector((state)=> state.supportDevice);
  const productImages = useSelector((state) => state.product.productImages);
  const [brands, setBrands] = useState([]); 
    const [specValues, setSpecValues] = useState({}); 
    const [models, setModels] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [isAddModalVisible, setIsAddModalVisble] = useState(false);
    const [paramAdd, setParamAdd] = useState("");
    const [isProductFormVisible, setIsProductFormVisible] = useState(true);
    const [isSpecsFormVisible, setIsSpecsFormVisible] = useState(false);
    const [isSerialNumbersFormVisible, setIsSerialNumbersFormVisible] = useState(false);
    const [isResumenVisible, setIsResumenVisible] = useState(false);
    const [isImagesVisible, setIsImagesVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [imagePaths, setImagePaths] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(null);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const token = localStorage.getItem('authToken');

    const handleOpenImages = (images) => {
      setImages(images)
      setIsImagesVisible(false);
      setIsResumenVisible(true);
    }

    useEffect(() => {
      dispatch(resetSupportDevice());
    }, [dispatch]);

    const handleNextClick = () => {
      if (!supportDevice.brand) {
        setMessage('El campo marca debe contener algún valor.');
        setMessageType(2);
        setIsMessageVisible(true);
        return;
      }
    
      if (!supportDevice.model) {
        setMessage('El campo modelo debe contener algún valor.');
        setMessageType(2);
        setIsMessageVisible(true);
        return;
      }

      if (!supportDevice.serial) {
        setMessage('El campo serial debe contener algún valor.');
        setMessageType(2);
        setIsMessageVisible(true);
        return;
      }
      setIsProductFormVisible(false);
      setIsImagesVisible(true);
    };

        const handleInputChange = (e) => {
          const { name, value } = e.target;
          dispatch(setSupportDevice({[name]: value}));
        };

        const handleSubmitImages = async (e) => {
          if (images.length === 0) {
            return [];
          }
          const formData = new FormData();
          images.forEach((image) => {
            formData.append("files", image)
          })
          
          try {
            setIsLoading(true);
            const response = await axios.post(`${url}/image`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${token}`,
              },
            });
            setImagePaths(response.data);
            return response.data;
          } catch (error) {
            console.error("Error al subir las imágenes:", error);
            setIsLoading(false);
            setMessage("Error al subir las imágenes.");
            setMessageType(3);
            setIsMessageVisible(true);
            return [];
          }
        };


    const handleSendData = async() =>{
      const imageData = await handleSubmitImages();
      if(imageData.length > 0){

        const data ={
          brand: supportDevice.brand,
          model: supportDevice.model,
          serial: supportDevice.serial,
          deviceImages:
            imageData.map((item, index)=> (
              {
                imageId: item.id,
              }
            )), 
        }
        try {
          const response = await axios.post(`${url}/product`, data, {
            headers: {
              'Content-Type':'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          setIsLoading(false);
          setMessage("Producto creado satisfactoriamente.");
          setMessageType(1);
          setIsMessageVisible(true);
          dispatch(resetSupportDevice());
        }catch(error){
          setMessage("Error al crear el producto.");
          setMessageType(3);
          setIsMessageVisible(true);
        }
      }else{
        setMessage("Error al subir las imágenes.");
        setMessageType(3);
        setIsMessageVisible(true);
        
      }
    }
 
    return(
    <div className='form-main-container'>
      {isMessageVisible && (
        <EmergentMessage
        message={message}
        type="warning"
        duration={4000}
        onClose={() => setIsMessageVisible(false)}
        />
      )}
       {(isMessageVisible && messageType === 1) && (
        <CardMessage 
            message={message} 
            type="success"
            onAccept={()=>setIsMessageVisible(false)}
        />
      )}
      {(isMessageVisible && messageType === 3) && (
        <CardMessage 
            message={message} 
            messageType={messageType}
            onAccept={()=>setIsMessageVisible(false)}
            path={'/inventario'}
        />
      )}
      {
        isLoading && (<CardLoader
          isLoading={isLoading}
        />)
      }
      
        { (!isLoading && isProductFormVisible) && 
        <div 
          className='flex items-center form-card'>
            <div className='w-full h-full'>
              <h1 className='form-card-title'>Crear equipo de soporte</h1>
              <div className='flex flex-wrap w-full gap-2'>
                  
                  
                  <StandardInput
                    id="brand"
                    title="marca"
                    inputValue={handleInputChange}
                  />
                  <StandardInput
                    id="model"
                    title="modelo"
                    inputValue={handleInputChange}
                  />
                  <StandardInput
                    id="serial"
                    title="numero de serie"
                    inputValue={handleInputChange}
                  />
                  
              </div>
                  <div className='form-footer'>

                      <Link className='btn cancel' 
                        to="/inventario">
                          Cancelar
                      </Link>
                      <button className='btn accept' 
                      onClick={handleNextClick}>Siguiente</button>
                  </div>

              
            </div>
            
         </div>
        }
          {isResumenVisible && (
            <AddProductResumen
                specs={specs}
                images={images}
                onSendData={
                  () => handleSendData()
                }
                onBack={
                  ()=>{
                    setIsImagesVisible(true);
                    setIsResumenVisible(false);
                  }

                }
            />
          )}
          {isImagesVisible &&(
            <UploadImages
              onBack={
                ()=>{
                  setIsSerialNumbersFormVisible(true); 
                  setIsImagesVisible(false);
                }
              }
              onNext={handleOpenImages
                // (images)=>{
                //   setImages(images)
                //   setIsImagesVisible(false);
                //   setIsResumenVisible(true);
                // }
              }
              productImages={productImages}
            />
          )}

          
        </div>)
}

export default AddSupportDeviceForm;
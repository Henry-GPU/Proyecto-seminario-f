import AddModal from './AddModal';
import ListComponent from './ListComponent';
import { useCallback, useEffect, useState } from 'react';
import SpecsForm from './SpecsForm';
import AddProductResumen from './AddProductResumen';
import { Link } from 'react-router-dom';
import UploadImages from './UploadImages';
import CardLoader from './CardLoader';
import CardMessage from './CardMessage';
import { useSelector, useDispatch } from 'react-redux';
import { resetProduct, setProduct } from '../store/productSlice';
import SerialForm from './SerialForm';
import { getStores, createProduct } from '../services/productServices';
import { getBrandsByCategoryId } from '../services/brandServices';
import { getCategories } from '../services/categoryServices';
import { getModelsByBrandId } from '../services/modelServices';
import { useAccToken } from './context/AccToken';
import { saveImages } from '../services/imageService';

function AddProductForm({url}){
  const { accessToken } = useAccToken();
  const dispatch = useDispatch();
  const product = useSelector((state)=> state.product);
    const [brands, setBrands] = useState([]); 
    const [specValues, setSpecValues] = useState({}); 
    const [models, setModels] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [stores, setStores] = useState([]);
    const [isAddModalVisible, setIsAddModalVisble] = useState(false);
    const [paramAdd, setParamAdd] = useState("");
    const [isProductFormVisible, setIsProductFormVisible] = useState(true);
    const [isSpecsFormVisible, setIsSpecsFormVisible] = useState(false);
    const [isSerialNumbersFormVisible, setIsSerialNumbersFormVisible] = useState(false);
    const [isResumenVisible, setIsResumenVisible] = useState(false);
    const [isImagesVisible, setIsImagesVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [wWarranty, setWWarranty] = useState(false);
    const [imagePaths, setImagePaths] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(null);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const token = accessToken;


    useEffect(() => {
      dispatch(resetProduct());
    }, [dispatch]);

    
    const validateField = (field, message) => {
      if (!field) {
        setMessage(message);
        setMessageType(2);
        setIsMessageVisible(true);
        return false;
      }
      return true;
    };
    
    const handleNextClick = () => {
      if (!validateField(product.code, 'El campo código debe contener algún valor.')) return;
      if (!validateField(product.name, 'El campo nombre debe contener algún valor.')) return;
      if (!validateField(product.price, 'El campo precio debe contener algún valor.')) return;
      if (!validateField(product.recomendedPrice, 'El campo precio recomendado debe contener algún valor.')) return;
      if (!validateField(product.model, 'Agrega un modelo antes de continuar.')) return;
      if (!validateField(product.brand, 'Agrega una nueva marca antes de continuar.')) return;
      if (!validateField(product.category, 'Agrega un tipo de producto antes de continuar.')) return;
    
      setIsProductFormVisible(false);
      setIsSpecsFormVisible(true);
    };

    const loadStores = useCallback(async() =>{
      try {
        const response = await getStores();
        setStores(response.data);

        if(response.data.length > 0){
          dispatch(setProduct({store: {id: response.data[0].id, name: response.data[0].name}}));
        }
      } catch (error) {
        setMessage("Error al cargar las bodegas." + ` ${error.message}`);
        setMessageType(3);
        setIsMessageVisible(true);
      }
      finally{
        setIsLoading(false);
      } 
      
    },[product.store.id, url]);
    

    const loadCategories = useCallback(async() => {     
        try {
          const response = await getCategories();
          setCategories(response.data);
          if(response.data.length > 0){
            dispatch(setProduct({category: {id: response.data[0].id, name: response.data[0].name}}))
          }
        } catch (error) {
          setMessage("Error al cargar los tipos de productos." + ` ${error.message}`);
          setMessageType(3);
          setIsMessageVisible(true);
        }
        finally{
          setIsLoading(false);
        } 
      }, [product.category.id, url]);

      const loadBrands = useCallback(async() =>{
        try {
          const response = await getBrandsByCategoryId(product.category.id);
          setBrands(response.data);
          if(response.data.length > 0){
            dispatch(setProduct({brand: {id: response.data[0].id, name: response.data[0].name}}))
          }

        } catch (error) {
          setIsLoading(false);
          setMessage("Error al cargar las marcas."  + `${error.message}`);
          setMessageType(3);
          setIsMessageVisible(true);
        }
        finally{
          setIsLoading(false);
        } 
      }, [product.category.id]);
    
      const loadModels = useCallback(async() =>{
        try {
          const response = await getModelsByBrandId(product.brand.id);
          setModels(response.data);
          console.log(response.data);
          if(Array.isArray(response.data) && response.data.length > 0){
            dispatch(setProduct({model: {id: response.data[0].id, name: response.data[0].name}}));
          }
          setTimeout(() => {
            setIsLoading(false);
          }, 300);
        } catch (error) {
          setTimeout(() => {
            setIsLoading(false);
          }, 100);
          setMessage("Error al cargar los modelos." + `${error.message}`);
          setMessageType(3);
          setIsMessageVisible(true);
        }
        finally{
          setIsLoading(false);
        } 
      }, [product.brand.id]);
    
        const handleInputChange = (e) => {
          const {name , value} = e.target;
          dispatch(setProduct({[name]: value}));
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
            const response = await saveImages(formData);
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

    const toggleCheckbox = (e)=>{
      const {name, checked} = e.target;
      console.log(checked);
      setWWarranty(checked);
    }
    const handleSendData = async() =>{
      const imageData = await handleSubmitImages();
      if(imageData.length > 0){

        const data ={
          code: product.code,
          name: product.name,
          price: product.price,
          recomendedPrice: product.recomendedPrice,
          description: product.description,
          categoryId: product.category.id,
          brandId: product.brand.id,
          modelId: product.model.id,
          storeId: product.store.id,
          stock: 0,
          productSpecificationDTOs:
          product.productSpecifications.map((item, index)=> (
              {
                specificationId: item.id,
                value: item.value,
              }
            )),
          productSerialDTOs:
            product.productSerials.map((item, index)=> (
              {
                serialNumber: item.serialNumber,
                purchaseDate: item.purchaseDate,
              }
            )), 
          productImageDTOs:
            imageData.map((item, index)=> (
              {
                imageId: item.id,
              }
            )), 
        }
        try {
          const response = await createProduct(data);
          setIsLoading(false);
          setMessage("Producto creado satisfactoriamente.", response);
          setMessageType(1);
          setIsMessageVisible(true);
          dispatch(resetProduct());
        }catch(error){
          console.error('Error al enviar datos:', error); 
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

    const handleSelectChange = (e, list) =>{
      const {name , value} = e.target;
      const selectedItem = list.find(item => item.id === parseInt(value)); 
      dispatch(setProduct({[name]: {id: value, name: selectedItem.name}}));
    }

  useEffect(() => {
    loadStores(); // solo carga
  }, []);

  useEffect(() => {
    if (Array.isArray(stores) && stores.length > 0) {
      dispatch(setProduct({store: {id: stores[0].id, name: stores[0].name}}));
    }
  }, [stores]);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (Array.isArray(categories) && categories.length > 0) {
      dispatch(setProduct({category: {id: categories[0].id, name: categories[0].name}}));
    }
  }, [categories]);

  useEffect(() => {
    if (product.category?.id) {
      loadBrands();
    }
  }, [product.category?.id]);

  useEffect(() => {
    if (Array.isArray(brands) && brands.length > 0) {
      dispatch(setProduct({brand: {id: brands[0].id, name: brands[0].name}}));
    }
  }, [brands]);

  useEffect(() => {
    if (product.brand?.id) {
      loadModels();
    }
  }, [product.brand?.id]);

  useEffect(() => {
    if (Array.isArray(models) && (models.length > 0)) {
      dispatch(setProduct({model: {id: models[0].id, name: models[0].name}}));
    }
  }, [models]);

        
    return(
    <div className='form-main-container'>
      {isMessageVisible && (
        <CardMessage 
          message={message} 
          messageType={messageType}
          onAccept={() => setIsMessageVisible(false)}
          path={(messageType === 1 || messageType === 3) ? '/inventario' : undefined}
        />
      )}

      {isLoading && <CardLoader isLoading={isLoading} />}

      
        { (!isLoading && isProductFormVisible) && 
        <div 
          className='flex items-center form-card'>
            <div className='w-full h-full'>
              <h1 className='form-card-title'>Crear producto</h1>
              <label htmlFor="code">Código</label>
              <input 
                      className='form-input'
                      type="text" 
                      name="code" 
                      id='code'
                      value={product.code}
                      onChange={handleInputChange}
                      placeholder=''
                      required/>
              <div className='flex gap-2 add-product-form-item'>
                <div className='flex-[3]'>
                  <label htmlFor="name">Nombre</label>
                    <input 
                        className='form-input'
                        type="text" 
                        name="name" 
                        id='name'
                        value={product.name}
                        onChange={handleInputChange}
                        required/>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className='flex-1'>
                  <label htmlFor="price">Costo</label>
                  <input 
                    className='form-input'
                    type="number" 
                    name="price" 
                    step="0.01" 
                    id='price'
                    min={0}
                    value={product.price == 0 ? `` : product.price}
                    onChange={handleInputChange}
                    required/>
                </div>
                <div className='flex-1'>
                  <label htmlFor="recomendedPrice">Precio recomendado</label>
                  <input 
                    className=' form-input'
                    type="number" 
                    name="recomendedPrice" 
                    step="0.01" 
                    id='recomendedPrice'
                    min={0}
                    value={product.recomendedPrice == 0 ? `` : product.recomendedPrice}
                    onChange={handleInputChange}
                    required/>
                </div>
              </div>
              <ListComponent 
                  list={stores}
                  value={product.store}
                  selectName={'store'}
                  name={'Bodega'}
                  onValueChange={(e) => handleSelectChange(e, stores)}
                  onAddOption={()=> {setIsAddModalVisble(true); setParamAdd("store")}}
                  listId={1}></ListComponent>
              <ListComponent 
                  list={categories}
                  value={product.category}
                  selectName={'category'}
                  name={'categoría'}
                  onValueChange={(e) => handleSelectChange(e, categories)}
                  onAddOption={()=> {setIsAddModalVisble(true); setParamAdd("category")}}
                  listId={1}></ListComponent>
              <ListComponent 
                  list={brands}
                  value={product.brand}
                  name={'marca'}
                  selectName={'brand'}
                  onValueChange={(e) => handleSelectChange(e, brands)}
                  onAddOption={()=> {setIsAddModalVisble(true); setParamAdd("brand")}}
                  listId={2}></ListComponent>
              <ListComponent 
                  list={models}
                  name={'modelo'}
                  value={product.model}
                  selectName={'model'}
                  onValueChange={(e) => handleSelectChange(e, models)}
                  onAddOption={()=> {setIsAddModalVisble(true); setParamAdd("model")}}
                  listId={3}></ListComponent>

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
         {isAddModalVisible && (
          <AddModal 
            param={paramAdd}
            loadCategories={()=>loadCategories()}
            loadBrands={()=>loadBrands()}
            loadModels={()=>loadModels()}
            loadStores={()=>loadStores()}
            onClose={()=>{setIsAddModalVisble(false);}}
          >
          </AddModal>)}
          {isSpecsFormVisible && <SpecsForm
            onBack={
              ()=>{
                setIsProductFormVisible(true); 
                setIsSpecsFormVisible(false);
              } 
            }
            type={product.category.id}
            onNext={
              (specsData) => {
                setSpecs(specsData); 
                setIsSerialNumbersFormVisible(true); 
                setIsSpecsFormVisible(false);
              }
            }
            url={url}
            specValues={specValues}
            setSpecValues={setSpecValues}/>}

          {isSerialNumbersFormVisible && 
            <SerialForm
              onBack={()=>{
                setIsSerialNumbersFormVisible(false); 
                setIsSpecsFormVisible(true);
                }
              }
              onNext={() => {
                setIsSerialNumbersFormVisible(false); 
                setIsImagesVisible(true);
                }
              }
            />
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
              onNext={
                (images)=>{
                  setImages(images)
                  setIsImagesVisible(false);
                  setIsResumenVisible(true);
                }
              }
            />
          )}
        </div>)
}

export default AddProductForm;
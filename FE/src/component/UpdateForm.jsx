import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import CardMessage from "./CardMessage";
import CardLoader from "./CardLoader";
import url from "../config/url";
import { useSelector, useDispatch } from 'react-redux';
import { resetProduct, setProduct } from '../store/productSlice';
import ListComponent from "./ListComponent";
import AddModal from "./AddModal";
import SpecsForm from "./SpecsForm";
import { useParams } from "react-router-dom";
import AddProductResumen from "./AddProductResumen";
import UploadImages from "./UploadImages";
import { saveImages, saveImageUrls } from "../services/imageService";
import { getProductById, getStores, updProduct } from "../services/productServices";
import { getCategories } from "../services/categoryServices";
import { getModelsByBrandId } from "../services/modelServices";
import { getBrandsByCategoryId } from "../services/brandServices";

function UpdateForm({}){
  const {id} = useParams();
  const token = localStorage.getItem('authToken');
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(null);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isAddModalVisible, setIsAddModalVisble] = useState(false);
    const [paramAdd, setParamAdd] = useState("");
    const dispatch = useDispatch();
    const [stores, setStores] = useState([]);
    const product = useSelector((state)=> state.product);
    const [brands, setBrands] = useState([]); 
    const [specValues, setSpecValues] = useState({}); 
    const [models, setModels] = useState([]);
    const [specs, setSpecs] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isProductFormVisible, setIsProductFormVisible] = useState(true);
    const [isSpecsFormVisible, setIsSpecsFormVisible] = useState(false);
    const [isResumenVisible, setIsResumenVisible] = useState(false);
    const [isImagesVisible, setIsImagesVisible] = useState(false);
    const [images, setImages] = useState([]);
    const [imagePaths, setImagePaths] = useState([]);



    const handleSubmitImages = async (e) => {
      if (images.length === 0) {
        console.warn("El array de imágenes está vacío.");
        return [];
      }
    
      // Separar URLs y archivos
      const urls = images
      .filter((image) => typeof image === "object" && image.imageUrl) // Filtrar objetos con una propiedad 'url'
      .map((image) => image.imageUrl);
      const files = images.filter((image) => typeof image === "object" && image instanceof File);
    
      const results = [];
    
      try {
        setIsLoading(true);
    
        // Enviar URLs si existen
        if (urls.length > 0) {
          const responseUrl = await saveImageUrls(urls);
          results.push(...responseUrl.data);
        }
    
        // Subir archivos si existen
        if (files.length > 0) {
          const formData = new FormData();
          files.forEach((file) => formData.append("files", file));
    
          const response = await saveImages(formData);
          results.push(...response.data);
        }
    
        setImagePaths(results);
        return results;
      } catch (error) {
        console.error("Error al subir las imágenes:", error);
        setMessage("Error al subir las imágenes.");
        setMessageType(3);
        setIsMessageVisible(true);
        return [];
      } finally {
        setIsLoading(false);
      }
    }; 
 
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
          productSpecificationDTOs:
          product.productSpecifications.map((item, index)=> (
              {
                specificationId: item.id,
                value: item.value,
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
          const response = await updProduct(id, data);
          setIsLoading(false);
          setMessage(response.data);
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
 
    const loadProductInfo = async()=>{
    try {
      const response = await getProductById(id);
      setIsLoading(false);
      dispatch(setProduct(response?.data));
    } catch (error) {
      console.error('Error al cargar la información del producto', error);
      setMessage("Error al cargar la información del producto.");
      setMessageType(3);
      setIsMessageVisible(true);
      
    }
  };
  const loadStores = useCallback(async() =>{
    try {
      const response = await getStores();
      setStores(response.data);

      if(response.data.length > 0){
        dispatch(setProduct({store: {id: response.data[0]?.id, name: response.data[0]?.name}}));
      }
    } catch (error) {
      console.error('Error al cargar las bodegas:', error);
      setMessage("Error al cargar las bodegas.");
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
      console.error('Error al cargar los tipos de productos:', error);
      setMessage("Error al cargar los tipos de productos.");
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
      console.error('Error al cargar las marcas:', error);
      setIsLoading(false);
      setMessage("Error al cargar las marcas.");
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
      if(response.data.length > 0){
      }
        setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar los modelos:', error);
        setIsLoading(false);
      setMessage("Error al cargar los modelos.");
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

      const handleSelectChange = (e, list) =>{
        const {name , value} = e.target;
        const selectedItem = list.find(item => item.id === parseInt(value)); 
        dispatch(setProduct({[name]: {id: value, name: selectedItem.name}}));
      }

      const handleNextClick = () => {
        if (!product.name) {
          setMessage('El campo nombre debe contener algún valor.');
          setMessageType(2);
          setIsMessageVisible(true);
          return;
        }
      
        if (!product.price) {
          setMessage('El campo precio debe contener algún valor.');
          setMessageType(2);
          setIsMessageVisible(true);
          return;
        }
  
        if (!product.code) {
          setMessage('El campo código debe contener algún valor.');
          setMessageType(2);
          setIsMessageVisible(true);
          return;
        }
  
        if (!product.model) {
          setMessage('Agrega un modelo antes de continuar.');
          setMessageType(2);
          setIsMessageVisible(true);
          return;
        }
      
        if (!product.brand) {
          setMessage('Agrega una nueva marca antes de continuar.');
          setMessageType(2);
          setIsMessageVisible(true);
          return;
        }
      
        if (!product.category) {
          setMessage('Agrega un tipo de producto antes de continuar.');
          setMessageType(2);
          setIsMessageVisible(true);
          return;
        }
  
        setIsProductFormVisible(false);
        setIsSpecsFormVisible(true);
      };
  
  useEffect(() => {
    loadProductInfo();   
  }, [id]); 
  useEffect(()=>{
    loadStores();
    dispatch(setProduct({store: {id: stores[0]?.id, name: stores[0]?.name}}))
  },[dispatch]);

  useEffect(() => {
        loadCategories();
        dispatch(setProduct({category: {id: categories[0]?.id, name:categories[0]?.name  }}))
      }, [dispatch]);
  
      useEffect(()=>{
        if(product.category.id){
          loadBrands();
          dispatch(setProduct({brand: {id: brands[0]?.id, name:brands[0]?.name}}))
        }
      },[product.category.id, dispatch]);
  
      useEffect(()=>{
        if(product.brand.id){
          loadModels();
        }
      },[product.brand.id, dispatch]);


  return(
    <div className='form-main-container'>
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
            onAccept={()=>setIsMessageVisible(false)}
            path={'/inventario'}
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
          className='text-sm form-card'>
            <h1 className='form-card-title'>Actualizar producto</h1>
            <label className="font-semibold" htmlFor="code">Código</label>
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
                  <label className="font-semibold" htmlFor="name">Nombre</label>
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
                  <label className="font-semibold" htmlFor="price">Costo</label>
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
                  <label className="font-semibold" htmlFor="recomendedPrice">Precio recomendado</label>
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
        {/* <div className='add-product-form-item'>
            <textarea 
                className='form-textarea'
                type="text" 
                name="description" 
                id='description'
                value={product.description}
                onChange={handleInputChange}
                placeholder='Descripción'
                required/>
        </div> */}
        <ListComponent 
            list={categories}
            value={product.productType}
            selectName={'productType'}
            name={'categoría'}
            onValueChange={(e) => handleSelectChange(e, categories)}
            onAddOption={()=> {setIsAddModalVisble(true); setParamAdd("type")}}
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
        }
         {isAddModalVisible && (
          <AddModal 
            param={paramAdd}
            loadcategories={()=>loadCategories()}
            loadBrands={()=>loadBrands()}
            loadModels={()=>loadModels()}
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
                setIsImagesVisible(true); 
                setIsSpecsFormVisible(false);
              }
            }
            url={url}
            specValues={specValues}
            setSpecValues={setSpecValues}/>}
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
                isUpdate={true}
            />
          )}
          {isImagesVisible &&(
            <UploadImages
              onBack={
                ()=>{
                  setIsSpecsFormVisible(true); 
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
        </div>
  )
}

export default UpdateForm;
import { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setProduct, resetProduct } from "../store/productSlice";
import url from "../config/url";
import CardLoader from "./CardLoader";
import CardMessage from "./CardMessage";
import AddModal from "./AddModal";
import DashboardTable from "./DashboardTable";
import { Link } from "react-router-dom";
import { delModel, getModelsByBrandId } from "../services/modelServices";
import { delBrand, getBrandsByCategoryId } from "../services/brandServices";
import { getCategories, delCategory } from "../services/categoryServices";
import { getSpecs, delSpec } from "../services/specificationServices";

function CategoriesDashboard(){
  const dispatch = useDispatch();
  const product = useSelector((state)=> state.product);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [paramAdd, setParamAdd] = useState("");
  const [specs, setSpecs] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDeleteCategory, setIsDeleteCategory] = useState(false);
  const [isDeleteBrand, setIsDeleteBrand] = useState(false);
  const [isDeleteSpec, setIsDeleteSpec] = useState(false);
  const [isDeleteModel, setIsDeleteModel] = useState(false);
  const [isAddModalVisible, setIsAddModalVisble] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    dispatch(resetProduct());
  }, [dispatch]);

  const [deleteType, setDeleteType] = useState("");

  const confirmDeletion = (type, id) => {
    let msg = "";
    switch (type) {
      case "category":
        msg = "¿Estás seguro que quieres eliminar esta categoría?";
        break;
      case "brand":
        msg = "¿Estás seguro que quieres eliminar esta marca?";
        break;
      case "spec":
        msg = "¿Estás seguro que quieres eliminar esta especificación para todos los productos de esta categoría?";
        break;
      case "model":
        msg = "¿Estás seguro que quieres eliminar este modelo para todos los productos de esta marca?";
        break;
    }
  
    setMessage(msg);
    setMessageType(4);
    setIsMessageVisible(true);
    setDeleteType(type);
    setSelectedItem(id);
  };
  
  const renderCardMessage = () => {
    if (!isMessageVisible) return null;
  
    const props = {
      message,
      messageType,
      onAccept: () => {
        if (messageType === 4) handleDelete(deleteType, selectedItem);
        else setIsMessageVisible(false);
      },
      onCancel: () => setIsMessageVisible(false),
    };
  
    return <CardMessage {...props} />;
  };
  
  const handleDelete = async (type, id) => {
    setIsMessageVisible(false);
    setIsLoading(true);
  
    try {
      let response;
      switch (type) {
        case "category":
          response = await delCategory(id);
          break;
        case "brand":
          response = await delBrand(id);
          break;
        case "spec":
          response = await delSpec(id);
          break;
        case "model":
            response = await delModel(id);
            break;
      }
  
      setMessage(response);
      setMessageType(1);
      setIsMessageVisible(true);
      setSelectedItem(null);
      setIsDeleteBrand(false);
      setIsDeleteCategory(false);
      setIsDeleteSpec(false);
      setIsDeleteModel(false);
  
      if (type === "category") loadCategories();
      if (type === "brand") {loadCategories(); loadBrands()};
      if (type === "spec") {loadCategories(); loadSpecs()};
      if (type === "model") {loadCategories(); loadSpecs(); loadBrands();};
  
    } catch (error) {
      setMessage(`Error inesperado al eliminar el recurso, ${error.message}`);
      setTimeout(() => {
        setIsLoading(false);
        setMessageType(3);
        setIsMessageVisible(true);
      }, 500);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };
  
  const loadCategories = useCallback(async() =>{
    setIsLoading(true);
    try {
      const response = await getCategories();
      if(response.length > 0){
        setCategories(response.data);
        setSelectedCategory(response.data[0].id);
        dispatch(setProduct({category:{id: response.data[0].id, name: response.data[0].name}}));
        dispatch(setProduct({brand: {id: null, name: ""}}));      
      }
      setTimeout(() => {
        setIsLoading(false);
      },1000);
    } catch (error) {
        if (error.response) {
          setMessage("Error inesperado al cargar las categorias.");
        }
        setIsLoading(false);
        setMessageType(3);
        setIsMessageVisible(true);
    }
  },[]);

  const loadSpecs = useCallback(async() =>{
    setIsLoading(true);
    try {
      const response = await getSpecs(selectedCategory);
      
      setTimeout(() => {
        setIsLoading(false);
        if(response.data.length > 0){
          setSpecs(response.data);
        }else{
          setSpecs([]);
        }
      },200);
    } catch (error) {
        setMessage("Error inesperado al cargar las especificaciones.", error.message);
        setTimeout(()=>{
        setIsLoading(false);
        setMessageType(3);
        setIsMessageVisible(true);
      },500);
  }
  },[url, selectedCategory]);

  const handleSelected = (data) =>{
    if(!selected){
      setSelected(data.id);
      loadModels(data.id);
    }else if(data === selected){
      setSelected(null);
    }else{
      setSelected(data.id);
      loadModels(data.id);
    }
    
  }

  useEffect(()=>{
    if(product.brand.id){
      loadModels();
    }
  },[product.brand.id, dispatch]);
  

  const loadBrands = useCallback(async() =>{
    setIsLoading(true);
    try {
      const response = await getBrandsByCategoryId(selectedCategory);
      setTimeout(() => {
        if(response.data.length > 0){
          setBrands(response.data);
          dispatch(setProduct({brand: {id: null, name: ""}}));
        }else{
          setBrands([]);
          dispatch(setProduct({brand: {id: null, name: ""}}));
        }
        setIsLoading(false);
      },200);
    } catch (error) {
      setMessage("Error inesperado al cargar las marcas." , error.message);
      setTimeout(()=>{
        setIsLoading(false);
        setMessageType(3);
        setIsMessageVisible(true);
      },500);
      
  }
  },[url, selectedCategory]);

  const loadModels = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getModelsByBrandId(product.brand.id);
      setTimeout(() => {
        if(response.data.length > 0){
          setModels(response.data);
        }else{
          setModels([]);
        }
        setIsLoading(false);
      },200);
    } catch (error) {
      setMessage("Error inesperado al cargar las marcas." , error.message);
      setTimeout(()=>{
        setIsLoading(false);
        setMessageType(3);
        setIsMessageVisible(true);
      },500);
      
    }
  },[product.brand.id]);

  useEffect(()=>{
   loadCategories();
   dispatch(setProduct({brand: {id: null, name: ""}}));
   setBrands([]);
   setSpecs([]);
   setModels([]);
  },[loadCategories]);

  useEffect(()=>{
    if(selectedCategory){
      loadSpecs();
      loadBrands();
      setSelected(null);
    }  
  },[loadSpecs, loadBrands]);

  return(
    
    
    <div className="dashboard-main-container">
      <div className="w-10 pt-2 pl-2 h-7 md:hidden">
        <Link 
        to="/home"
        className="w-5">
          <svg className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </Link>    
      </div>
    
      {renderCardMessage()}
      {
        isLoading && 
        <CardLoader
          isLoading={isLoading}
        />
      }
        {isAddModalVisible && (
          <AddModal 
            param={paramAdd}
            brand={selected}
            loadProductTypes={()=>loadCategories()}
            loadBrands={()=>loadBrands()}
            loadSpecs={()=>loadSpecs()}
            onClose={()=>{setIsAddModalVisble(false);}}
          >
          </AddModal>)}
      <div className="categories-container">
        {categories.map((category)=>(
          <button
            key={category.id}
            className={`category-button 
              ${selectedCategory == category.id 
                ? 'selected': ''
                }`
            } 
            onClick={()=>{setSelectedCategory(category.id); dispatch(setProduct({category:{id: category.id, name: category.name}}));}}
            >
            {category.name}
          </button>
        ))}
        <button
          className="category-add-button"
          onClick={()=>{setParamAdd('type'); setIsAddModalVisble(true);}}
          >Agregar
        </button>
      </div>
      <div className="flex flex-wrap gap-4 px-4">
        <DashboardTable 
          list={specs} 
          title="Especificaciones" 
          onDelete={(id)=>confirmDeletion('spec', id)}
          onNew={()=>{setParamAdd('spec'); setIsAddModalVisble(true);}}
          />
        <DashboardTable
          onClick={(e)=> dispatch(setProduct({brand: {id: e.id, name: e.name}}))} 
          list={brands} 
          title="Marcas" 
          onDelete={(id)=>confirmDeletion('brand', id)}
          onNew={()=>{setParamAdd('brand'); setIsAddModalVisble(true);}}
          />
        { product.brand.id &&
          <DashboardTable
          list={models} 
          title="Modelos" 
          onDelete={(id)=>confirmDeletion('model', id)}
          onNew={()=>{setParamAdd('model'); setIsAddModalVisble(true);}}
          />
        }
      </div>
      <div className="flex items-center w-full gap-1 pl-4 mt-4 text-xs text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#8f8f8f"><path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
        <p>Selecciona una marca para ver sus modelos.</p>
      </div>

      <div className="flex justify-center w-full mt-4 mb-4">
        <button 
          className="btn cancel"
          onClick={()=>confirmDeletion('category', selectedCategory)}
        >Eliminar Categoria</button>
      </div>
    </div>

  )
}

export default CategoriesDashboard;
import { useState, useCallback, useEffect, useRef } from "react";
import ListComponent from "./ListComponent";
import { useDispatch, useSelector } from "react-redux";
import { setSale, resetSale, addProduct } from "../store/saleSlice";
import { useAccToken } from './context/AccToken';
import { getProducts, getProductSerialsById } from "../services/productServices";

function SaleAddProduct({ url, onCancel, onAccept }) {
  const { accessToken } = useAccToken();
  const dispatch = useDispatch();
  const sale = useSelector(state => state.sale);
  const [isLoading, setIsLoading] = useState(true);
  const [serial, setSerial] = useState(null);
  const [price, setPrice] = useState('');
  const [availableSerials, setAvailableSerials] = useState(1);
  const [products, setProducts] = useState([]);
  const [cant, setCant] = useState(1);
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [messageType, setMessageType] = useState(null);
  const containerRef = useRef(null);
  const options = ['Con baterias de Inventario', 'Baterias originales', 'Sin baterias'];
  const [selected, setSelected] = useState('');
  const [compatibleBatteries, setCompatibleBatteries] = useState([]);
  const [compatibleBattery, setCompatibleBattery] = useState(null);
  const token = accessToken;

  const handleAccept = () => {
    let withBatteries = 0;
    switch (selected) {
      case 'Con baterias de Inventario':
        withBatteries = 1;
        break;
      case 'Baterias originales':
        withBatteries = 2;
        break;
      case 'Sin baterias':
        withBatteries = 3;
        break;

      default:
        break;
    }

    if (availableSerials > 0 || cant <= availableSerials) {
      const newProduct = {
        product: parseInt(product?.id, 10),
        category: product?.category.id,
        image: product?.productImages[0]?.image?.imageUrl || product?.image,
        name: product?.name || 'name',
        price: price ? parseFloat(price) : product?.recomendedPrice,
        cant: cant,
      };

      // Verificar si el producto ya está en el carrito
      const existingProduct = sale.products.find((p) => p.product === newProduct.product && p.price === newProduct.price);


      if (cant > 0) {
        if (existingProduct) {
          // Actualizar la cantidad del producto existente
          const updatedProducts = sale.products.map((p) =>
            p.product === newProduct.product
              ? { ...p, cant: p.cant + cant }
              : p
          );
          dispatch(setSale({ products: updatedProducts }));
        } else {
          // Agregar el nuevo producto al carrito
          dispatch(addProduct(newProduct));
        }

        // Actualizar el total
        dispatch(setSale({ total: sale.total + (price ? parseFloat(price) : product?.recomendedPrice) * cant }));

        // Restar la cantidad seleccionada a la disponibilidad
        setAvailableSerials(availableSerials - cant);
      }
      onAccept();
    } else {
      alert('No hay unidades disponibles de este producto.');
    }
  };

  const loadProducts = useCallback(async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
      setProduct(response.data[0]);
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        console.error("Error del servidor: ", error.response.data);
        setMessage("Error en el servidor al cargar los productos.");
      } else if (error.request) {
        console.error("Error de red: ", error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error("Error inesperado: ", error.message);
        setMessage("Error inesperado al cargar los productos.");
      }

      setMessageType(3);
      setIsMessageVisible(true);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  const loadSerials = useCallback(async () => {
    try {
      const response = await getProductSerialsById(product.id);
      const existingProduct = sale.products.filter((p) => p.product === product.id);
      let alreadySelected = existingProduct.length > 0 ? existingProduct.reduce((total, p)=> total + p.cant, 0) : 0;
      setAvailableSerials(response.data.length - alreadySelected);
    } catch (error) {
      setIsLoading(false);

      if (error.response) {
        console.error("Error del servidor: ", error.response.data);
        setMessage("Error en el servidor al cargar las series.");
      } else if (error.request) {
        console.error("Error de red: ", error.request);
        setMessage("Error de red. Por favor verifica tu conexión.");
      } else {
        console.error("Error inesperado: ", error.message);
        setMessage("Error inesperado al cargar las series.");
      }

      setMessageType(3);
      setIsMessageVisible(true);
    } finally {
      setIsLoading(false);
    }
  }, [url, product, sale.products]);


  const handleSelectChange = (e, list) => {
    const { value } = e.target;
    const selectedItem = list.find(item => item.id === parseInt(value));
    setProduct(selectedItem);
  };


  const handleInputChange = (e) => {
    const value = Number(e);
    if (value >= 1 && value <= availableSerials) {
      setCant(value);
    } else {
      //setCant(availableSerials); // Ajustar si el valor excede la disponibilidad
    }
  };

  const handleCheckboxChange = (opcion) => {
    if (selected === opcion) {
      setSelected("");
    } else {
      setSelected(opcion);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (product) {
      setSerial(null);
      loadSerials();
    }
  }, [loadSerials, product]);

  return (
    <div className="modal-container">
      <div className="form-card" ref={containerRef}>
        <h2 className="form-title">Agregar productos</h2>
        <ListComponent
          list={products}
          listId={1}
          selectName={'product'}
          name={"producto"}
          value={product}
          onValueChange={(e) => handleSelectChange(e, products)}
          withoutButtonAdd={true}
        />
        <div className="flex items-end gap-2">
          <div className="flex flex-wrap items-center justify-center w-full gap-1 pt-2 text-sm">
            <label htmlFor="cant" className="pl-3">Cantidad</label>
            <input
              className="w-10 pl-2 py-2 bg-gray-100 border rounded-md"
              id="cant"
              name="cant"
              type="number"
              value={availableSerials  > 0 ? cant : 0}
              min={1}
              max={availableSerials}
              readOnly
            />
            <div className="flex flex-col h-full gap-1">
             <button className="flex-1 w-5 bg-gray-300 rounded-none" onClick={()=>handleInputChange(cant+1)}>+</button>
              <button className="flex-1 w-5 bg-gray-300 rounded-none" onClick={() =>handleInputChange(cant-1)}>-</button>
            </div>
            <span className="ml-1 text-sm font-semibold text-cyan-400">{availableSerials} disponible(s)</span>
          </div>
        </div>
        <div className="flex items-center justify-center w-full gap-2 pt-2 text-sm">
        </div>
        <div className="flex justify-center w-full gap-1 text-sm ">Precio recomendado: <p className="font-semibold text-green-500">{`Q.` + product?.recomendedPrice}</p></div>
        <div className="flex flex-wrap items-center justify-center w-full gap-2 pt-2 text-sm">
          <label htmlFor="precio" className="pl-3">Precio manual</label>
          <input
            className="w-20 pl-1 border rounded-md"
            id="precio"
            name="precio"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>


        <div className="form-footer">
          <button onClick={onCancel} className="btn cancel">
            Cancelar
          </button>
          <button onClick={handleAccept} className="btn accept">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaleAddProduct;

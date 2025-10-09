import { useEffect, useState } from 'react';
import imagePlaceHolder from '../placeholder/imagePlaceHolder.jpg';
import SaleAddProduct from './SaleAddProduct';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSale, removeProduct } from '../store/saleSlice';

function SaleProducts({ url, onBack, onAccept }) {
  const dispatch = useDispatch();
  const sale = useSelector((state) => state.sale);
  const [total, setTotal] = useState(sale.total);
  const [isSerialAddProductsVisible, setIsSerialAddProductsVisible] = useState(false);

  const handleSendData = (tt) => {
    dispatch(setSale({ total: tt }));
    onAccept();
  };

  const handleTotal = () =>{
    sale.products.map((product)=> {
      dispatch(setSale({total: sale.total + product.price * product.cant}))
    })
  }


  const handleRemoveItem = (product) =>{
    dispatch(removeProduct(product));
  }

  useEffect(()=>{

  },[dispatch])

  return (
    <>
      <div className="form-card">
        <h2 className="form-title">Productos</h2>
        {sale.products.length > 0 && (
          sale.products.map((product, index) => (
            Object.keys(product).length > 0 && (
              <div key={index} className="gap-4 mb-2 form-item-card">
                <img 
                  className="h-16 w-auto object-contain flex-[2]" 
                  src={product.image ? product.image : imagePlaceHolder}
                  alt={product.name}
                />
                <div className="flex-[4]">
                  <p className='text-sm font-semibold'>{product.name}</p>
                </div>
                <div className="text-xs font-bold flex-[3] flex justify-center">
                  {`Q${product.price} x ${product.cant}`}
                </div>
                <div className="flex-[1]">
                  <svg
                    className="hover:cursor-pointer fill-gray-300 hover:fill-red-400"
                    onClick={() => handleRemoveItem(product)}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ffffff"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </div>
              </div>
            )
          ))
        )}
        <div className='flex flex-wrap justify-center my-5'>
          <button 
            onClick={() => { setIsSerialAddProductsVisible(true) }}
            className='text-green-500'
          >
            Agregar productos
          </button>
          <p className='w-full text-center'>{`Total: Q`}{sale?.total.toLocaleString('en-US')}</p>
        </div>
        <div className="form-footer">
          <Link className='btn cancel' to='/ventas'>Cancelar</Link>
          <button onClick={onBack} className='btn back'>Atrás</button>
          <button 
            onClick={() => handleSendData(sale?.total)}
            className='btn accept'>Aceptar</button>
        </div>
      </div>

      {isSerialAddProductsVisible && (
        <SaleAddProduct
          url={url}
          onBack={() => {}}
          onCancel={() => setIsSerialAddProductsVisible(false)}
          onAccept={() => setIsSerialAddProductsVisible(false)}
        />
      )}
    </>
  );
}

export default SaleProducts;

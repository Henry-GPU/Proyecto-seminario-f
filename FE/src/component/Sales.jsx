import url from "../config/url";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetSale, setSale } from "../store/saleSlice";
import { Link } from "react-router-dom";
import CardLoader from "./CardLoader";
import CardMessage from "./CardMessage";
import SaleProducts from "./SaleProducts";
import AddModal from "./AddModal";
import ListComponent from "./ListComponent";
import { createSale, getCustomerAddresses, getCustomers } from "../services/saleService";

const MESSAGE_SUCCESS = 1;
const MESSAGE_ERROR = 3;

function Sales() {
  const dispatch = useDispatch();
  const sale = useSelector((state) => state.sale);

  const [products, setProducts] = useState([]);
  const [paramAdd, setParamAdd] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState({ visible: false, message: "", type: null });
  const [customers, setCustomers] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isAddAddressModalVisible, setIsAddAddressModelVisible] = useState(false);
  const [isSaleFormVisible, setIsSaleFormVisible] = useState(true);
  const [isSaleProductsVisible, setIsSaleProductsVisible] = useState(false);

  useEffect(() => {
    dispatch(resetSale());
  }, [dispatch]);

  const handleSendData = async () => {
    const dataForm = {
      seller: sale.seller.id,
      customer: sale.customer.id,
      total: sale.total,
      address: sale.address.id,
      products: sale.products,
    };
    try {
      const response = await createSale(dataForm);
      setIsLoading(false);
      setAlert({ visible: true, message: response, type: MESSAGE_SUCCESS });
    } catch (error) {
      setIsLoading(false);
      console.error(error.message);
      setAlert({ visible: true, message: error.message, type: MESSAGE_ERROR });
    }
  };

  const loadCustomers = useCallback(async () => {
    try {
      const response = await getCustomers();
      setCustomers(response.data);
      if (response.length > 0) {
        dispatch(setSale({ customer: { id: response.data[0].id, name: response.data[0].name } }));
      }
    } catch (error) {
      console.error(error.message);
      setAlert({ visible: true, message: "Error al cargar los clientes.", type: MESSAGE_ERROR });
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const loadCustomerAddresses = useCallback(async () => {
    try {
      const response = await getCustomerAddresses(sale.customer.id);
      setAddresses(response.data);

      if (response.data.length > 0) {
        const { id, addressLine, city, state } = response.data[0];
        dispatch(setSale({ address: { id, addressLine, city, state } }));
      } else {
        dispatch(setSale({ address: {} }));
      }
    } catch (error) {
      console.error("Error al cargar las direcciones:", error);
      setAlert({ visible: true, message: "Error al cargar las direcciones.", type: MESSAGE_ERROR });
    }
  }, [dispatch, sale.customer.id]);

  const handleGenericSelectChange = (e, list, name, formatFn) => {
    const { value } = e.target;
    const selectedItem = list.find((item) => item.id === parseInt(value));
    if (selectedItem) {
      dispatch(setSale({ [name]: formatFn(selectedItem) }));
    }
  };

  const showAddCustomerModal = () => {
    setIsAddAddressModelVisible(true);
    setParamAdd("customer");
  };

  const showAddAddressModal = () => {
    setIsAddAddressModelVisible(true);
    setParamAdd("address");
  };

  useEffect(() => {
    loadCustomers();
  }, []);
  useEffect(() => {
    if (Array.isArray(customers) && customers.length > 0) {
        dispatch(setSale({customer: {id: customers[0].id, name: customers[0].name}}));
    }
  }, [customers]);

  useEffect(() => {
    if(sale?.customer?.id){
      loadCustomerAddresses();
    }

  }, [sale.customer?.id]);

  useEffect(() => {
      if (Array.isArray(addresses) && addresses.length > 0) {
        dispatch(setSale({ address: { id: addresses[0].id, addressLine: addresses[0].addressLine, city: addresses[0].icity, state: addresses[0].state } }));

      }
  }, [sale.customer.id, loadCustomerAddresses, dispatch]);

  return (
    <div className="form-main-container">
      {alert.visible && (
        <CardMessage
          message={alert.message}
          messageType={alert.type}
          onAccept={() => setAlert({ ...alert, visible: false })}
          path={alert.type === MESSAGE_SUCCESS || alert.type === MESSAGE_ERROR ? "/ventas" : undefined}
        />
      )}

      {isLoading && <CardLoader isLoading={isLoading} />}

      {!isLoading && isSaleFormVisible && (
        <div className="form-card">
          <h2 className="form-title">Registrar una venta</h2>
          <div className="sales-content">
            <div className="flex flex-wrap sales-content-item">
              <ListComponent
                list={customers}
                listId={1}
                name={"cliente"}
                selectName={"customer"}
                value={sale.customer}
                onValueChange={(e) =>
                  handleGenericSelectChange(e, customers, "customer", (item) => ({
                    id: item.id,
                    name: item.name,
                  }))
                }
                onAddOption={showAddCustomerModal}
              />
              <ListComponent
                list={addresses}
                listId={2}
                name={"direccion"}
                value={sale.address}
                selectName={"address"}
                prop={"address"}
                onValueChange={(e) =>
                  handleGenericSelectChange(e, addresses, "address", (item) => ({
                    id: item.id,
                    addressLine: item.addressLine,
                    city: item.city,
                    state: item.state,
                  }))
                }
                onAddOption={showAddAddressModal}
              />
              <div className="form-footer">
                <Link className="btn cancel" to="/ ">
                  Cancelar
                </Link>
                <button
                  className="btn accept"
                  onClick={() => {
                    setIsSaleProductsVisible(true);
                    setIsSaleFormVisible(false);
                  }}
                >
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSaleProductsVisible && (
        <SaleProducts
          url={url}
          onBack={() => {
            setIsSaleFormVisible(true);
            setIsSaleProductsVisible(false);
          }}
          onChange={setProducts}
          selectedProducts={products}
          onAccept={handleSendData}
        />
      )}

      {isAddAddressModalVisible && (
        <AddModal
          param={paramAdd}
          loadCustomerAdresses={loadCustomerAddresses}
          loadCustomers={loadCustomers}
          onClose={() => setIsAddAddressModelVisible(false)}
        />
      )}
    </div>
  );
}

export default Sales;

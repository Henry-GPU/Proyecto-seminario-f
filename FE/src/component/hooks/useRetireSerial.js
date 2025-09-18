import { useState, useEffect } from 'react';
import { deleteSerial, getProductSerialsById } from '../../services/productServices';

export const useRetireSerial = (id) => {
  const [serials, setSerials] = useState([]);
  const [serial, setSerial] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(null);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar seriales
  useEffect(() => {
    const loadSerials = async () => {
      if (!id) return;
      try {
        const response = await getProductSerialsById(id);
        setSerials(response.data);
      } catch (error) {
        setMessage(error.message || 'Error al cargar las series.');
        setMessageType(3);
        setIsMessageVisible(true);
      }
    };
    loadSerials();
  }, [id]);

  // Manejo del cambio de opción
  const handleSelectChange = (value) => {
    setSelectedOption(parseInt(value));
  };

  // Validación previa
  const validateBeforeRetire = () => {
    if (!serial) return { valid: false, msg: 'Debes seleccionar una serie antes de continuar.', type: 2 };
    if (selectedOption === "") return { valid: false, msg: 'Debes seleccionar un motivo.', type: 2 };
    if (selectedOption === 0) return { valid: false, msg: '¿Estás seguro que quieres eliminar este producto?', type: 4 };
    if (selectedOption === 4) return { valid: false, msg: '¿Estás seguro que quieres marcar este producto como defectuoso/dañado?', type: 6 };
    return { valid: true };
  };

  // Enviar retiro
  const retireSerial = async () => {
    setIsLoading(true);
    const data = { product: parseInt(id), serial, option: selectedOption };

    try {
      const response = await deleteSerial(data);
      setMessage(response.data);
      setMessageType(1);

      const updatedSerials = await getProductSerialsById(id);
      setSerials(updatedSerials.data);

    } catch (error) {
      setMessage(error.message || "Error inesperado al retirar la serie.");
      setMessageType(3);
    } finally {
      setIsLoading(false);
      setIsMessageVisible(true);
    }
  };

  return {
    serials,
    serial,
    setSerial,
    selectedOption,
    handleSelectChange,
    message,
    messageType,
    isMessageVisible,
    isLoading,
    retireSerial,
    validateBeforeRetire,
    setMessage,
    setMessageType,
    setIsMessageVisible
  };
};

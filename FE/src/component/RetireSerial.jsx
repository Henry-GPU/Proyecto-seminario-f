import { useParams, Link } from "react-router-dom";
import CardMessage from "./CardMessage";
import CardLoader from "./CardLoader";
import { useRetireSerial } from "./hooks/useRetireSerial";
import { getMessageConfig } from "./utils/messageHandlers";

function RetireSerial() {
  const { id } = useParams();
  const {
    serials, serial, setSerial, selectedOption, handleSelectChange,
    message, messageType, isMessageVisible, isLoading,
    retireSerial, validateBeforeRetire, setMessage, setMessageType, setIsMessageVisible
  } = useRetireSerial(id);

  const handleAccept = () => {
    console.log('reita');
    const validation = validateBeforeRetire();
    if (!validation.valid) {
      setMessage(validation.msg);
      setMessageType(validation.type);
      setIsMessageVisible(true);
    }
  };

  const messageConfig = getMessageConfig(messageType, message, {
    onAccept: () => setIsMessageVisible(false),
    onCancel: () => setIsMessageVisible(false),
    onConfirm: () => { retireSerial(); console.log('pria'); setIsMessageVisible(false); }
  });

  if (isLoading) return <CardLoader isLoading={isLoading} />;
  if (isMessageVisible && messageConfig)
    return <CardMessage {...messageConfig} />;

  return (
    <div className="form-main-container">
      <div className="form-card">
        <h1 className='form-card-title'>Retirar serie</h1>
        <div className="flex flex-wrap justify-between gap-2">
          <div className="w-full mb-4">
            <label htmlFor="serial" className="block mb-1 text-sm font-semibold text-neutral-700">Serie:</label>
            <select
              id="serial"
              className="w-full pt-2 pb-2 pl-1 text-sm bg-gray-100 rounded text-neutral-700"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
            >
              <option value="" disabled>{serials.length > 0 ? "Selecciona una serie" : "No hay series en existencia"}</option>
              {Array.isArray(serials) && serials.map(s => <option key={s.id} value={s.serialNumber}>{s.serialNumber}</option>)}
            </select>
          </div>
          <div className="w-full mb-4">
            <label htmlFor="reason" className="block mb-1 text-sm font-semibold text-neutral-700">Motivo:</label>
            <select
              id="reason"
              className="w-full pt-2 pb-2 pl-1 text-sm bg-gray-100 rounded text-neutral-700"
              value={selectedOption}
              onChange={(e) => handleSelectChange(e.target.value)}
            >
              <option value="" disabled>Selecciona un motivo</option>
              <option value={4}>Producto defectuoso/dañado</option>
              <option value={0}>Creado por error</option>
            </select>
          </div>
        </div>
        <div className="form-footer">
          <Link className='btn cancel' to="/inventario">Cancelar</Link>
          <button className="btn accept" onClick={handleAccept}>Retirar</button>
        </div>
      </div>
    </div>
  );
}

export default RetireSerial;

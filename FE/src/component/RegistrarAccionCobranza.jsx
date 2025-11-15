import React, { useMemo, useState, useEffect } from "react";
import apiClient from "../services/apiClient";
import { getCollections } from "../services/DebtAssigmentService";
import { crearDeuda } from "../services/DebtService";
import { use } from "react";
import { registrarAccionCobranza } from "../services/cobranzaService";

// Visualización de pagos vencidos
// Backend: GET /api/pago/{id}/vencido
function RegistrarAccionCobranza() {
  const [idCliente, setIdCliente] = useState("");
  const [montoInicial, setMontoInicial] = useState("");
  const [noCuotas, setNoCuotas] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState(0);

  const clearMessages = () => {
    setMessage(null);
    setError(null);
  };

    const loadCollections = async () => {
      try {
          getCollections().then((res)=>{
          setCollections(res.data);
        });
      } catch (error) {
        
      }
    };
  
    useEffect(() => {
      loadCollections();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearMessages();

    // Validación mínima
    const parsed = parseInt(idCliente, 10);
    if (!idCliente || Number.isNaN(parsed) || parsed <= 0) {
      setError("Ingrese un ID de cliente válido.");
      return;
    }

    try {
      setLoading(true);
      const { data } = registrarAccionCobranza({
        idCliente: parsed,
        idCobranza: collection,
      });
      setMessage(typeof data === "string" ? data : "Accion registrada correctamente.");
      setIdCliente("");
    } catch (data) {
      // const msg = err?.response?.data || err?.message || "No se pudo registrar el pago";
      // setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="form-main-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 className="form-card-title">Registro Accion Cobranza</h2>

        {/* Campo: ID Cliente */}
        <div className="form-item">
          <label htmlFor="idCliente" className="form-input-label">
            ID de Cliente
          </label>
          <input
            id="idCliente"
            name="idCliente"
            type="number"
            className="form-input"
            placeholder="Ingrese el ID del cliente"
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
            min={1}
          />
          <label htmlFor="idCliente" className="form-input-label">
            Accion
          </label>
          <select className="combo-form" style={{}} id="collection" value={collection} onChange={(e) => setCollection(e.target.value)}>
              <option value="0">Seleccionar Canal de Cobranza</option>
              {collections?.map((u) => (
                <option key={u.id} value={u.id}>{u.nombre}</option>
              ))}
            </select>        
        </div>

        {/* Mensajes */}
        {message && (
          <div className="w-full my-2 p-3 rounded-lg bg-green-100 text-green-800 text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="w-full my-2 p-3 rounded-lg bg-red-100 text-red-800 text-sm">
            {error}
          </div>
        )}

        {/* Acciones */}
        <div className="form-footer">
          <button
            type="button"
            className="btn cancel"
            onClick={() => {
              setIdCliente("");
              setMontoInicial("");
              setNoCuotas("");
              setCollection(0);
              clearMessages();
            }}
            disabled={loading}
          >
            Limpiar
          </button>
          <button type="submit" className="btn accept" disabled={loading}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegistrarAccionCobranza;

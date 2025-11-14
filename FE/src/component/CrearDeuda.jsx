import React, { useMemo, useState } from "react";
import apiClient from "../services/apiClient";
import { crearDeuda } from "../services/DebtService";

// Visualización de pagos vencidos
// Backend: GET /api/pago/{id}/vencido
function CrearDeuda() {
  const [idCliente, setIdCliente] = useState(0);
  const [montoInicial, setMontoInicial] = useState(0);
  const [noCuotas, setNoCuotas] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const clearMessages = () => {
    setMessage(null);
    setError(null);
  };

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
      const { data } = crearDeuda({
        idCliente: parsed,
        montoInicial: montoInicial,
        noCuotas: noCuotas,
        idInteres: 1,
      });
      setMessage(typeof data === "string" ? data : "Pago registrado correctamente.");
      setIdCliente("");
    } catch (err) {
      const msg = err?.response?.data || err?.message || "No se pudo registrar el pago";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-main-container">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 className="form-card-title">Creacion de deuda</h2>

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
            Monto
          </label>
          <input
            id="montoInicial"
            name="montoInicial"
            type="number"
            className="form-input"
            placeholder="Ingrese el Monto Inicial pa"
            value={montoInicial}
            onChange={(e) => setMontoInicial(e.target.value)}
            min={1000}
          />
          <label htmlFor="idCliente" className="form-input-label">
            Numero de Cuotas
          </label>
          <input
            id="noCuotas"
            name="noCuotas"
            type="number"
            className="form-input"
            placeholder="Ingrese el numero de cuotas"
            value={noCuotas}
            onChange={(e) => setNoCuotas(e.target.value)}
            min={1}
          />
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
              clearMessages();
            }}
            disabled={loading}
          >
            Limpiar
          </button>
          <button type="submit" className="btn accept" disabled={loading}>
            {loading ? "Registrando..." : "Registrar Pago"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearDeuda;

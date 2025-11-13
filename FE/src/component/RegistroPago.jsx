import React, { useState } from "react";
import apiClient from "../services/apiClient";
import { crearPago } from "../services/PagoService";

// Backend: POST /api/pago/registrar { idCliente }
function RegistroPago() {
  const [idCliente, setIdCliente] = useState("");
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
      const { data } = crearPago({
        idCliente: parsed,
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
        <h2 className="form-card-title">Registro de Pago</h2>

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

export default RegistroPago;

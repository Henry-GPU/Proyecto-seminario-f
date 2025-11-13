import React, { useMemo, useState } from "react";
import apiClient from "../services/apiClient";

// Visualización de pagos vencidos
// Backend: GET /api/pago/{id}/vencido
function PagosVencidos() {
  const [idCliente, setIdCliente] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const clearMessages = () => {
    setError(null);
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
    clearMessages();

    const parsed = parseInt(idCliente, 10);
    if (!idCliente || Number.isNaN(parsed) || parsed <= 0) {
      setError("Ingrese un ID de cliente válido.");
      return;
    }

    try {
      setLoading(true);
      const resp = await apiClient.get(`/api/pago/${parsed}/vencido`);
      setData(resp?.data ?? null);
    } catch (err) {
      const msg = err?.response?.data || err?.message || "No se pudo obtener la información";
      setError(typeof msg === "string" ? msg : JSON.stringify(msg));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // Arma columnas automáticamente si data es arreglo de objetos
  const table = useMemo(() => {
    if (!data) return null;

    // Si es string o número, mostrar simple
    if (typeof data === "string" || typeof data === "number") {
      return (
        <div className="w-full my-2 p-3 rounded-lg bg-gray-100 text-gray-800 text-sm break-words">
          {String(data)}
        </div>
      );
    }

    // Si es objeto único, mostrar JSON
    if (!Array.isArray(data)) {
      return (
        <pre className="w-full my-2 p-3 rounded-lg bg-gray-100 text-gray-800 text-xs overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      );
    }

    // Si es arreglo vacío
    if (Array.isArray(data) && data.length === 0) {
      return (
        <div className="w-full my-2 p-3 rounded-lg bg-gray-100 text-gray-800 text-sm">
          No hay pagos vencidos para este cliente.
        </div>
      );
    }

    // Si es arreglo de objetos
    const keys = Array.from(
      data.reduce((set, item) => {
        if (item && typeof item === "object") {
          Object.keys(item).forEach((k) => set.add(k));
        }
        return set;
      }, new Set())
    );

    return (
      <div className="card table-wrapper w-full max-w-full overflow-auto">
        <h3>Pagos vencidos</h3>
        <div className="table-scroll w-full">
          <table className="table w-full min-w-[600px]">
            <thead>
              <tr>
                {keys.map((k) => (
                  <th key={k} className="text-left p-2 border-b">{k}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {keys.map((k) => (
                    <td key={k} className="p-2 border-b align-top">
                      {formatValue(row?.[k])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }, [data]);

  function formatValue(val) {
    if (val == null) return "";
    if (typeof val === "object") return JSON.stringify(val);
    return String(val);
  }

  return (
    <div className="form-main-container">
      <form className="form-card" onSubmit={handleBuscar}>
        <h2 className="form-card-title">Pagos vencidos por cliente</h2>

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

        {error && (
          <div className="w-full my-2 p-3 rounded-lg bg-red-100 text-red-800 text-sm">
            {error}
          </div>
        )}

        <div className="form-footer">
          <button
            type="button"
            className="btn cancel"
            onClick={() => {
              setIdCliente("");
              setData(null);
              clearMessages();
            }}
            disabled={loading}
          >
            Limpiar
          </button>
          <button type="submit" className="btn accept" disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </div>
      </form>

      {/* Resultado */}
      <div className="w-full max-w-4xl mx-2 sm:mx-auto mt-2">{table}</div>
    </div>
  );
}

export default PagosVencidos;

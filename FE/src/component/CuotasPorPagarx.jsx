import React, { useState } from "react";

function CuotasPorPagar() {
  const [selectedClient, setSelectedClient] = useState("");
  const [clientDetail, setClientDetail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const cuotas = [
    { id: "C001", cliente: "Juan Pérez", monto: "Q 1,200", fecha: "2025-08-20", estado: "Pendiente" },
    { id: "C002", cliente: "María López", monto: "Q 850", fecha: "2025-08-18", estado: "Vencida" },
    { id: "C003", cliente: "Carlos Ruiz", monto: "Q 3,100", fecha: "2025-09-01", estado: "En curso" },
    { id: "C004", cliente: "Ana Díaz", monto: "Q 500", fecha: "2025-08-25", estado: "Asignada" },
    { id: "C005", cliente: "Luis Ramírez", monto: "Q 2,400", fecha: "2025-08-10", estado: "Pendiente" }
  ];

  const detallesClientes = {
    C001: { saldo: 10000, cliente: "Juan Pérez" },
    C002: { saldo: 7500, cliente: "María López" },
    C003: { saldo: 15200, cliente: "Carlos Ruiz" },
    C004: { saldo: 4800, cliente: "Ana Díaz" },
    C005: { saldo: 12600, cliente: "Luis Ramírez" }
  };

  const handleVerCuotas = () => {
    if (detallesClientes[selectedClient]) {
      const saldoInicial = detallesClientes[selectedClient].saldo;
      const cuota = saldoInicial / 12;
      let saldoRestante = saldoInicial;

      const plan = Array.from({ length: 12 }, (_, i) => {
        saldoRestante -= cuota;
        let estado = "Por pagar";
        if (i < 3) estado = "Pagada";
        else if (i < 6) estado = "Vencida";

        return {
          numero: `${i + 1}/12`,
          monto: `Q ${cuota.toFixed(2)}`,
          nuevoSaldo: `Q ${saldoRestante.toFixed(2)}`,
          estado
        };
      });

      setClientDetail({ 
        id: selectedClient, 
        cliente: detallesClientes[selectedClient].cliente,
        saldoInicial, 
        plan 
      });
    } else {
      setClientDetail(null);
    }
  };

  const handleProgramarPago = () => {
    if (selectedClient) {
      setShowModal(true);
      setCustomMessage("");
    } else {
      alert("Debe seleccionar un cliente antes de programar un pago.");
    }
  };

  const handleEnviar = () => {
    setShowModal(false);
    setShowSuccessModal(true);
    setSelectedDate("");
  };

  return (
    <div className="content">
      {/* Header */}
      <div className="content-header">
        <h2>Cuotas por Pagar</h2>
      </div>

      {/* Buscador por ID */}
      <div className="card">
        <h3>Buscar Cliente</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Ingrese ID del cliente (Ej. C001)"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          />
          <button className="btn-primary" onClick={handleVerCuotas}>Ver cuotas por pagar</button>
          <button className="btn-secondary" onClick={handleProgramarPago}>Programar Recordatorio de Pago</button>
        </div>
      </div>

      {/* Detalle del cliente */}
      {clientDetail && (
        <div className="card">
          <h3>Detalle de Cliente: {clientDetail.cliente} ({clientDetail.id})</h3>
          <p><strong>Saldo Inicial:</strong> Q {clientDetail.saldoInicial}</p>
          <table className="table">
            <thead>
              <tr>
                <th># Cuota</th>
                <th>Monto</th>
                <th>Nuevo Saldo</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {clientDetail.plan.map((c, i) => (
                <tr key={i}>
                  <td>{c.numero}</td>
                  <td>{c.monto}</td>
                  <td>{c.nuevoSaldo}</td>
                  <td>
                    <span
                      className={`badge ${
                        c.estado === "Pagada"
                          ? "green"
                          : c.estado === "Vencida"
                          ? "red"
                          : "yellow"
                      }`}
                    >
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tabla general */}
      <div className="card table-wrapper">
        <h3>Listado de Clientes</h3>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cuotas.map((c, i) => (
                <tr key={i}>
                  <td>{c.id}</td>
                  <td>{c.cliente}</td>
                  <td>{c.monto}</td>
                  <td>{c.fecha}</td>
                  <td>
                    <span
                      className={`badge ${
                        c.estado === "Pendiente"
                          ? "yellow"
                          : c.estado === "Vencida"
                          ? "red"
                          : c.estado === "En curso"
                          ? "blue"
                          : "green"
                      }`}
                    >
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Programar Pago */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Programar Recordatorio de Pago</h3>
            <p><strong>ID Cliente:</strong> {selectedClient}</p>
            <p><strong>Cliente:</strong> {detallesClientes[selectedClient].cliente}</p>
            <label>Seleccione fecha de recordatorio:</label>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
            />
            <label>Mensaje personalizado:</label>
            <textarea
              rows="4"
              placeholder="Escriba un mensaje para el recordatorio..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleEnviar}>Enviar</button>
              <button className="btn-danger" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>✅ Confirmación</h3>
            <p>El recordatorio de pago fue enviado con éxito.</p>
            {customMessage && (
              <div className="card" style={{ marginTop: "10px", background: "#2c2f48", padding: "10px" }}>
                <p><strong>Mensaje enviado:</strong></p>
                <p>{customMessage}</p>
              </div>
            )}
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowSuccessModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CuotasPorPagar;

import React, { useState } from "react";

function ControlPagos() {
  const [selectedClient, setSelectedClient] = useState("");
  const [clientDetail, setClientDetail] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);

  const clientes = {
    C001: { nombre: "Juan Pérez", deuda: 3200, cuotas: 36 },
    C002: { nombre: "María López", deuda: 1500, cuotas: 24 },
    C003: { nombre: "Carlos Ruiz", deuda: 4200, cuotas: 48 },
    C004: { nombre: "Ana Díaz", deuda: 800, cuotas: 12 },
    C005: { nombre: "Luis Ramírez", deuda: 2800, cuotas: 30 }
  };

  const pagosRecientes = [
    { id: "C001", cliente: "Juan Pérez", monto: "Q 1,200", fecha: "2025-08-20", estado: "Pendiente" },
    { id: "C002", cliente: "María López", monto: "Q 850", fecha: "2025-08-18", estado: "Vencida" },
    { id: "C003", cliente: "Carlos Ruiz", monto: "Q 3,100", fecha: "2025-09-01", estado: "En curso" },
    { id: "C004", cliente: "Ana Díaz", monto: "Q 500", fecha: "2025-08-25", estado: "Asignada" },
    { id: "C005", cliente: "Luis Ramírez", monto: "Q 1,900", fecha: "2025-09-03", estado: "Pagado" }
  ];

  const handleVerResumen = () => {
    if (clientes[selectedClient]) {
      setClientDetail({ id: selectedClient, ...clientes[selectedClient] });
    } else {
      setClientDetail(null);
      alert("Cliente no encontrado");
    }
  };

  const handleRegistrarPago = () => {
    if (!clientDetail) {
      alert("Seleccione un cliente y vea su resumen primero.");
      return;
    }
    setShowRegisterModal(true);
  };

  const handleConcluirRegistro = () => {
    setShowRegisterModal(false);
    setShowReceiptModal(true);
  };

  const handleFinalizarPago = () => {
    setShowReceiptModal(false);
    setShowFinalModal(true);
  };

  return (
    <div className="content">
      {/* Header */}
      <div className="content-header">
        <h2>Control de Pagos</h2>
      </div>

      {/* Buscar Cliente */}
      <div className="card">
        <h3>Buscar Cliente</h3>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Ingrese ID del cliente (Ej. C001)"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          />
          <button className="btn-primary" onClick={handleVerResumen}>Ver Resumen</button>
          <button className="btn-secondary" onClick={handleRegistrarPago}>Registrar Pago</button>
        </div>

        {/* Resumen de cliente */}
        {clientDetail && (
          <div className="client-detail-card">
            <h4>📌 Resumen del Cliente</h4>
            <p><strong>ID:</strong> {clientDetail.id}</p>
            <p><strong>Nombre:</strong> {clientDetail.nombre}</p>
            <p><strong>Deuda actual:</strong> Q {clientDetail.deuda}</p>
            <p><strong>Cuotas totales:</strong> {clientDetail.cuotas}</p>
          </div>
        )}
      </div>

      {/* Resumen General de Clientes */}
      <div className="card table-wrapper">
        <h3>Resumen de Clientes</h3>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pagosRecientes.map((p, i) => (
                <tr key={i}>
                  <td>{p.id}</td>
                  <td>{p.cliente}</td>
                  <td>{p.monto}</td>
                  <td>{p.fecha}</td>
                  <td>
                    <span
                      className={`badge ${
                        p.estado === "Pendiente"
                          ? "yellow"
                          : p.estado === "Vencida"
                          ? "red"
                          : p.estado === "En curso"
                          ? "blue"
                          : "green"
                      }`}
                    >
                      {p.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Registro de Pago */}
      {showRegisterModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Registrar Pago</h3>
            <p><strong>Cliente:</strong> {clientDetail?.nombre}</p>
            <p><strong>Deuda actual:</strong> Q {clientDetail?.deuda}</p>
            <input type="text" placeholder="Número de comprobante" />
            <input type="number" placeholder="Monto a pagar" />
            <input type="date" />
            <select>
              <option value="">Método de pago</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
            <input type="text" placeholder="Referencia bancaria (opcional)" />
            <textarea placeholder="Observaciones"></textarea>
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleConcluirRegistro}>Concluir registro</button>
              <button className="btn-danger" onClick={() => setShowRegisterModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Comprobante */}
      {showReceiptModal && (
        <div className="modal-overlay">
          <div className="modal receipt">
            <h2>🏦 Comprobante de Pago</h2>
            <p><strong>No. Comprobante:</strong> 000123</p>
            <p><strong>Cliente:</strong> {clientDetail?.nombre}</p>
            <p><strong>Monto pagado:</strong> Q XXXX</p>
            <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
            <p><strong>Método:</strong> Tarjeta</p>
            <p><strong>Referencia:</strong> #TRX9856</p>
            <div className="modal-actions">
              <button className="btn-primary">Descargar Comprobante</button>
              <button className="btn-secondary" onClick={handleFinalizarPago}>Finalizar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Final */}
      {showFinalModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>✅ Pago Aplicado con Éxito</h3>
            <p>Se aplicaron <strong>2 cuotas</strong> al cliente {clientDetail?.nombre}.</p>
            <p><strong>Saldo final:</strong> Q {clientDetail?.deuda - 2000}</p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowFinalModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ControlPagos;

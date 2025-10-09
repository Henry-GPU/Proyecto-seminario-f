import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, LineChart, Line
} from "recharts";

const CollectionActions = () => {
  const [showModal, setShowModal] = useState(false);
  const [clienteId, setClienteId] = useState("");
  const [timelineFiltrado, setTimelineFiltrado] = useState([]);
  const [detalleCliente, setDetalleCliente] = useState(null);

  // Datos de clientes
  const clientes = {
    ID001: { nombre: "Juan Pérez", estado: "Pendiente", monto: "Q 1,200" },
    ID002: { nombre: "María López", estado: "Vencida", monto: "Q 850" }
  };

  // Acciones de ejemplo
  const accionesPorCliente = {
    ID001: [
      { fecha: "2025-08-16", detalle: "Llamada realizada — promesa de pago" },
      { fecha: "2025-08-15", detalle: "SMS recordatorio enviado" },
      { fecha: "2025-08-14", detalle: "Correo de recordatorio enviado" }
    ],
    ID002: [
      { fecha: "2025-08-20", detalle: "Visita programada al domicilio" },
      { fecha: "2025-08-18", detalle: "Notificación jurídica entregada" },
      { fecha: "2025-08-17", detalle: "Llamada telefónica de seguimiento" }
    ]
  };

  // Gráficos y reportes
  const accionesPorCanal = [
    { canal: "Visita", acciones: 12 },
    { canal: "Llamada", acciones: 25 },
    { canal: "Correo", acciones: 18 },
    { canal: "Jurídico", acciones: 7 },
    { canal: "Automático", acciones: 15 }
  ];

  const accionesEnTiempo = [
    { fecha: "2025-08-10", acciones: 5 },
    { fecha: "2025-08-15", acciones: 12 },
    { fecha: "2025-08-20", acciones: 8 },
    { fecha: "2025-08-25", acciones: 20 },
    { fecha: "2025-08-30", acciones: 14 }
  ];

  const reporteResponsable = [
    { responsable: "Carlos Méndez", acciones: 15 },
    { responsable: "Ana López", acciones: 10 },
    { responsable: "Luis Ramírez", acciones: 8 },
    { responsable: "María González", acciones: 12 },
    { responsable: "Jorge Castillo", acciones: 20 }
  ];

  // Ver detalle de cliente
  const verDetalle = () => {
    if (accionesPorCliente[clienteId]) {
      setTimelineFiltrado(accionesPorCliente[clienteId]);
      setDetalleCliente(clientes[clienteId] || null);
    } else {
      setTimelineFiltrado([]);
      setDetalleCliente(null);
    }
  };

  return (
    <div className="content">
      {/* Header */}
      <div className="content-header">
        <h2>Acciones de Cobranza</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          Nueva Acción
        </button>
      </div>


      {/* Línea de tiempo */}
      <div className="card">
        <h3>Línea de tiempo por cliente</h3>
        <div className="timeline-header">
          <input
            type="text"
            placeholder="Id de cliente (ej: ID001, ID002)"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            className="input-field"
          />
          <button className="btn-primary" onClick={verDetalle}>
            Ver detalle
          </button>
        </div>

        {detalleCliente && (
          <div className="cliente-detalle card" style={{ marginTop: "15px", padding: "10px" }}>
            <p><strong>Cliente:</strong> {detalleCliente.nombre}</p>
            <p><strong>Estado:</strong> {detalleCliente.estado}</p>
            <p><strong>Monto:</strong> {detalleCliente.monto}</p>
          </div>
        )}

        <ul className="timeline">
          {timelineFiltrado.length > 0 ? (
            timelineFiltrado.map((t, i) => (
              <li key={i}>
                <span className="dot"></span>
                <div>
                  <p className="timeline-date">{t.fecha}</p>
                  <p>{t.detalle}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No hay acciones para este cliente</p>
          )}
        </ul>
      </div>

      {/* 📊 Cards en dos columnas */}
      <div className="cards-grid">
        <div className="card">
          <h3>Acciones por canal de cobranza</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accionesPorCanal}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="canal" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="acciones" fill="#426FE4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Acciones en el tiempo</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={accionesEnTiempo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="fecha" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="acciones" stroke="#E3A43D" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Reporte por responsable</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Responsable</th>
                <th>Acciones realizadas</th>
              </tr>
            </thead>
            <tbody>
              {reporteResponsable.map((r, i) => (
                <tr key={i}>
                  <td>{r.responsable}</td>
                  <td>{r.acciones}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3>Efectividad por tipo de acción</h3>
          <div className="chart-placeholder">[Gráfico aquí]</div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Nueva Acción de Cobranza</h3>
            <input type="text" placeholder="ID de Deuda" />
            <input type="text" placeholder="Cliente" />
            <input type="text" placeholder="Tipo de Acción o Descripción" />

            <select>
              <option value="">Seleccionar Responsable</option>
              <option value="cobrador1">Carlos Méndez</option>
              <option value="cobrador2">Ana López</option>
              <option value="cobrador3">Luis Ramírez</option>
              <option value="cobrador4">María González</option>
              <option value="cobrador5">Jorge Castillo</option>
            </select>

            <input type="date" />
            <select>
              <option value="">Seleccionar canal de cobranza</option>
              <option value="visita">Visita Domiciliar</option>
              <option value="llamada">Llamada Telefónica</option>
              <option value="correo">Correo Electrónico</option>
              <option value="juridico">Cobro Jurídico</option>
              <option value="automatico">Automático</option>
            </select>

            <div className="modal-actions">
              <button className="btn-primary">Guardar</button>
              <button className="btn-danger" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionActions;

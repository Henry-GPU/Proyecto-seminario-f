import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";

function RegistroCobranza() {
  const [showFilterClient, setShowFilterClient] = useState(false);
  const [showFilterCobrador, setShowFilterCobrador] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [filtro, setFiltro] = useState(null);

  // 25 registros de ejemplo
  const historial = Array.from({ length: 25 }, (_, i) => ({
    id: `G${i + 1}`,
    clienteId: `C${100 + i}`,
    cliente: ["Juan Pérez", "María López", "Carlos Ruiz", "Ana Díaz", "Luis Ramírez", "Sofía Torres", "Pedro Castillo", "Andrea Molina", "Fernando Cruz", "Gabriela Herrera"][i % 10],
    cobradorId: `E${200 + (i % 5)}`,
    empleado: ["Carlos Méndez", "Ana Torres", "José Morales", "Laura Castillo", "Pedro Herrera"][i % 5],
    monto: `Q ${1000 + i * 150}`,
    fecha: `2025-09-${(i % 30) + 1}`,
    efectividad: `${60 + (i % 40)}%`,
    detalle: ["Promesa de pago", "Cliente no atendió", "Pago recibido", "Negociación", "Acuerdo firmado"][i % 5],
    estado: ["En curso", "Concluida positiva", "Concluida negativa"][i % 3]
  }));

  // Filtrar tabla
  const filteredData = filtro
    ? historial.filter(
        (h) =>
          h.id.includes(filtro) ||
          h.cliente.toLowerCase().includes(filtro.toLowerCase()) ||
          h.empleado.toLowerCase().includes(filtro.toLowerCase())
      )
    : historial;

  // Datos de ejemplo para gráfico por cobrador
  const dataGrafico = [
    { empleado: "Carlos Méndez", enCurso: 5, positivas: 3, negativas: 2 },
    { empleado: "Ana Torres", enCurso: 4, positivas: 2, negativas: 3 },
    { empleado: "José Morales", enCurso: 6, positivas: 5, negativas: 1 },
    { empleado: "Laura Castillo", enCurso: 3, positivas: 4, negativas: 2 },
    { empleado: "Pedro Herrera", enCurso: 7, positivas: 6, negativas: 2 }
  ];

  return (
    <div className="content">
      {/* Header */}
      <div className="content-header">
        <h2>Registro de Cobranza</h2>
      </div>

      {/* Botones de filtro */}
      <div className="card">
        <h3>Filtros</h3>
        <div className="filter-bar">
          <button className="btn-info" onClick={() => setShowFilterClient(true)}>
            Filtrar por Cliente
          </button>
          <button className="btn-info" onClick={() => setShowFilterCobrador(true)}>
            Filtrar por Cobrador
          </button>
          <button className="btn-danger" onClick={() => setFiltro(null)}>
            Quitar Filtros
          </button>
          <button className="btn-primary" onClick={() => setShowExport(true)}>
            Exportar Reporte
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="card table-wrapper">
        <h3>Historial global de gestiones</h3>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>ID Gestión</th>
                <th>ID Cliente</th>
                <th>Cliente</th>
                <th>ID Cobrador</th>
                <th>Cobrador</th>
                <th>Monto Recuperado</th>
                <th>Fecha</th>
                <th>Efectividad</th>
                <th>Detalle de gestión</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((h, i) => (
                <tr key={i}>
                  <td>{h.id}</td>
                  <td>{h.clienteId}</td>
                  <td>{h.cliente}</td>
                  <td>{h.cobradorId}</td>
                  <td>{h.empleado}</td>
                  <td>{h.monto}</td>
                  <td>{h.fecha}</td>
                  <td>{h.efectividad}</td>
                  <td>{h.detalle}</td>
                  <td>
                    <span
                      className={`badge ${
                        h.estado === "En curso"
                          ? "blue"
                          : h.estado === "Concluida positiva"
                          ? "green"
                          : "red"
                      }`}
                    >
                      {h.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gráfico */}
      <div className="card">
        <h3>Gestiones de cobranza por cobrador</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={dataGrafico}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="empleado" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Legend wrapperStyle={{ color: "white" }} />
            <Bar dataKey="enCurso" fill="#3498db" name="En curso" />
            <Bar dataKey="positivas" fill="#27AE60" name="Concluida positiva" />
            <Bar dataKey="negativas" fill="#E74C3C" name="Concluida negativa" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Modal Filtrar por Cliente */}
      {showFilterClient && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Filtrar por Cliente</h3>
            <input
              type="text"
              placeholder="Ingrese ID o nombre del cliente"
              onChange={(e) => setFiltro(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowFilterClient(false)}>
                Buscar
              </button>
              <button className="btn-danger" onClick={() => setShowFilterClient(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Filtrar por Cobrador */}
      {showFilterCobrador && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Filtrar por Cobrador</h3>
            <input
              type="text"
              placeholder="Ingrese ID o nombre del cobrador"
              onChange={(e) => setFiltro(e.target.value)}
            />
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => setShowFilterCobrador(false)}>
                Buscar
              </button>
              <button className="btn-danger" onClick={() => setShowFilterCobrador(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Exportar Reporte */}
      {showExport && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Exportar Reporte</h3>
            <label>Fecha Inicio</label>
            <input type="date" />
            <label>Fecha Fin</label>
            <input type="date" />
            <div className="modal-actions">
              <button className="btn-primary">Descargar</button>
              <button className="btn-danger" onClick={() => setShowExport(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistroCobranza;

import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  RadialBarChart, RadialBar
} from "recharts";
import { getTotalAllDebts } from "../services/DebtService";
import { getTotalPagos } from "../services/PagoService";
import { getDistMoras } from "../services/MorasService";

const REPORT_TYPES = [
  "Recaudación",
  "Efectividad recaudada",
  "Recuperado por gestor",
  "Estado de cuenta",
  "Moras",
  "Pagos recibidos",
  "Metrización de tiempos"
];

const DashboardView = () => {
  // ---- Estado del modal de reportes ----
  const [totalDeudas, setTotalDeudas] = useState(0);
  const [distMoras, setDistMoras] = useState(null);
  const [totalPagoss, setTotalPagos] = useState(0);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState("Recaudación");
  const [timeMetric, setTimeMetric] = useState("Últimos 7 días");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [readyToDownload, setReadyToDownload] = useState(false);

  const openExport = (prefill) => {
    if (prefill) setSelectedReport(prefill);
    setReadyToDownload(false);
    setShowReportModal(true);
  };

  const loadTotalDeudas = async () => {
    try {
      getTotalAllDebts().then((res)=>{
        setTotalDeudas(res?.data);
      });
    } catch (error) {
      
    }
    setTotalDeudas(25400);
  }

  const loadDistMoras = async () => {
    try { getDistMoras().then((res)=>{
        setDistMoras(res?.data);
      });
    } catch (error) {
      
    }
  }
  const loadTotalPagos = async () => {
    try {
      getTotalPagos().then((res)=>{
        setTotalPagos(res?.data);
      });
    } catch (error) {
      
    }
  }

  // ---- Datos demo para visualizaciones ----
  const pieMoras = [
    { name: "Solventes", value: distMoras?.solventes , color: "#27AE60" },
    { name: "Morosos", value: distMoras?.morosos, color: "#F1C40F" },
    { name: "Morosísimos", value: distMoras?.morosisimos, color: "#E74C3C" },
    { name: "Sin Deudas", value: distMoras?.sinDeudas, color: "#8b8b8bff" }
  ];

  const barrasCanalesPago = [
    { canal: "Visita", monto: 12500 },
    { canal: "Llamada", monto: 22300 },
    { canal: "Correo", monto: 15700 },
    { canal: "Jurídico", monto: 9800 },
    { canal: "Automático", monto: 7400 }
  ];

  const barrasGestor = [
    { gestor: "C. Méndez", pagos: 34, recuperado: 21000 },
    { gestor: "A. Torres", pagos: 26, recuperado: 15400 },
    { gestor: "J. Morales", pagos: 41, recuperado: 28750 },
    { gestor: "L. Castillo", pagos: 18, recuperado: 10250 },
    { gestor: "P. Herrera", pagos: 37, recuperado: 23300 }
  ];

  // Radial (tacómetro) – efectividad global (porcentaje)
  const efectividad = 78; // %
  const radialData = [{ name: "Efectividad", value: efectividad, fill: "#426FE4" }];

  // Tabla: resumen de módulos (demo)
  const resumenTabla = [
    { modulo: "Asignación de deudas", pendientes: 58, enCurso: 23, finalizadas: 120 },
    { modulo: "Acciones de cobranza", pendientes: 33, enCurso: 12, finalizadas: 85 },
    { modulo: "Cuentas en mora", pendientes: 45, enCurso: 14, finalizadas: 30 },
    { modulo: "Control de pagos", pendientes: 9, enCurso: 6, finalizadas: 120 }
  ];

  useEffect(() => {
    loadTotalDeudas();
    loadTotalPagos();
    loadDistMoras();
  }, []);

  return (
    <div className="content">
      {/* Header */}
      <div className="content-header" style={{ justifyContent: "space-between" }}>
        <h2>Dashboard General</h2>
        <button className="btn-primary" onClick={() => openExport("Recaudación")}>
          Generar reportes
        </button>
      </div>

      {/* KPIs principales en 3 columnas */}
      <div className="kpi-container">
        <div className="kpi blue">
          <div className="kpi-title">Total Deudas</div>
          <div className="kpi-value">{totalDeudas ? (new Intl.NumberFormat('es-GT', {
  style: 'currency',
  currency: 'GTQ'
}).format(totalDeudas)) : ""}</div>
        </div>
        <div className="kpi purple">
          <div className="kpi-title">Acciones Pendientes</div>
          <div className="kpi-value">58</div>
        </div>
        <div className="kpi green">
          <div className="kpi-title">Pagos Registrados</div>
          <div className="kpi-value">{totalPagoss}</div>
        </div>
      </div>

      {/* Resumen en dos columnas */}
      <div className="grid-2">
        {/* Pie de moras */}
        <div className="card-dash">
          <div className="card-dash-header">
            <h3>Distribución de mora</h3>
            <button className="btn-secondary" onClick={() => openExport("Moras")}>Exportar</button>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieMoras}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {pieMoras.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tacómetro efectividad */}
        <div className="card-dash">
          <div className="card-dash-header">
            <h3>Efectividad global</h3>
            <button className="btn-secondary" onClick={() => openExport("Efectividad recaudada")}>Exportar</button>
          </div>
          <div style={{ height: 300, position: "relative" }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="70%"
                outerRadius="100%"
                startAngle={180}
                endAngle={0}
                data={radialData}
              >
                <RadialBar dataKey="value" cornerRadius={8} />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-20%)", textAlign: "center" }}>
              <div style={{ fontSize: 14, opacity: 0.8 }}>Efectividad</div>
              <div style={{ fontSize: 28, fontWeight: "bold" }}>{efectividad}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Barras de pagos por canal */}
      <div className="card-dash">
        <div className="card-dash-header">
          <h3>Pagos por canal (Q)</h3>
          <button className="btn-secondary" onClick={() => openExport("Pagos recibidos")}>Exportar</button>
        </div>
        <div style={{ height: 320 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barrasCanalesPago}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="canal" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="monto" name="Monto recuperado" fill="#426FE4" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Barras por gestor */}
      <div className="card-dash">
        <div className="card-dash-header">
          <h3>Desempeño por gestor</h3>
          <button className="btn-secondary" onClick={() => openExport("Recuperado por gestor")}>Exportar</button>
        </div>
        <div style={{ height: 340 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barrasGestor}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="gestor" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pagos" name="# Pagos" fill="#E3A43D" />
              <Bar dataKey="recuperado" name="Q Recuperado" fill="#27AE60" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de resumen de módulos */}
      <div className="card-dash table-wrapper">
        <div className="card-dash-header">
          <h3>Resumen general de módulos</h3>
          <button className="btn-secondary" onClick={() => openExport("Recaudación")}>Exportar</button>
        </div>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Módulo</th>
                <th>Pendientes</th>
                <th>En curso</th>
                <th>Finalizadas</th>
              </tr>
            </thead>
            <tbody>
              {resumenTabla.map((r, i) => (
                <tr key={i}>
                  <td>{r.modulo}</td>
                  <td>{r.pendientes}</td>
                  <td>{r.enCurso}</td>
                  <td>{r.finalizadas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Reportes */}
      {showReportModal && (
        <div className="modal-overlay">
          <div className="modal" style={{ maxWidth: 520 }}>
            <h3>Generar reportes</h3>

            <label>Tipo de reporte</label>
            <select value={selectedReport} onChange={(e) => setSelectedReport(e.target.value)}>
              {REPORT_TYPES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>

            <label>Metrización de tiempos</label>
            <select value={timeMetric} onChange={(e) => setTimeMetric(e.target.value)}>
              <option>Últimos 7 días</option>
              <option>Últimos 30 días</option>
              <option>Este mes</option>
              <option>Mes anterior</option>
              <option>Personalizado</option>
            </select>

            {timeMetric === "Personalizado" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div>
                  <label>Desde</label>
                  <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                </div>
                <div>
                  <label>Hasta</label>
                  <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                </div>
              </div>
            )}

            <div className="modal-actions" style={{ justifyContent: "space-between" }}>
              {!readyToDownload ? (
                <>
                  <button className="btn-primary" onClick={() => setReadyToDownload(true)}>Generar</button>
                  <button className="btn-danger" onClick={() => setShowReportModal(false)}>Cancelar</button>
                </>
              ) : (
                <>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn-primary">Descargar Excel</button>
                    <button className="btn-secondary">Descargar PDF</button>
                  </div>
                  <button className="btn-danger" onClick={() => setShowReportModal(false)}>Cerrar</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;

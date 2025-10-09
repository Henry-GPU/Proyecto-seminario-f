import React, { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";

export default function CuentasMoraView() {
  // Estado para filtros
  const [filtroAntiguedad, setFiltroAntiguedad] = useState("Todos");
  const [filtroMonto, setFiltroMonto] = useState("Todos");

  // Datos base
  const cuentas = [
    { cliente: "Luis Ramírez", monto: 1200, dias: 15, estado: "Moroso" },
    { cliente: "María Gómez", monto: 3400, dias: 45, estado: "Morosisimo" },
    { cliente: "Pedro Castillo", monto: 2000, dias: 28, estado: "Solvente" },
    { cliente: "Ana Torres", monto: 4300, dias: 60, estado: "Morosisimo" },
    { cliente: "Jorge Pérez", monto: 1800, dias: 10, estado: "Moroso" },
    { cliente: "Lucía Hernández", monto: 5700, dias: 75, estado: "Morosisimo" },
    { cliente: "Carlos Ruiz", monto: 2500, dias: 20, estado: "Solvente" },
    { cliente: "Gabriela López", monto: 3900, dias: 35, estado: "Moroso" }
  ];

  // Datos del gráfico
  const evolucionMora = [
    { mes: "Enero", solventes: 8000, morosos: 1200, morosisimos: 300 },
    { mes: "Febrero", solventes: 8500, morosos: 1800, morosisimos: 500 },
    { mes: "Marzo", solventes: 9000, morosos: 1500, morosisimos: 400 },
    { mes: "Abril", solventes: 8700, morosos: 2100, morosisimos: 700 },
    { mes: "Mayo", solventes: 9500, morosos: 2300, morosisimos: 800 },
    { mes: "Junio", solventes: 9200, morosos: 2000, morosisimos: 750 },
    { mes: "Julio", solventes: 9800, morosos: 2600, morosisimos: 900 },
    { mes: "Agosto", solventes: 9300, morosos: 2200, morosisimos: 650 }
  ];

  // Aplicar filtros
  const cuentasFiltradas = cuentas.filter((c) => {
    let pasa = true;

    // Filtro antigüedad
    if (filtroAntiguedad !== "Todos" && c.estado !== filtroAntiguedad) {
      pasa = false;
    }

    // Filtro monto
    if (filtroMonto !== "Todos") {
      if (filtroMonto === "0-2000" && !(c.monto <= 2000)) pasa = false;
      if (filtroMonto === "2001-4000" && !(c.monto > 2000 && c.monto <= 4000)) pasa = false;
      if (filtroMonto === "4001+" && !(c.monto > 4000)) pasa = false;
    }

    return pasa;
  });

  return (
    <div className="content">
      {/* Header */}
      <div className="content-header">
        <h2>Cuentas en Mora</h2>
      </div>

      {/* KPIs */}
      <div className="kpi-container">
        <div className="kpi red">
          <h3>Total en Mora</h3>
          <p>Q 8,500</p>
        </div>
        <div className="kpi blue">
          <h3>Clientes Afectados</h3>
          <p>{cuentasFiltradas.length}</p>
        </div>
        <div className="kpi yellow">
          <h3>Días Promedio de Mora</h3>
          <p>32 días</p>
        </div>
      </div>

      {/* Tabla con filtros */}
      <div className="card table-wrapper">
        <div className="content-header" style={{ justifyContent: "space-between" }}>
          <h3>Listado de Cuentas en Mora</h3>
          <div>
            <select
              className="dropdown"
              value={filtroAntiguedad}
              onChange={(e) => setFiltroAntiguedad(e.target.value)}
            >
              <option value="Todos">Filtro por antigüedad</option>
              <option value="Solvente">Solvente</option>
              <option value="Moroso">Moroso</option>
              <option value="Morosisimo">Morosísimo</option>
            </select>

            <select
              className="dropdown"
              value={filtroMonto}
              onChange={(e) => setFiltroMonto(e.target.value)}
              style={{ marginLeft: "10px" }}
            >
              <option value="Todos">Filtro por monto</option>
              <option value="0-2000">0 - 2000</option>
              <option value="2001-4000">2001 - 4000</option>
              <option value="4001+">4001+</option>
            </select>
          </div>
        </div>

        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Días de Mora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {cuentasFiltradas.map((c, i) => (
                <tr key={i}>
                  <td>{c.cliente}</td>
                  <td>Q {c.monto}</td>
                  <td>{c.dias}</td>
                  <td>
                    <span
                      className={`badge ${
                        c.estado === "Solvente"
                          ? "green"
                          : c.estado === "Moroso"
                          ? "yellow"
                          : "red"
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

      {/* Gráfico */}
      <div className="card">
        <h3>Evolución de la Mora (Mensual por Niveles)</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={evolucionMora}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="solventes" fill="#27AE60" name="Solventes" />
            <Bar dataKey="morosos" fill="#F1C40F" name="Morosos" />
            <Bar dataKey="morosisimos" fill="#E74C3C" name="Morosísimos" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Reporte */}
      <div className="card">
        <h3>Reporte por Nivel de Mora</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Nivel</th>
              <th>Cantidad de Clientes</th>
              <th>Monto Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span className="badge green">Solventes</span></td>
              <td>120</td>
              <td>Q 0</td>
            </tr>
            <tr>
              <td><span className="badge yellow">Morosos</span></td>
              <td>65</td>
              <td>Q 18,500</td>
            </tr>
            <tr>
              <td><span className="badge red">Morosísimos</span></td>
              <td>20</td>
              <td>Q 32,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

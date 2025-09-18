import React from "react";

function DebtTable() {
  const data = [
    { cliente: "Juan Pérez", monto: "Q 1,200", fecha: "2025-08-20", estado: "Solvente", accion: "Asignar" },
    { cliente: "María López", monto: "Q 850", fecha: "2025-08-18", estado: "Moroso", accion: "Asignar" },
    { cliente: "Carlos Ruíz", monto: "Q 3,100", fecha: "2025-09-01", estado: "Morosisimo", accion: "Reasignar" },
    { cliente: "Ana Díaz", monto: "Q 500", fecha: "2025-08-25", estado: "Morosisimo", accion: "Ver" },
  ];

  return (
    <div className="debt-table">
      <h2>Cuentas detectadas en mora</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.cliente}</td>
              <td>{row.monto}</td>
              <td>{row.fecha}</td>
              <td>
                <span className={`estado ${row.estado.toLowerCase()}`}>{row.estado}</span>
              </td>
              <td>
                <button className="btn-secondary">{row.accion}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DebtTable;

import React from "react";

const Sidebar = ({ setView }) => {
  return (
    <div className="w-64 h-screen bg-gradient-to-b from-blue-600 to-blue-400 text-white p-6">
      <h2 className="text-2xl font-bold mb-8">Cobranza+</h2>
      <ul className="space-y-4">
        <li>
          <button onClick={() => setView("dashboard")} className="hover:underline">
            Dashboard
          </button>
        </li>
        <li>
          <button onClick={() => setView("debt")} className="hover:underline">
            Asignación de Deudas
          </button>
        </li>
        <li>
          <button onClick={() => setView("actions")} className="hover:underline">
            Acciones de Cobranza
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

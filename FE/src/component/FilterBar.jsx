import React from "react";

function FilterBar() {
  return (
    <div className="filter-bar">
      <input type="text" placeholder="Buscar cliente, acción o responsable..." />
      <button className="btn-secondary">Filtrar</button>
    </div>
  );
}

export default FilterBar;

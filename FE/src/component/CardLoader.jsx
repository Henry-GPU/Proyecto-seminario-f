import React from "react";
import "../stylesheet/CardLoader.css";

function CardLoader({ isLoading }) {
  return (
    <div className={`modal-container  ${isLoading ? "visible" : "hidden"}`}>
      <div className={`card`}>
        <div className="card-loader-spinner"></div>
        <p>Cargando...</p>
      </div>
    </div>
    
  );
}

export default CardLoader;

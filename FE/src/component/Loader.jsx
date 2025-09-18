import React, { useState, useEffect } from "react";
import "../stylesheet/Loader.css";

function Loader({ isLoading }) {
  return (
    <div className={`loader-overlay ${isLoading ? "visible" : "hidden"}`}>
      <div className="loader-spinner"></div>
      <p>Cargando...</p>
    </div>
  );
}

export default Loader;

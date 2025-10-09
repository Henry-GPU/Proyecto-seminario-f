import React from "react";
import "../stylesheet/SvgWithInfo.css"; // Asegúrate de tener el archivo CSS importado

function SvgWithInfo({ svgPath, info, fill }) {
  return (
    <div className="relative svg-container group">

      <svg
        className={`${fill}`}
        height="24px"
        width="24px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
      >
        <path d={svgPath} />
      </svg>

      <div className="absolute bottom-0 p-2 text-white transition-opacity transform -translate-x-1/2 bg-gray-800 rounded-md opacity-0 info-tooltip left-1/2 group-hover:opacity-100">
        {info}
      </div>
    </div>
  );
}

export default SvgWithInfo;

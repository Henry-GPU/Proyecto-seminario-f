import React, { useEffect, useState } from "react";

const CascadeSelect = ({ selects, formik }) => {
  const [opciones, setOpciones] = useState({});

  useEffect(() => {
    const actualizarOpciones = () => {
      const nuevasOpciones = {};

      // Iteramos sobre los selects y actualizamos las opciones dependiendo de su dependencia
      selects.forEach((select, index) => {
        if (index === 0) {
          nuevasOpciones[select.name] = select.getOptions();
        } else {
          const dependeDe = selects[index - 1].name;
          const valorPadre = formik.values[dependeDe];

          if (valorPadre) {
            nuevasOpciones[select.name] = select.getOptions(valorPadre);
          } else {
            nuevasOpciones[select.name] = [];
          }
        }
      });

      setOpciones(nuevasOpciones);
    };

    actualizarOpciones();
  }, [formik.values, selects]); // Dependemos de `formik.values` y `selects`

  return (
    <>
      {selects.map((select, index) => (
        <div className="mb-4" key={select.name}>
          <label htmlFor={select.name} className="block mb-1 text-sm font-semibold text-neutral-700">
            {select.label}:
          </label>
          <select
            id={select.name}
            name={select.name}
            className="w-full pt-2 pb-2 pl-1 text-sm bg-gray-100 rounded text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={formik.handleChange}
            value={formik.values[select.name]}
            disabled={index !== 0 && !formik.values[selects[index - 1].name]}
          >
            <option value="">Selecciona una opción</option>
            {(opciones[select.name] || []).map((op, i) => (
              <option key={i} value={op.valor}>{op.label}</option>
            ))}
          </select>
          {formik.touched[select.name] && formik.errors[select.name] && (
            <p className="mt-1 text-xs text-red-500">{formik.errors[select.name]}</p>
          )}
        </div>
      ))}
    </>
  );
};

export default CascadeSelect;

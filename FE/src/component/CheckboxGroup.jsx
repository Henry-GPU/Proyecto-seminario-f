import React, { useEffect } from 'react';

const CheckboxGroup = ({ items, name, formik, title }) => {
  const selectedItems = formik.values[name] || [];

  const allSelected = items.length > 0 && selectedItems.length === items.length;

  const handleCheckboxChange = (value) => {
    if (selectedItems.includes(value)) {
      formik.setFieldValue(name, selectedItems.filter((v) => v !== value));
    } else {
      formik.setFieldValue(name, [...selectedItems, value]);
    }
  };

  const handleSelectAllChange = () => {
    if (allSelected) {
      formik.setFieldValue(name, []);
    } else {
      formik.setFieldValue(name, items.map((item) => item.id));
    }    
  };

  useEffect(() => {
    if (!formik.values[name]) {
      formik.setFieldValue(name, []);
    }
  }, [formik, name]);

  return (
    <div className="checkbox-group">
      <div className='flex justify-between'>
      <label className="block mb-2 font-bold">{title}</label>
      <div className="mb-2 text-right">
        <label>
          <input
            type="checkbox"
            checked={allSelected}
            onChange={handleSelectAllChange}
          />{" "}
          Seleccionar todos
        </label>
      </div>       
      </div>

      {items.map((item) => (
        <div key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={selectedItems.includes(item.id)}
              onChange={() => handleCheckboxChange(item.id)}
            />{" "}
            {item.visibleName}
          </label>
        </div>
      ))}

      {formik.errors[name] && (
        <p className="mt-1 text-sm text-red-500">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default CheckboxGroup;

import React from 'react';

const ListSelect = ({ list, value, name, onChange }) => (
  <div>
    <label htmlFor={name}>{name}</label>
    <select name={name} value={value} onChange={onChange}>
      {list.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  </div>
);

export default ListSelect;

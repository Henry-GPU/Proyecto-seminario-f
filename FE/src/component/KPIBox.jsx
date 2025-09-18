import React from "react";

const KPIBox = ({ title, value, color }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 w-40 text-center">
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
};

export default KPIBox;

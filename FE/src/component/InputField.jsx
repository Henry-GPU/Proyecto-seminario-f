 const InputField = ({ label, name, type, formik }) => (
  <div className="mb-4">
    <label className="block mb-1 text-sm font-semibold text-neutral-700">{label}</label>
    <input
      name={name}
      type={type}
      className="w-full p-2 text-sm bg-gray-100 rounded text-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={formik.values[name]}
      onChange={formik.handleChange}
    />
    {formik.errors[name] && <p className="mt-1 text-xs text-red-500">{formik.errors[name]}</p>}
  </div>
);

export default InputField;

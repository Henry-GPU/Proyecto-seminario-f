import React from 'react';
import { useFormik } from 'formik';

const Form = ({ initialValues, validate, message, error, onSubmit, children, textButton, onCancel }) => {
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form-card">
      {typeof children === 'function' ? children(formik) : children}
      <div className='items-center form-footer'>
        {error && <p className="w-full text-xs text-red-500 w-mt-1">{error}</p>}
        {(!error && message) && <p className="w-full text-xs text-blue-500 w-mt-1">{message}</p>}
        <button
          className="btn cancel"
          onClick={onCancel}
          type='button'
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="btn accept"
        >
          {textButton}
        </button>

      </div>
      
    </form>
  );
};

export default Form;

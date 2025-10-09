import React, {useState } from "react";
import Form from '../component/Form';
import { useNavigate } from 'react-router-dom';
import { createUser } from "../services/userService";
import InputField from "../component/InputField";
const CreateUserPage = () => {
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  
  const initialValues = {
    username: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    setError(null);
    setMessage(null);
    if (!values.username) errors.username = 'Requerido';
    else if(!/^[a-zA-Z0-9]+$/.test(values.username))
      errors.username = 'Nombre de usuario inválido (use solo letras y números)'
    if(!values.phone) errors.phone = 'Requerido';
    else if(!/^\d{8}$/.test(values.phone))
      errors.phone = 'Número de teléfono inválido'
    if (!values.name) errors.name = 'Requerido';
    if (!values.email) errors.email = 'Requerido';
    else if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(values.email))
      errors.email = 'email inválido';

    if (!values.password) errors.password = 'Requerida';
    else if (values.password.length < 6)
      errors.password = 'Debe tener al menos 6 caracteres';

    if (values.password !== values.confirmPassword)
      errors.confirmPassword = 'Las contraseñas no coinciden';

    return errors;
  };


  const handleSubmit = async (values) => {
    setError(null);
    setMessage(null);
    
    const data = {
      fullName: values.name,
      username: values.username,
      phone: values.phone,
      email: values.email,
      password: values.password
    }
    try {
      const response = await createUser(data);
      setMessage("Usuario creado exitosamente");
      navigate(`/home/usuarios/${response}/permisos`);
    } catch (error) {
      setError(error.message);
    }
  };
  const handleCancel = () => {
    navigate('/home/usuarios');
  };

  return (
    <div className="form-main-container">
      <Form
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        textButton={"Crear"}
        error={error}
        message={message}
      >
        {(formik) => (
          <>
            <InputField label="Nombre de usuario" name="username" formik={formik} type="text" />
            <InputField label="Nombre" name="name" formik={formik} type="text"/>
            <InputField label="Teléfono" name="phone" formik={formik} type="tel" />
            <InputField label="Email" name="email" formik={formik} type="email" />
            <InputField label="Contraseña" name="password" formik={formik} type="password" />
            <InputField label="Confirmar contraseña" name="confirmPassword" formik={formik} type="password" />
          </>
        )}
      </Form>
      
    </div>

  );
};

export default CreateUserPage;

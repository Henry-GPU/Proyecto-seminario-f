import React, { useState, useEffect } from "react";
import CascadeSelect from "../component/CascadeSelect";
import { useFormik } from 'formik';

const ProductForm = () => {
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);

  // Valores seleccionados
  const [values, setValues] = useState({
    categoria: "",
    marca: "",
    modelo: ""
  });

  // Función para cargar las categorías desde una API (simulada aquí)
  const loadCategorias = async () => {
    const data = [
      { label: "Electrónica", valor: "electronica" },
      { label: "Ropa", valor: "ropa" },
    ];
    setCategorias(data);
  };

  // Función para cargar las marcas según la categoría seleccionada
  const loadMarcas = async (categoria) => {
    const data = {
      electronica: [
        { label: "Samsung", valor: "samsung" },
        { label: "Apple", valor: "apple" },
      ],
      ropa: [
        { label: "Nike", valor: "nike" },
        { label: "Adidas", valor: "adidas" },
      ],
    };
    setMarcas(data[categoria] || []);
  };

  // Función para cargar los modelos según la marca seleccionada
  const loadModelos = async (marca) => {
    const data = {
      samsung: [
        { label: "Galaxy S21", valor: "s21" },
        { label: "Galaxy A52", valor: "a52" },
      ],
      apple: [
        { label: "iPhone 13", valor: "iphone13" },
        { label: "iPhone SE", valor: "iphonese" },
      ],
      nike: [
        { label: "Air Max", valor: "airmax" },
      ],
      adidas: [
        { label: "Ultraboost", valor: "ultraboost" },
      ],
    };
    setModelos(data[marca] || []);
  };

  // Cargar las categorías al inicio
  useEffect(() => {
    loadCategorias();
  }, []);

  // Cargar las marcas cuando se selecciona una categoría
  useEffect(() => {
    if (values.categoria) {
      loadMarcas(values.categoria);
    } else {
      setMarcas([]); // Limpiar las marcas si no hay categoría seleccionada
    }
  }, [values.categoria]);

  // Cargar los modelos cuando se selecciona una marca
  useEffect(() => {
    if (values.marca) {
      loadModelos(values.marca);
    } else {
      setModelos([]); // Limpiar los modelos si no hay marca seleccionada
    }
  }, [values.marca]);

  const formik = useFormik({
    initialValues: values,
    onSubmit: (values) => {
      console.log("Formulario enviado con los valores: ", values);
    },
    enableReinitialize: true, // Permitir reiniciar valores
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <CascadeSelect
        selects={[
          {
            label: "Categoría",
            name: "categoria",
            getOptions: () => categorias,
          },
          {
            label: "Marca",
            name: "marca",
            getOptions: (categoria) => marcas,
          },
          {
            label: "Modelo",
            name: "modelo",
            getOptions: (marca) => modelos,
          },
        ]}
        formik={formik}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default ProductForm;

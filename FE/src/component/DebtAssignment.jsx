import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from "recharts";
import { getTotalCustomers, getTotalClientesConDeudas } from "../services/customerService";
import { getAllDebtAssignments, createDebtAssignment, getCollections } from "../services/DebtAssigmentService";
import { getUsers } from "../services/userService";
import { getCustomersWithDebtsAndNotCollection } from "../services/customerService";
import { getMontoPorCanal } from "../services/cobranzaService";

const DebtAssignment = () => {
  const [showModal, setShowModal] = useState(false);
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalClientesConDeudas, setTotalClientesConDeudas] = useState(0);
  const [clientes, setClientes] = useState([]);
  const [montosPorCanal, setMontosPorCanal] = useState([]);
  const [collections, setCollections] = useState([]);
  const [cliente, setCliente] = useState(0);
  const [collection, setCollection] = useState(0);
  const [usuarios, setUsuarios] = useState([]); 
  const [usuario, setUsuario] = useState(0);
  const [debtAssignments, setDebtAssignments] = useState([]);



  const loadTotalClientes = async () => {
    try {
      getTotalCustomers().then((res)=>{
        setTotalClientes(res);
      });
    } catch (error) {
      
    }
  }

  const loadCollections = async () => {
    try {
        getCollections().then((res)=>{
        setCollections(res.data);
      });
    } catch (error) {
      
    }
  };

  const saveDebtAssignment = async () => {
    try {
      const data = {
        idDeuda: cliente,
        idUsuario: usuario,
        idCobranza: collection,
        descripcion: "Asignación desde el módulo",
      };
      console.log(data);
      await createDebtAssignment(data);
      setShowModal(false);
      loadAllDebtAssigmnets(); // Recargar las asignaciones de deuda después de guardar
    } catch (error) {
      console.error("Error al guardar la asignación de deuda:", error);
    }
  };

  const loadUsers = async () => {
    try {
      getUsers().then((res)=>{  
        setUsuarios(res.data);
      });
    } catch (error) {
      
    }
  }

  const loadCustomers = async () => {
    try {
      getCustomersWithDebtsAndNotCollection().then((res)=>{    
        setClientes(res.data);
      }
      );
    }
    catch (error) {  
    }
  } 


  const loadAllDebtAssigmnets = async () => { 
    try {
      getAllDebtAssignments().then((res)=>{
        setDebtAssignments(res.data);
      });
    } catch (error) {
      
    }
  }
  
  const loadMontosPorCanal = async () => {
    try {
      getMontoPorCanal().then((res)=>{
        setMontosPorCanal(res.data);
      });
    } catch (error) {
      
    }
  }
  const loadClientesConDeudas = async () => {
    try {
      getTotalClientesConDeudas().then((res)=>{
        setTotalClientesConDeudas(res);
      });
    } catch (error) {
      
    }
  }

  useEffect(() => { 
    loadTotalClientes();
    loadClientesConDeudas();
    loadAllDebtAssigmnets();
    loadUsers();
    loadCustomers();
    loadMontosPorCanal();
    loadCollections();
  }, []);

  // Datos para el gráfico: total por canal y número de clientes por canal

  const chartData = Object.values(montosPorCanal);

  return (
    <div className="content">
      {/* Header */}
      <div className="content-header">
        <h2>Asignación de Deudas</h2>
        <button className="btn-primary" onClick={() => setShowModal(true)}>Asignar Deuda</button>
      </div>

      {/* KPIs en 3 columnas */}
      <div className="kpi-container">
        <div className="kpi blue">
          <h3>Total de Clientes</h3>
          <p>{totalClientes?.data}</p>
        </div>
        <div className="kpi blue">
          <h3>Clientes con Deuda Asignada</h3>
          <p>{totalClientesConDeudas?.data}</p>
        </div>
        <div className="kpi blue">
          <h3>Clientes por Asignar</h3>
          <p>{totalClientes?.data - totalClientesConDeudas?.data}</p>
        </div>
      </div>

      {/* Tabla con scroll */}
      <div className="card-dash mb-4 table-wrapper">
        <h3>Listado de Deudas</h3>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Usuario</th>
                <th>Canal de Cobranza</th>
              </tr>
            </thead>
            <tbody>
              {debtAssignments.map((d, i) => (
                <tr key={i}>
                  <td>{d?.nombreCliente}</td>
                  <td>Q {d?.monto.toLocaleString()}</td>
                  <td>{d?.fechaDeuda}</td>
                  <td>
                    <span className={`badge

                      ${d?.usuarioAsignado ? "green" : ""}
                    `}>
                      {d?.usuarioAsignado ? "Asignada" : "Pendiente"}
                    </span>
                  </td>
                  <td>{d?.usuarioAsignado}</td>
                  <td>{d?.canalCobranza}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulario y Gráfico en dos columnas */}


        {/* 📊 Gráfico: monto total y # clientes por canal */}
        <div className="card-dash mb-4">
          <h3>Monto total y clientes por canal</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="canal" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalMonto" fill="#426FE4" name="Monto Total (Q)" />
            </BarChart>
          </ResponsiveContainer>
        </div>


      {/* 📊 Reporte adicional (lo que ya tenías) */}
      <div className="card-dash mb-4">
        <h3>Reporte General de Cobranza</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Canal de Cobranza</th>
              <th>Clientes Asignados</th>
              <th>Monto Total</th>
              <th>Cuentas Cobradas</th>
              <th>Cuentas Pendientes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Visita Domiciliar</td>
              <td>25</td>
              <td>Q 12,500</td>
              <td>10</td>
              <td>15</td>
            </tr>
            <tr>
              <td>Llamada Telefónica</td>
              <td>40</td>
              <td>Q 22,300</td>
              <td>20</td>
              <td>20</td>
            </tr>
            <tr>
              <td>Correo Electrónico</td>
              <td>30</td>
              <td>Q 15,700</td>
              <td>18</td>
              <td>12</td>
            </tr>
            <tr>
              <td>Cobro Jurídico</td>
              <td>12</td>
              <td>Q 9,800</td>
              <td>5</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Automático</td>
              <td>18</td>
              <td>Q 7,400</td>
              <td>12</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modal (sin cambios) */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Nueva Asignación de Deuda</h3>
            <select id="cliente" value={cliente} onChange={(e) => setCliente(e.target.value)}>
              <option value="0">Seleccionar Cliente</option>
              {clientes?.map((u) => (
                <option key={u.id} value={u.id}>{u.nombres + " " + u.apellidos}</option>
              ))}
            </select>
            <select id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)}>
              <option value="0">Seleccionar Usuario</option>
              {usuarios?.map((u) => (
                <option key={u.id} value={u.id}>{u.fullName}</option>
              ))}
            </select>
            <select id="collection" value={collection} onChange={(e) => setCollection(e.target.value)}>
              <option value="0">Seleccionar Canal de Cobranza</option>
              {collections?.map((u) => (
                <option key={u.id} value={u.id}>{u.nombre}</option>
              ))}
            </select>
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => saveDebtAssignment()}>Guardar</button>
              <button className="btn-danger" onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebtAssignment;

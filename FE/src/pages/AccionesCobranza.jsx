import { useEffect, useState } from "react";
import { getAllCollectionActions } from "../services/cobranzaService";

function AccionesCobranzaPage() {
  const [collectionActions, setCollectionActions] = useState([]);
  const [collectionAction, setCollectionAction] = useState(0);

    const loadAllCollectionActions = async () => { 
      try {
        getAllCollectionActions().then((res)=>{
          setCollectionActions(res.data);
        });
      } catch (error) {
        
      }
    }
  useEffect(() => {
    loadAllCollectionActions();
   }, []);
    // Aquí puedes cargar las acciones de cobranza desde una API o servicio
  return (
<>
<div className="card-dash mb-4 table-wrapper">
        <h3>Registro de Acciones de Cobranza</h3>
        <div className="table-scroll">
          <table className="table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Accion</th>
                <th>Deuda</th>
                <th>Cliente</th>
                <th>Fecha</th>
              </tr>
            </thead>
            <tbody>
              {collectionActions.map((d, i) => (
                <tr key={i}>
                  <td>{d?.usuario}</td>
                  <td>{d?.accion}</td>
                  <td>{d?.idDeuda}</td>
                  <td>{d?.cliente}</td>
                  <td>{d?.fecha}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
  );
}

export default AccionesCobranzaPage;
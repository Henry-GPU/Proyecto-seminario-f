import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckboxGroup from "../component/CheckboxGroup";
import Form from "../component/Form";
import { loadPermissions, loadUserPermissions, updatePermissions } from "../services/permissionService";
import { useNavigate } from 'react-router-dom';


const ManagePermissionsPage = () => {
   const navigate = useNavigate();
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);
  const [initialValues, setInitialValues] = useState({});

  
  const groupPermissionsByType = (permissions) => {
    return permissions.reduce((acc, permission) => {
      const type = permission.type;
      if (!acc[type]) acc[type] = [];
      acc[type].push(permission);
      return acc;
    }, {});
  };
  
  const grouped = groupPermissionsByType(permissions);

  const loadResources = async () => {
    try {
      const allPermissions = await loadPermissions();
      const assigned = await loadUserPermissions(id);
      const assignedIds = assigned.map(p => p.id);
  
      setPermissions(allPermissions);
      setUserPermissions(assignedIds);
  
      const grouped = groupPermissionsByType(allPermissions);
      const values = Object.keys(grouped).reduce((acc, key) => {
        acc[key.toLowerCase()] = grouped[key]
          .filter(p => assignedIds.includes(p.id))
          .map(p => p.id);
        return acc;
      }, {});
      setInitialValues(values);
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleCancel = () =>{
    navigate("/home/usuarios")
  }
  
  const validate = (values) => {
  };

  const handleSubmit = async (values) => {
    setError(null);
    setMessage(null);

    const data = {
      user: parseInt(id),
      permissions: Object.values(values).flat()
    }
    navigate('/home/usuarios');
    try {
      const response = await updatePermissions(data);
    } catch (error) {
      setError(error.message);
    }
    
  };

  useEffect(()=>{
    loadResources();
  },[])

  return (
    <div className="form-main-container">
      {Object.keys(initialValues).length > 0 && (
        <Form
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          textButton={"Aceptar"}
          error={error}
          message={message}
        >
          {(formik) => (
            <>
              {Object.entries(groupPermissionsByType(permissions)).map(([tipo, items]) => (
                <div key={tipo}>
                  <CheckboxGroup
                    title={tipo}
                    items={items}
                    name={tipo.toLowerCase()}
                    formik={formik}
                  />
                  <div className="w-full h-[1px] my-2 bg-neutral-200"></div>
                </div>
              ))}
            </>
          )}
        </Form>
      )}
    </div>
  );
}
export default ManagePermissionsPage;

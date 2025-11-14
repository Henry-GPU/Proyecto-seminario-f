import './App.css';
import url from './config/url';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './stylesheet/FormStyles.css';
import Navbar from './component/Navbar';
import useDeviceType from './hook/useDeviceType';
import MobileNavbar from './component/MobileNavbar';
import useWindowSize from './hook/useWindowSize';
import SignPage from './component/SignPage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import authUrl from './config/authUrl';
import '@fontsource/inter/300.css';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './component/ProtectedRoute';
import UsersDashboard from './component/UsersDashboard';
import AdminDashboard from './component/AdminDashboard';
import CustomersDashboard from './component/CustomersDashboard';
import Test from './pages/Test';
import ManagePermissionsPage from './pages/ManagePermissionsPage';
import CreateUserPage from './pages/CreateUserPage';
import { getUserPermissions, verifyToken } from './services/userService';
import { useAccToken } from './component/context/AccToken';
import { setAccessToken } from './services/tokenService';
import AsignacionDeudasPage from './pages/AsignacionDeudasPage';
import CuentasMoraPage from './pages/CuentasMoraPage';
import AccionesCobranzaPage from './pages/AccionesCobranza';
import DashboardView from './component/DashboardViewx';
import DebtAssignment from './component/DebtAssignment';
import RegistroPago from './component/RegistroPago';
import PagosVencidos from './component/PagosVencidos';
import CrearDeuda from './component/CrearDeuda';

function App() {
  const { accessToken } = useAccToken();
  const token = accessToken;
  const { isDesktop } = useDeviceType();
  const { width } = useWindowSize();
  const [isAuth, setIsAuth] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);

  const getPermissions = async () => {
    try {
      const decoded = jwtDecode(token);
      console.log(decoded?.sub);
      const response = await getUserPermissions(decoded?.sub);
      console.log(response.data);
      setUserName(decoded?.sub);
      setPermissions(response.data);
      setIsAuth(true);
    } catch (error) {
      if (error.response?.status === 401) {
      } else {
        console.error('Error:', error);
        const response = await axios.post(`${authUrl}/auth/logout`, {}, {withCredentials: true});
			  window.location.href = "/login";	
      }
      setIsAuth(false);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (token) {
      setAccessToken(token);
      getPermissions();
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <BrowserRouter>
      <MainContent 
        isAuth={isAuth}
        userName={userName}
        permissions={permissions}
        setIsAuth={setIsAuth}
        isDesktop={isDesktop}
        width={width}
        loading={loading}
        setLoading={(e) => setLoading(e)}
      />
    </BrowserRouter>
  );
}

function MainContent({ userName, isAuth, setIsAuth, width, permissions, loading, setLoading}) {
  const location = useLocation();
  const {accessToken} = useAccToken();
  const token = accessToken;
  useEffect(() => {
    if (token != null) {
    }else{
      setIsAuth(false);
      setLoading(false);
    }
  }, [location.pathname]);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="app-container">
      {(width > 768) && isAuth ? <div className='nav-placeholder'></div> : ''}
      {isAuth ? (<Navbar permissions={permissions}/>) : isAuth ? <MobileNavbar /> : ''}
      {(width < 768 && isAuth) && <MobileNavbar />}
      <div className="main-content">
          <Routes>
            <Route  
              path='/login' 
              element={isAuth 
                ? <Navigate to="/"/> 
                : <SignPage/>
              }
            />
            <Route  
              path='/' 
              element={    
                <ProtectedRoute isAuth={isAuth} permissions={permissions} allowedPermission={''}>
                  <Navigate to="/home"/> 
                </ProtectedRoute>
              }
            />
            <Route 
              path='/asignacion-deudas' 
              element={
                <ProtectedRoute isAuth={isAuth} permissions={permissions} allowedPermission={''}>
                  <DebtAssignment url={url} permissions={permissions} allowedPermission={''}/>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/cuentas-mora' 
              element={         
                <ProtectedRoute isAuth={isAuth} permissions={permissions} allowedPermission={'CREATE_SALE'}>
                  <CuentasMoraPage url={url}/>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/acciones-cobranza' 
              element={         
                <ProtectedRoute isAuth={isAuth} permissions={permissions} allowedPermission={'CREATE_SALE'}>
                  <AccionesCobranzaPage url={url}/>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/clientes' 
              element={
                <ProtectedRoute isAuth={isAuth} permissions={permissions} allowedPermission={'CREATE_SALE'}>
                  <CustomersDashboard url={url}/>
                </ProtectedRoute>
              }
            />
            <Route 
              path='/usuarios/crear' 
              element={
                <ProtectedRoute isAuth={isAuth} permissions={permissions}  allowedPermission={'MANAGE_USERS'}>
                  <CreateUserPage/>
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/usuarios' 
              element={
                <ProtectedRoute isAuth={isAuth} permissions={permissions}  allowedPermission={'MANAGE_USERS'}>
                  <UsersDashboard/>
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/home/clientes' 
              element={
                <ProtectedRoute isAuth={isAuth} permissions={permissions}  allowedPermission={'MANAGE_CUSTOMERS'}>
                  <CustomersDashboard/>
                </ProtectedRoute>
              } 
            />
            <Route 
              path='/home' 
              element={
                <ProtectedRoute isAuth={isAuth} permissions={permissions} allowedPermission={''}>
                  <DashboardView url={url} permissions={permissions}/> 
                </ProtectedRoute>
              } 
            />
            <Route
              path='/home/Pagos'
              element={
                <ProtectedRoute isAuth={isAuth} permissions={permissions} allowedPermission={'MANAGE_PERMISSIONS'}>
                  <RegistroPago url={url} permissions={permissions} allowedPermission={'MANAGE_PERMISSIONS'}/>
                </ProtectedRoute>
              }></Route>
            <Route
            path='/home/PagosVencidos'
            element={
              <ProtectedRoute isAuth={isAuth} permissions={permissions} allowedPermission={'MANAGE_PERMISSIONS'}>
                <PagosVencidos url={url} permissions={permissions} allowedPermission={'MANAGE_PERMISSIONS'}/>
              </ProtectedRoute>
            }
            ></Route>
            <Route
            path='/home/crear-deuda'
            element={
              <ProtectedRoute isAuth={isAuth} permissions={permissions} allowedPermission={'MANAGE_PERMISSIONS'}>
                <CrearDeuda url={url} permissions={permissions} allowedPermission={'MANAGE_PERMISSIONS'}/>
              </ProtectedRoute>
            }
            ></Route>
          </Routes>
        </div>
    </div>
  );
}

export default App;

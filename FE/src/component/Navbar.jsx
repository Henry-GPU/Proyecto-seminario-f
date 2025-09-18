import '../stylesheet/Navbar.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccToken } from './context/AccToken';
import { userLogout } from '../services/authService';
import axios from 'axios';
import authUrl from '../config/authUrl';

function Navbar({permissions}){
	const { accessToken } = useAccToken();
	const token = accessToken;	
  const [itemSelected, setItemSelected] = useState(0);
	const location = useLocation();
	const currentLocation = location.pathname.split("/")[1] || "inicio";
	
	useEffect(()=>{
		if(currentLocation === 'home'){
			setItemSelected(0);
		}
		else if(currentLocation === 'asignacion-deudas'){
			setItemSelected(1);
		}else if(currentLocation === 'cuentas-mora'){
			setItemSelected(2);
		}
		else if(currentLocation === 'acciones-cobranza'){
			setItemSelected(3);
		}
		else if(currentLocation === 'clientes'){
			setItemSelected(4);
		}
		else if(currentLocation === 'usuarios'){
			setItemSelected(4);
		}
	},[currentLocation]);
	

	const handleLogOut = async () =>{
		try {
			const response = await axios.post(`${authUrl}/auth/logout`, {}, {
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`,
				},
			withCredentials: true,
			});
			window.location.href = "/login";	
		} catch (error) {
			console.error("Error al enviar datos:", error);	
			console.error(error?.response?.data || error.message);		
		}

	}
    return(
		<div className='navbar-container'>
			<Link 
				to='/home' 
        className={
					`navbar-item ${
						itemSelected === 0 
						? 'navbar-item-selected' 
						: ''}`}
				onClick={()=>setItemSelected(0)}
			><p>Home</p></Link>
      <Link 
				to='/asignacion-deudas' 
				className={
					`navbar-item ${
						itemSelected === 1
						? 'navbar-item-selected' 
						: ''}`}
				onClick={()=>setItemSelected(1)}
			>Asignación de Deudas</Link>
      <Link 
				to='/cuentas-mora' 
				className={
					`navbar-item ${
						itemSelected === 2 
						? 'navbar-item-selected' 
						: ''}`}
				onClick={()=>setItemSelected(2)}
			>Cuentas en Mora</Link>
			<Link 
				to='/acciones-cobranza' 
				className={
					`navbar-item ${
						itemSelected === 3
						? 'navbar-item-selected' 
						: ''}`}
				onClick={()=>setItemSelected(3)}
			>Acciones de Cobranza</Link>
			<Link 
				to='/clientes' 
				className={
					`navbar-item ${
						itemSelected === 4
						? 'navbar-item-selected' 
						: ''}`}
				onClick={()=>setItemSelected(4)}
			>Clientes</Link>
			<Link 
				to='/usuarios' 
				className={
					`navbar-item ${
						itemSelected === 5
						? 'navbar-item-selected' 
						: ''}`}
				onClick={()=>setItemSelected(5)}
			>Usuarios</Link>
			<Link
				to="/login"
				className='navbar-item'
				onClick={handleLogOut}
			>Salir</Link>
    </div>
		)
}

export default Navbar;
import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../stylesheet/MobileNavbar.css';
import inventoryIcon from '../placeholder/inventoryIcon.svg';
import homeIcon from '../placeholder/home-icon.svg';

function MobileNavbar(){
    const [itemSelected, setItemSelected] = useState(0);

	const handleLogOut = () =>{
		localStorage.removeItem('authToken');
		window.location.href = "/login";
	}

    return(
		<div className='mobile-navbar-container'>
      <Link 
				to='/' 
        className={
					`mobile-navbar-item ${
						itemSelected === 0 
						? 'mobile-navbar-item-selected' 
						: ''}`}
				onClick={()=>setItemSelected(0)}
			>
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					height="24px" 
					viewBox="0 -960 960 960" 
					width="24px" fill="#ffffff">
						<path d="M240-200h120v-240h240v240h120v-360L480-740 
						240-560v360Zm-80 80v-480l320-240 
						320 240v480H520v-240h-80v240H160Zm320-350Z"
						/>
				</svg>
			</Link>
      <Link 
				to='/inventario' 
				className={
					`mobile-navbar-item ${
						itemSelected === 1 
						? 'mobile-navbar-item-selected' 
						: ''}`} 
				onClick={()=>setItemSelected(1)}
			>
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					height="24px" viewBox="0 -960 960 960" 
					width="24px" 
					fill="#ffffff">
						<path d="M620-163 450-333l56-56
						114 114 226-226 56 56-282 
						282Zm220-397h-80v-200h-80v120H280v-120h-80v560h240v80H200q-33 
						0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 
						43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 
						0 56.5 23.5T840-760v200ZM480-760q17 0 
						28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 
						17 11.5 28.5T480-760Z"
						/>
				</svg>
			</Link>
			<Link
				to='/ventas' 
				className={
					`mobile-navbar-item ${
						itemSelected === 2 
						? 'mobile-navbar-item-selected' 
						: ''}`} 
				onClick={()=>setItemSelected(2)}
			>
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					height="24px" 
					viewBox="0 -960 960 960" 
					width="24px" 
					fill="#ffffff">
						<path d="M280-80q-33 0-56.5-23.5T200-160q0-33 
						23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 
						0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 
						56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 
						35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 
						0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"
						/>
				</svg>
			</Link>
			<Link
				to='/login' 
				className={`mobile-navbar-item `} 
				onClick={handleLogOut}
			>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>

			</Link>

    </div>
		)
}

export default MobileNavbar;
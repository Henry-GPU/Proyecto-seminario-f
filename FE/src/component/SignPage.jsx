import axios from "axios";
import { useState } from "react";
import authUrl from "../config/authUrl";
import { useNavigate } from "react-router-dom";
import gradientLogo from '../placeholder/gradientLogo.svg';
import WQLogo from '../placeholder/WQLogo.svg';
import { useAccToken } from "./context/AccToken";

function SignPage() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Para mostrar errores
    const [loading, setLoading] = useState(false); // Para manejar estado de carga
    const navigate = useNavigate();
    const { setAccessToken } = useAccToken();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loading) return; // Evita doble envío
        if (!user || !password) {
            setError("Debes llenar todos los campos.");
            return;
        }
        setLoading(true); 
        setError("");

        let data = {
            username: user,
            password: password,
        };
        try {
            const response = await axios.post(`${authUrl}/auth/login`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            const token = response.data?.accessToken;
            if (token) {
                setAccessToken(token);
                 // Guarda el access token en memoria
                navigate("/"); // Navega sin recargar la página
            } else {
                setError("Token no recibido. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error al enviar datos:", error);
            setError(error?.response?.data || error.message);
        } finally {
            setLoading(false);
            data = null; // Limpia los datos
        }
    };

    return (
        <div className="flex items-center justify-center bg-black h-dvh">
            <img 
            className="absolute object-cover h-full py-4 blur-sm"
            src={gradientLogo}  
            alt="" />
            <div className="drop-shadow-sm md:rounded-2xl min-h-dvh md:min-h-[600px] flex justify-center items-center">
                <form
                    className="w-full px-8 pb-8 md:px-10 flex flex-wrap gap-6 md:w-[500px]"
                    onSubmit={handleSubmit}
                >
                    <img src={WQLogo} className="w-full h-16" />
                    <h1 className="w-full text-2xl text-center text-[#ffffff] font-semibold">Iniciar sesión</h1>

                    {/* Error message */}
                    {error && <p className="text-center text-red-500">{error}</p>}

                    <div className="flex flex-wrap w-full gap-2">
                        <label 
                        className="text-white"
                        htmlFor="user">Usuario, email o teléfono</label>
                        <input
                            className="w-full p-2 bg-[#bababa] rounded-lg"
                            type="text"
                            name="user"
                            id="user"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>
                    

                    <div className="flex flex-wrap w-full gap-2">
                        <label 
                        className="text-white"
                        htmlFor="password">Contraseña</label>
                        <input
                            className="w-full p-2 bg-[#bababa] rounded-lg"
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-center w-full drop-shadow-sm">
                        <button
                            className="w-full button bg-[#5c5c5c]"
                            type="submit"
                            disabled={loading} // Deshabilita el botón mientras carga
                        >
                            {loading ? "Ingresando..." : "Ingresar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignPage;

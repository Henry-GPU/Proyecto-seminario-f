import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import authUrl from '../../config/authUrl';

// Crea el contexto
const AccTokenContext = createContext();

// Hook para usar el contexto fácilmente
export function useAccToken() {
    return useContext(AccTokenContext);
}

// Provider para envolver la app
export function AccTokenProvider({ children }) {
    const [accessToken, setAccessToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Al montar, intenta refrescar el access token usando el refresh token (cookie HttpOnly)
        const fetchAccessToken = async () => {
            try {
                console.log('Intentando refrescar access token...');
                const response = await axios.post(`${authUrl}/auth/refresh`, {}, {
                    withCredentials: true, 
                });
                console.log('Respuesta de /auth/refresh:', response);
                const newToken = response.data?.accessToken;
                if (newToken) {
                    setAccessToken(newToken);
                }else {
                        console.warn("No se recibió accessToken, redirigiendo al login.");
                        setAccessToken(null);
                        window.location.href = "/login";
                    }
            } catch (err) {
                console.log('Error al refrescar access token:', err);
                setAccessToken(null); // No hay sesión válida
            } finally {
                setLoading(false);
            }
        };
        fetchAccessToken();
    }, []);

    return (
        <AccTokenContext.Provider value={{ accessToken, setAccessToken, loading }}>
            {children}
        </AccTokenContext.Provider>
    );
}

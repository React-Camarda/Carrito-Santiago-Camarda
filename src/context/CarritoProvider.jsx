import React, { useReducer } from 'react';
import { CarritoContext } from './CarritoContext';

const initialState = [];

// Reducer debe ser declarado antes de su uso
const comprasReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case "[Carrito] Agregar Compra":
            // Verifica si la compra ya existe en el carrito
            const existingCompra = state.find(compra => compra.id === action.payload.id);
            if (existingCompra) {
                // Si existe, retorna el estado actual sin agregarlo de nuevo
                return state;
            }
            return [...state, { ...action.payload, cantidad: 1 }];
        case "[Carrito] Aumentar Compra":
            return state.map(compra => 
                compra.id === action.payload
                    ? { ...compra, cantidad: (compra.cantidad || 1) + 1 }
                    : compra
            );
        case "[Carrito] Disminuir Compra":
            return state.map(compra => 
                compra.id === action.payload && compra.cantidad > 1
                    ? { ...compra, cantidad: compra.cantidad - 1 }
                    : compra
            );
        case "[Carrito] Eliminar Compra":
            return state.filter(compra => compra.id !== action.payload);
        case "[Carrito] Limpiar Carrito": // Nueva acción para limpiar el carrito
            return initialState; // Reinicia el carrito a su estado inicial
        default:
            return state;
    }
};

const CarritoProvider = ({ children }) => {
    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

    const agregarCompra = (compra) => {
        const action = {
            type: '[Carrito] Agregar Compra',
            payload: compra
        };
        dispatch(action);
    };

    const aumentarCompra = (id) => {
        const action = {
            type: '[Carrito] Aumentar Compra',
            payload: id
        };
        dispatch(action);
    };

    const disminuirCantidad = (id) => {
        const action = {
            type: '[Carrito] Disminuir Compra',
            payload: id
        };
        dispatch(action);
    };

    const eliminarCompra = (id) => {
        const action = {
            type: '[Carrito] Eliminar Compra',
            payload: id
        };
        dispatch(action);
    };

    const limpiarCarrito = () => {
        const action = {
            type: '[Carrito] Limpiar Carrito' // Utiliza la nueva acción
        };
        dispatch(action);
    };

    return (
        <CarritoContext.Provider value={{
            listaCompras,
            agregarCompra,
            aumentarCompra,
            disminuirCantidad,
            eliminarCompra,
            limpiarCarrito // Asegúrate de incluir esto aquí
        }}>
            {children}
        </CarritoContext.Provider>
    );
};

export default CarritoProvider;

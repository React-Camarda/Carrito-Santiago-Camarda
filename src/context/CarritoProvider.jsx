import React, { useReducer } from 'react';
import { CarritoContext } from './CarritoContext';

const initialState = [];

// Reducer debe ser declarado antes de su uso
const comprasReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case "[Carrito] Agregar Compra":
            return [...state, action.payload];
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
        default:
            return state;
    }
};

const CarritoProvider = ({ children }) => {
    const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

    const agregarCompra = (compra) => {
        compra.cantidad=1
        const action = {
            type: '[Carrito] Agregar Compra',
            payload: compra  // Cambiar playload a payload
        };
        dispatch(action);
    };

    const aumentarCompra = (id) => {
        const action = {
            type: '[Carrito] Aumentar Compra',
            payload: id  // Cambiar playload a payload
        };
        dispatch(action);
    };

    const disminuirCantidad = (id) => {
        const action = {
            type: '[Carrito] Disminuir Compra',
            payload: id  // Cambiar playload a payload
        };
        dispatch(action);
    };

    const eliminarCompra = (id) => {
        const action = {
            type: '[Carrito] Eliminar Compra',
            payload: id  // Cambiar playload a payload
        };
        dispatch(action);
    };

    return (
        <CarritoContext.Provider value={{
            listaCompras,
            agregarCompra,
            aumentarCompra,
            disminuirCantidad,
            eliminarCompra
        }}>
            {children}
        </CarritoContext.Provider>
    );
};

export default CarritoProvider;

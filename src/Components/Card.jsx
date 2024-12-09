import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../Styles/card.css';

const Card = ({ id, imagen, titulo, descripcion, precio, handleAgregar, handleQuitar, handleAumentar, handleDisminuir }) => {
  const [added, setAdded] = useState(false);
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad
  const navigate = useNavigate(); // Inicializa useNavigate

  const clickAgregar = () => {
    handleAgregar(cantidad);
    setAdded(true);
  };

  const clickQuitar = () => {
    handleQuitar();
    setAdded(false);
  };

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
    handleAumentar(); // Llama a la función para aumentar en el carrito
  };

  const disminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      handleDisminuir(); // Llama a la función para disminuir en el carrito
    }
  };

  // Función para redirigir a la página de detalles
  const irADetalle = () => {
    navigate(`/producto/${id}`); // Reemplaza id con el identificador de tu producto
  };

  return (
    <div className="tarjeta">
      <img src={imagen} alt={titulo} className="tarjeta-imagen" />
      <div className="tarjeta-container">
        <h3 className="tarjeta-titulo">{titulo}</h3>
        <p className="tarjeta-descripcion">{descripcion}</p>
        <p className="tarjeta-precio">${precio.toFixed(2)}</p>
        
        {/* Mostrar controles de cantidad si el producto está en el carrito */}
        {added && (
          <div className="cantidad-container">
            <button onClick={disminuirCantidad} className="boton-cantidad">-</button>
            <span className="cantidad">{cantidad}</span>
            <button onClick={aumentarCantidad} className="boton-cantidad">+</button>
          </div>
        )}

        <button
          type="button"
          className={added ? 'boton-quitar' : 'boton-agregar'}
          onClick={added ? clickQuitar : clickAgregar}
        >
          {added ? 'Quitar' : 'Agregar'}
        </button>
        
        {/* Botón para ver detalles del producto */}
        <button
          type="button"
          className="boton-detalle"
          onClick={irADetalle}
        >
          Ver Detalles
        </button>
      </div>
    </div>
  );
};

export default Card;

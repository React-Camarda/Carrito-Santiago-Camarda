import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import '../Styles/card.css';

const Card = ({ id, imagen, titulo, precio }) => {
  const navigate = useNavigate(); // Inicializa useNavigate

  // Función para redirigir a la página de detalles
  const irADetalle = () => {
    navigate(`/producto/${id}`); // Redirige al detalle del producto
  };

  return (
    <div className="tarjeta">
      <img src={imagen} alt={titulo} className="tarjeta-imagen" />
      <div className="tarjeta-container">
        <h3 className="tarjeta-titulo">{titulo}</h3>
        <p className="tarjeta-precio">${precio.toFixed(2)}</p>

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

import React, { useState } from 'react';
import '../Styles/card.css';

const Card = ({ imagen, titulo, descripcion, precio, handleAgregar,handleQuitar,hanldeAumentar,handleDisminuir }) => {
  const [added, setAdded] = useState(false);

  const clickAgregar = () => {
    handleAgregar()
    setAdded(true);
  };

  const clickQuitar = () => {
    handleQuitar()
    setAdded(false);
  };

  return (
    <>
      <div className="tarjeta">
        <img src={imagen} alt={titulo} className="tarjeta-imagen" />
        <div className="tarjeta-container">
          <h3 className="tarjeta-titulo">{titulo}</h3>
          <p className="tarjeta-descripcion">{descripcion}</p>
          <p className="tarjeta-precio">${precio.toFixed(2)}</p>
          <button
            type="button"
            className={added ? 'boton-quitar' : 'boton-agregar'}
            onClick={added ? clickQuitar : clickAgregar} 
          >
            {added ? 'Quitar' : 'Agregar'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;

import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductosContext } from '../context/ProductosContext';
import { CarritoContext } from '../context/CarritoContext';
import '../Styles/cardDetalles.css'
const DetalleProducto = () => {
  const { id } = useParams();
  const { productos } = useContext(ProductosContext);
  const { agregarCompra, eliminarCompra, aumentarCompra, disminuirCantidad } = useContext(CarritoContext);

  const producto = productos.find((prod) => prod.id === parseInt(id, 10));
  const [added, setAdded] = useState(false); // Estado para saber si está en el carrito
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  const clickAgregar = () => {
    agregarCompra({ ...producto, cantidad });
    setAdded(true);
  };

  const clickQuitar = () => {
    eliminarCompra(producto.id);
    setAdded(false);
  };

  const aumentarCantidad = () => {
    setCantidad(cantidad + 1);
    if (added) {
      aumentarCompra(producto.id);
    }
  };

  const handleDisminuirCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
      if (added) {
        disminuirCantidad(producto.id); // Asegúrate de que esta función se llame correctamente
      }
    }
  };

  return (
    <div className="detalle-producto">
      <h1>{producto.title}</h1>
      <img src={producto.image} alt={producto.title} />
      <p>{producto.description}</p>
      <p>${producto.price.toFixed(2)}</p>

      {/* Controles para agregar/eliminar productos */}
      {added && (
        <div className="cantidad-container">
          <button onClick={handleDisminuirCantidad} className="boton-cantidad">-</button>
          <span className="cantidad">{cantidad}</span>
          <button onClick={aumentarCantidad} className="boton-cantidad">+</button>
        </div>
      )}

      <button
        type="button"
        className={added ? 'boton-quitar' : 'boton-agregar'}
        onClick={added ? clickQuitar : clickAgregar}
      >
        {added ? 'Quitar del Carrito' : 'Agregar al Carrito'}
      </button>
    </div>
  );
};

export default DetalleProducto;

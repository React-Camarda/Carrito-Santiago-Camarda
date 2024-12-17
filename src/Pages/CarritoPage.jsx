import React, { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate


const CarritoPage = () => {
  const { listaCompras, aumentarCompra, disminuirCantidad, eliminarCompra, limpiarCarrito } = useContext(CarritoContext);
  const [mensajeCompra, setMensajeCompra] = useState('');
  const navigate = useNavigate(); // Inicializar el hook de navegación

  const total = listaCompras.reduce((acc, item) => acc + (item.price * (item.cantidad || 1)), 0);

  const manejarCompra = () => {
    if (listaCompras.length > 0) {
      setMensajeCompra(`Gracias por tu compra. Total: ${total.toFixed(2)}$`);
      limpiarCarrito();
    } else {
      setMensajeCompra('No hay productos en el carrito para comprar.');
    }
  };

  // Función para redirigir al checkout
  const irAFormularioCheckout = () => {
    if (listaCompras.length > 0) {
      navigate('/checkout'); // Ruta del formulario de checkout
    } else {
      setMensajeCompra('No hay productos en el carrito para comprar.');
    }
  };

  return (
    <>
      <h1>Carrito de Compras</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Aumentar</th>
            <th scope="col">Disminuir</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {listaCompras.length > 0 ? (
            listaCompras.map((item) => (
              <tr key={item.id}>
                <th scope="row">{item.title}</th>
                <td>{item.price.toFixed(2)}$</td>
                <td>{item.cantidad || 1}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => aumentarCompra(item.id)}
                  >
                    Aumentar
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => disminuirCantidad(item.id)}
                    disabled={item.cantidad <= 1}
                  >
                    Disminuir
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => eliminarCompra(item.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No hay productos en el carrito.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {listaCompras.length > 0 && (
        <div className="total">
          <h3>Total: {total.toFixed(2)}$</h3>
        </div>
      )}

      <div className="d-grid gap-2">
        {/* <button className="btn btn-primary" onClick={manejarCompra}>Comprar</button> */}
        <button className="btn btn-success" onClick={irAFormularioCheckout}>
          Ir al Checkout
        </button>
      </div>

      {mensajeCompra && (
        <div className="alert alert-info mt-3">
          {mensajeCompra}
        </div>
      )}
    </>
  );
};

export default CarritoPage;

import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext'; // Importa correctamente el contexto

const CarritoPage = () => {
  const { listaCompras, aumentarCompra, disminuirCantidad, eliminarCompra } = useContext(CarritoContext);

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
                <td>{item.price}</td>
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
                    disabled={item.cantidad <= 1} // Deshabilitar si la cantidad es 1
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

      <div className="d-grid gap-2">
        <button className="btn btn-primary">Comprar</button>
      </div>
    </>
  );
};

export default CarritoPage;

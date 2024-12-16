import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Importa Link para navegación
import Card from '../Components/Card';
import { ProductosContext } from '../context/ProductosContext';
import { CarritoContext } from '../context/CarritoContext';

const ComprasPage = () => {
  const { productos } = useContext(ProductosContext);
  const { agregarCompra, aumentarCompra, disminuirCantidad, eliminarCompra } = useContext(CarritoContext);

  const handleAgregar = (compra) => {
    agregarCompra(compra);
  };

  const handleQuitar = (id) => {
    eliminarCompra(id);
  };

  const handleAumentar = (id) => {
    aumentarCompra(id);
  };

  const handleDisminuir = (id) => {
    disminuirCantidad(id);
  };

  return (
    <div className="compras-container">
      <h1>Compras</h1>
      {productos.length > 0 ? (
        <div className="productos-grid">
          {productos.map((producto) => (
            <Link
            to={`/producto/${producto.id}`}
            key={producto.id}
            style={{ textDecoration: 'none' }}
            state={{ producto }}
          >
            <Card
              imagen={producto.image}
              titulo={producto.title}
              descripcion={producto.description}
              precio={producto.price}
              handleAgregar={() => handleAgregar(producto)}
              handleQuitar={() => handleQuitar(producto.id)}
              handleAumentar={() => handleAumentar(producto.id)}
              handleDisminuir={() => handleDisminuir(producto.id)}
            />
          </Link>
          ))}
        </div>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
};

export default ComprasPage;

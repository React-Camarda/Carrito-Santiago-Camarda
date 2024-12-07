import React, { useContext } from 'react';
import Card from '../Components/Card';
import { ProductosContext } from '../context/ProductosContext';
import { CarritoContext } from '../context/CarritoContext'; // Asegúrate de importar CarritoContext

const ComprasPage = () => {
  const { productos } = useContext(ProductosContext);
  const { listaCompras, agregarCompra, aumentarCompra, disminuirCantidad, eliminarCompra } = useContext(CarritoContext); // Cambiar aquí

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
            <Card
              key={producto.id}
              imagen={producto.image}
              titulo={producto.title}
              descripcion={producto.description}
              precio={producto.price}
              handleAgregar={() => handleAgregar(producto)} // Agregar producto
              handleQuitar={() => handleQuitar(producto.id)} // Quitar producto
              handleAumentar={() => handleAumentar(producto.id)} // Aumentar producto
              handleDisminuir={() => handleDisminuir(producto.id)} // Disminuir producto
            />
          ))}
        </div>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
};

export default ComprasPage;

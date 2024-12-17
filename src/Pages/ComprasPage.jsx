import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../Components/Card';
import { ProductosContext } from '../context/ProductosContext';
import { CarritoContext } from '../context/CarritoContext';

const ComprasPage = () => {
  const { productos } = useContext(ProductosContext);
  const { agregarCompra, aumentarCompra, disminuirCantidad, eliminarCompra } = useContext(CarritoContext);

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(''); // Estado para la categoría seleccionada
  const [productosFiltrados, setProductosFiltrados] = useState(productos); // Estado para los productos filtrados

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

  const handleCategoriaChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
  };

  // Efecto para actualizar productos filtrados cada vez que cambia la categoría seleccionada
  useEffect(() => {
    if (categoriaSeleccionada === '') {
      setProductosFiltrados(productos); // Mostrar todos los productos si no se selecciona ninguna categoría
    } else {
      const filtrados = productos.filter((producto) => producto.category === categoriaSeleccionada);
      setProductosFiltrados(filtrados);
    }
  }, [categoriaSeleccionada, productos]); // Dependencias: cambia si cambia la categoría seleccionada o los productos

  return (
    <div className="compras-container">
      <h1>Compras</h1>

      {/* Filtro por categoría */}
      <div className="filtro-categorias">
        <label htmlFor="categorias" className="form-label">
          Filtrar por categoría:
        </label>
        <select
          id="categorias"
          className="form-select"
          value={categoriaSeleccionada}
          onChange={handleCategoriaChange}
        >
          <option value="">Todas las categorías</option>
          {[...new Set(productos.map((producto) => producto.category))].map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
      </div>

      {productosFiltrados.length > 0 ? (
        <div className="productos-grid">
          {productosFiltrados.map((producto) => (
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
        <p>No se encontraron productos para la categoría seleccionada.</p>
      )}
    </div>
  );
};

export default ComprasPage;

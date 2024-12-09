import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductosContext } from '../context/ProductosContext';
import { CarritoContext } from '../context/CarritoContext';
import Card from '../Components/Card';

const DetalleProducto = () => {
    const { id } = useParams(); // Obtiene el id del producto de la URL
    const { productos } = useContext(ProductosContext);
    const { agregarCompra } = useContext(CarritoContext);
    
    const [producto, setProducto] = useState(null);
    const navigate = useNavigate(); // Cambiado de useHistory a useNavigate

    useEffect(() => {
        const productoEncontrado = productos.find((prod) => prod.id === parseInt(id));
        if (productoEncontrado) {
            setProducto(productoEncontrado);
        } else {
            // Manejar el caso en que no se encuentra el producto
            navigate('/compras'); // Redirigir a la página de compras
        }
    }, [id, productos, navigate]); // Cambiar history por navigate

    const handleAgregar = () => {
        agregarCompra(producto);
    };

    if (!producto) {
        return <p>Cargando producto...</p>;
    }

    return (
        <div className="detalle-producto">
            <Card
                imagen={producto.image}
                titulo={producto.title}
                descripcion={producto.description}
                precio={producto.price}
            />
            <button onClick={handleAgregar}>Agregar al Carrito</button>
        </div>
    );
};

export default DetalleProducto;

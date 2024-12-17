import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductosContext } from '../context/ProductosContext';
import { CarritoContext } from '../context/CarritoContext';
import '../Styles/cardDetalles.css';

const DetalleProducto = () => {
    const { id } = useParams();
    const { productos } = useContext(ProductosContext);
    const { agregarCompra, listaCompras } = useContext(CarritoContext);
    const [cantidad, setCantidad] = useState(1);

    // Buscar producto, asegurando que IDs sean comparables
    const producto = productos.find(prod => prod.id.toString() === id);

    if (!producto) {
        return <p>Producto no encontrado</p>;
    }

    const existeEnCarrito = listaCompras.some(item => item.id === producto.id);

    const clickAgregar = () => {
        if (!existeEnCarrito) {
            agregarCompra({ ...producto, cantidad });
        } else {
            console.log("Ya en el carrito");
        }
    };

    return (
        <div className="detalle-producto">
            <h1>{producto.title}</h1>
            <img src={producto.image} alt={producto.title} />
            <p>${producto.price}</p>
            {/* <div className="cantidad-container">
                <button className="boton-cantidad" onClick={() => setCantidad(cantidad > 1 ? cantidad - 1 : 1)}>-</button>
                <span>{cantidad}</span>
                <button className="boton-cantidad" onClick={() => setCantidad(cantidad + 1)}>+</button>
            </div> */}
            <button className="boton-agregar" onClick={clickAgregar}>
                {existeEnCarrito ? 'Ya en el Carrito' : 'Agregar al Carrito'}
            </button>
        </div>
    );
};

export default DetalleProducto;

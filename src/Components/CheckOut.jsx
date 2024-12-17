import React, { useContext, useState } from 'react';
import { CarritoContext } from '../context/CarritoContext';

export const CheckOut = () => {
  const { listaCompras, limpiarCarrito } = useContext(CarritoContext);
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    metodoPago: '',
  });
  const [mensajeExito, setMensajeExito] = useState(''); // Estado para el mensaje de éxito

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (listaCompras.length === 0) {
      setMensajeExito('El carrito está vacío, agrega productos antes de comprar.');
      return;
    }

    console.log('Detalles de la compra:', formData);
    console.log('Productos comprados:', listaCompras);

    setMensajeExito('¡Compra realizada con éxito! 🎉'); // Actualiza el estado del mensaje
    limpiarCarrito(); // Limpia el carrito después de la compra

    // Reinicia el formulario
    setFormData({
      nombre: '',
      direccion: '',
      metodoPago: '',
    });
  };

  return (
    <div className="container mt-5">
      <h2>Formulario de Checkout</h2>
      {mensajeExito && (
        <div className="alert alert-success" role="alert">
          {mensajeExito}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Método de Pago</label>
          <select
            className="form-select"
            name="metodoPago"
            value={formData.metodoPago}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un método de pago</option>
            <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
            <option value="Tarjeta de Débito">Tarjeta de Débito</option>
            <option value="Efectivo">Efectivo</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Finalizar Compra
        </button>
      </form>
    </div>
  );
};

export default CheckOut;

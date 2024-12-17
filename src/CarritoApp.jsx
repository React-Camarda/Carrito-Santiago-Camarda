import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import NavBar from './Components/NavBar';
import DetalleProducto from './Pages/DetalleProducto';
import ComprasPage from './Pages/ComprasPage';
import CarritoPage from './Pages/CarritoPage';
import { ProductosProvider } from './context/ProdcutosProvider';
import CarritoProvider from './context/CarritoProvider';

import {CheckOut} from './Components/CheckOut';


const CarritoApp = () => {
  return (
    <ProductosProvider>
      <CarritoProvider>
        <NavBar />
        <main className="container">
          <Routes>
            {/* Página principal de compras */}
            <Route path="/" element={<ComprasPage />} />
            {/* Página del carrito */}
            <Route path="/carrito" element={<CarritoPage />} />
            {/* Detalle del producto */}
            <Route path="/producto/:id" element={<DetalleProducto />} />
            {/* Redirección para rutas no existentes */}
            <Route path="/*" element={<Navigate to="/" />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Routes>
        </main>
      </CarritoProvider>
    </ProductosProvider>
  );
};

export default CarritoApp;

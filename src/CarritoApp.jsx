import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import NavBar from './Components/NavBar';

import ComprasPage from './Pages/ComprasPage';
import CarritoPage from './Pages/CarritoPage';
import { ProductosProvider } from './context/ProdcutosProvider';
import CarritoProvider from './context/CarritoProvider';
const CarritoApp = () => {
  return (

    <>
    <ProductosProvider>
     <NavBar />
     <CarritoProvider>
     <div className='container'>

<Routes>
  <Route path="/" element={<ComprasPage />} />
  <Route path="/carrito" element={<CarritoPage></CarritoPage>} />
  <Route path="/*" element={<Navigate to="/" />} />
</Routes>
</div>


     </CarritoProvider>
   
    </ProductosProvider>
    </>
  );
};

export default CarritoApp;

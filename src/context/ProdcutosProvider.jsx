import React, { useState, useEffect } from 'react';
import { ProductosContext } from './ProductosContext';


import { collection, getDocs } from "firebase/firestore";
import { db } from '../service/firebas';

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);


  const [loading, setLoading] = useState(true); // Estado para gestionar la carga de datos

  // useEffect(() => {
  //   const fetchProductos = async () => {
  //     try {
  //       const response = await fetch('https://fakestoreapi.com/products');
  //       const data = await response.json();
  //       setProductos(data);
  //     } catch (error) {
  //       console.error('Error fetching productos:', error);
  //     }
  //   };
  //   fetchProductos();
  // }, []);
  

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosData = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Aquí asignamos el ID generado por Firebase
          ...doc.data(),
        }));
        setProductos(productosData); // Guardar los productos con sus IDs
        setLoading(false);
      } catch (error) {
        console.error("Error fetching productos:", error);
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);


  return (
    <ProductosContext.Provider value={{ productos }}>
      {children}
    </ProductosContext.Provider>
  );
};

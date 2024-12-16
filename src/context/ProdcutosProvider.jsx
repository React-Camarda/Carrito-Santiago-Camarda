import React, { useState, useEffect } from 'react';
import { ProductosContext } from './ProductosContext';

import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../service/firebas';

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para gestionar la carga de datos

  const saveProductosToFirebase = async (productos) => {
    try {
      const productosCollection = collection(db, "productos");
      for (const producto of productos) {
        await addDoc(productosCollection, {
          ...producto,
          id: producto.id.toString() // Guarda el ID original como string
        });
      }
      console.log("Productos guardados en Firebase correctamente.");
    } catch (error) {
      console.error("Error guardando productos en Firebase:", error);
    }
  };

  useEffect(() => {
    const fetchAndStoreProductos = async () => {
      try {
        //  Obtener productos desde la URL
        const response = await fetch('https://fakestoreapi.com/products');
        const productosData = await response.json();

        //  Guardar los productos en Firebase
        await saveProductosToFirebase(productosData);

        //  Leer los productos desde Firebase
        const querySnapshot = await getDocs(collection(db, "productos"));
        const productosFromFirebase = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Aquí asignamos el ID generado por Firebase
          ...doc.data(),
        }));
        setProductos(productosFromFirebase); // Guardar los productos con sus IDs
      } catch (error) {
        console.error("Error procesando productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndStoreProductos();
  }, []);

  return (
    <ProductosContext.Provider value={{ productos, loading }}>
      {children}
    </ProductosContext.Provider>
  );
};

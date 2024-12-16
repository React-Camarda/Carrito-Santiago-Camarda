import React, { useEffect } from 'react';
import { db } from './firebaseConfig'; // Asegúrate de importar tu configuración de Firebase
import { collection, addDoc } from 'firebase/firestore';

const CargarProductos = () => {
  
  const cargarProductos = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const productos = await response.json();
      const productosRef = collection(db, "productos");

      // Subir cada producto a Firestore
      for (const producto of productos) {
        await addDoc(productosRef, {
          title: producto.title,
          description: producto.description,
          price: producto.price,
          image: producto.image,
        });
        console.log(`Producto "${producto.title}" agregado exitosamente.`);
      }
    } catch (error) {
      console.error("Error al cargar productos: ", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div>
      <h1>Cargando productos...</h1>
    </div>
  );
};

export default CargarProductos;

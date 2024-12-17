import React, { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const CargarProductos = () => {
  const [productos, setProductos] = useState([]); // Estado local para manejar los productos

  // Función para eliminar duplicados del array basándose en el campo "title"
  const eliminarDuplicados = (productos) => {
    const productosUnicos = [];
    const titulosSet = new Set();

    for (const producto of productos) {
      if (!titulosSet.has(producto.title)) {
        titulosSet.add(producto.title);
        productosUnicos.push(producto);
      }
    }
    return productosUnicos;
  };

  // Función para verificar si el producto ya existe en Firestore
  const verificarProductoExistente = async (title) => {
    const productosRef = collection(db, "productos");
    const snapshot = await getDocs(productosRef);
    return snapshot.docs.some((doc) => doc.data().title === title);
  };

  // Función principal para cargar productos
  const cargarProductos = async () => {
    try {
      // Obtener productos de la API
      const response = await fetch("https://fakestoreapi.com/products");
      let productosAPI = await response.json();

      // Limitar a 20 productos
      productosAPI = productosAPI.slice(0, 20);

      // Eliminar duplicados locales
      const productosFiltrados = eliminarDuplicados(productosAPI);
      const productosRef = collection(db, "productos");

      // Subir productos únicos a Firestore
      for (const producto of productosFiltrados) {
        const existe = await verificarProductoExistente(producto.title);

        if (!existe) {
          await addDoc(productosRef, {
            title: producto.title,
            description: producto.description,
            price: producto.price,
            image: producto.image,
            category: producto.category,
          });
          console.log(`Producto "${producto.title}" agregado exitosamente.`);
        } else {
          console.log(`Producto "${producto.title}" ya existe en la base de datos.`);
        }
      }

      // Actualizar el estado local con los productos únicos
      setProductos(productosFiltrados);
    } catch (error) {
      console.error("Error al cargar productos: ", error);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <div>
        {productos.map((producto, index) => (
          <div
            key={`${producto.title}-${index}`}
            style={{
              border: "1px solid #ddd",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h2>{producto.title}</h2>
            <p>
              <strong>Descripción:</strong> {producto.description}
            </p>
            <p>
              <strong>Precio:</strong> ${producto.price}
            </p>
            <p>
              <strong>Categoría:</strong> {producto.category}
            </p>
            <img
              src={producto.image}
              alt={producto.title}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CargarProductos;

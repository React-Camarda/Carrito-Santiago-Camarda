import React, { useContext } from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom'; 
import { CarritoContext } from '../context/CarritoContext';

const NavBar = () => {
  const { listaCompras } = useContext(CarritoContext); // Obtén listaCompras del contexto

  // Calcula la cantidad total de productos en el carrito
  const totalProductos = listaCompras.reduce((total, compra) => total + (compra.cantidad || 1), 0);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Compras
              </NavLink>
            </li>
          </ul>
          <NavLink to="/carrito" style={{ textDecoration: 'none' }}>
            <Badge badgeContent={totalProductos} color="secondary">
              <ShoppingCartIcon style={{ fontSize: '30px', cursor: 'pointer' }} />
            </Badge>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

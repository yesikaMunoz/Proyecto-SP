import React from 'react';
import '../img/Fondo.png'
import '../css/principal.css'
import { Link } from 'react-router-dom';

const MenuPrincipal = () => {
    return (
       <div className="back">
  <nav className='po'>
    <Link to={"#"}>Nostros</Link>
    <Link to={"#"}>Donde nos ubicamos</Link>
    <Link to={"/Login"}>Iniciar Sesion</Link>
  </nav>
</div>
    )
}

export default MenuPrincipal;
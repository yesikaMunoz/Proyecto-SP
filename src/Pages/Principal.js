import React from 'react';
  import '../css/principal.css'
import reloj from '../img/tiempoRapido.png'
import conversa from '../img/conversacion.png'
import solucion from '../img/solucion.png'
import mejora from '../img/majoras.png'
import { Link } from 'react-router-dom';

const MenuPrincipal = () => {
  return (
    <div className="container-fluid menu-principal-container">
    <header id="header" className="fixed-top d-flex justify-content-center align-items-center header-transparent">
      <nav id="navbar" className="navbar">
        <ul>
          <Link className="nav-Link scrollto active" to={"/Login"}>Iniciar sesión</Link>
          <Link className="nav-Link scrollto active" to={"/CreateAccount"}>Crear cuenta</Link>
        </ul>
        <i className="bi bi-list mobile-nav-toggle" />
      </nav>
    </header>
    <section id="hero">
      <div className="hero-container">
        <h1>Serviplus</h1>
        <h2>Bienvenido/a a nuestra empresa de servicio al cliente</h2>
        <Link to="#about" className="btn-scroll scrollto" title="Scroll Down">
          <i className="bx bx-chevron-down" />
        </Link>
      </div>
    </section>
    <main id="main">
      <section id="services" className="services">
        <div className="container">
          <div className="section-title">
            <span>Servicios</span>
            <h2>Servicios</h2>
            <p>Somos una empresa de atención al cliente que busca agilizar el tema de pedir ayuda o solucionar alguna duda.</p>
          </div>
          <div className="row">
         <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
           <div className="icon-box">
             <div className="icon"><img src={reloj} height={"50px"} width={"50px"}></img></div>
             <h4 className="title"><a to>Resolución Rápida de Problemas</a></h4>
             <p className="description"> Una empresa de servicio al cliente efectiva resuelve los problemas de los clientes de manera eficiente y rápida.</p>
           </div>
         </div>
         <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
           <div className="icon-box">
             <div className="icon"><img src={conversa} height={"45px"} width={"45px"}></img></div>
             <h4 className="title"><a to>Canal de Comunicación Variado</a></h4>
             <p className="description">Proporcionar un canal de comunicación, como chat en vivo, para que los clientes puedan hablar mejor con el administrador. </p>
           </div>
         </div>
         <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
           <div className="icon-box">
             <div className="icon"><img src={solucion} height={"45px"} width={"45px"}></img></div>
             <h4 className="title"><a to>Personalización del Servicio</a></h4>
             <p className="description">Ofrecer soluciones personalizadas según las necesidades específicas de cada cliente.</p>
           </div>
         </div>
         <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
           <div className="icon-box">
             <div className="icon"><img src={mejora} height={"45px"} width={"45px"}></img></div>
             <h4 className="title"><a to>Mejores servicios</a></h4>
             <p className="description">Asegurarse de que los representantes de servicio al cliente tengan un conocimiento profundo de los productos o servicios de la empresa. </p>
           </div>
         </div>
         </div>
          </div>
        </section>
      </main>
      <footer id="footer">
        <div className="container">
          <div className="copyright">
            © Copyright <strong><span>Laura</span></strong>. All Rights Reserved
          </div>
          <div className="credits">
            {/* ... (tus créditos existentes) */}
          </div>
        </div>
      </footer>
      <Link to="#" className="back-to-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short" />
      </Link>
    </div>
  );
}

export default MenuPrincipal;
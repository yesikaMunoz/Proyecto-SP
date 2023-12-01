import React from 'react';
import Navbar from '../Components/navbar';
import Sidebar from '../Components/sidebar';
import Header from '../Components/header';
import { Link } from 'react-router-dom';
 
const Home = () => {
    return (
        <div class="wrapper">
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <div className="content-wrapper">
                <Header
                    titulo={"Dashboard"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Dashboard"}
                    ruta1={"/menu"}
                />
        
        <section className="content">
          <div className="container-fluid">
            <div className="row">
            <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>Usuarios</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                  <i className="nav-icon fas fa-share"></i>
                  </div>
                  <Link to={`/Projects`} className="small-box-footer">
                    Ver usuarios
                    <i className="fas fa arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>Tickets</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                  <i className="nav-icon fas  fa-paper-plane" />
                  </div>
                  <Link to={"/Tickets" } className="small-box-footer">
                     Ver Ticket
                    <i className="fas fa arrow-circle-right" />
                  </Link>
                </div>
              </div>  
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>Chat</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                  <i className="nav-icon fas  fa-paper-plane" />
                  </div>
                  <Link to={"/Chats" } className="small-box-footer">
                    Ver Chats
                    <i className="fas fa arrow-circle-right" />
                  </Link>
                </div>
              </div>              
            </div>
          </div>
          
        </section>
            </div>
        </div>
    );
}

export default Home;
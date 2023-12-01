import React from 'react';
import { Link } from 'react-router-dom';
import NavbarUser from '../Components/navbarUser';
import SidebarUser from '../Components/sidebarUser';
import HeaderUser from '../Components/headerUser';

const HomeUser = () => {
    return (
        <div className="wrapper">
            <NavbarUser></NavbarUser>
            <SidebarUser></SidebarUser>
            <div className="content-wrapper">
                <HeaderUser
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
                    <h3>CrearTikets</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                  <i className="nav-icon fas fa-share"></i>
                  </div>
                  <Link to={`/TicketsC`} className="small-box-footer">
                    Crear Ticket
                    <i className="fas fa arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>chat</h3>
                    <p>&nbsp;</p>
                  </div>
                  <div className="icon">
                  <i className="nav-icon fas  fa-paper-plane" />
                  </div>
                  <Link to={"/ChatU" } className="small-box-footer">
                    Chat
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
export default HomeUser;
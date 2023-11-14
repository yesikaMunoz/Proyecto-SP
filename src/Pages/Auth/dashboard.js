import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import APIInvoke from "../../Utils/APIInvoke";
import '../../css/information.css'

const Dashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [userFullName, setUserFullName] = useState("");

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await APIInvoke.invokeGET("/Usuarios");
        if (response) {
          setUsuarios(response);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    obtenerUsuarios();

    const obtenerTickets = async () => {
      try {
        const response = await APIInvoke.invokeGET("/Tickets");
        if (response) {
          setTickets(response);
        }
      } catch (error) {
        console.error("Error al obtener tickets:", error);
      }
    };

    obtenerTickets();

    const userFirstName = localStorage.getItem("username") || "";
    const userLastName = localStorage.getItem("email") || "";

    setUserFullName(`${userFirstName} ${userLastName}`);
  }, []);

  return (
    <div className="wrapper">
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#!" role="button">
              <i className="fas fa-bars"></i>
            </a>
          </li>
        </ul>
      </nav>
      <aside className="main-sidebar sidebar-red elevation-10">
        <Link href="#" className="brand-link">
          <span className="brand-text font-weight-light">
          <h1>Admin</h1>
          </span>
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-home"></i>
                  <p>Inicio</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/usuarios" className="nav-link">
                  <i className="nav-icon fas fa-users"></i>
                  <p>Usuarios</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/configuracion" className="nav-link">
                  <i className="nav-icon fas fa-cog"></i>
                  <p>Configuración</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Ticket" className="nav-link">
                  <i className="nav-icon fas fa-plus"></i>
                  <p>Crear Ticket</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/Login" className="nav-link">
                  <i className="nav-icon fas fa-plus"></i>
                  <p>salir</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <div className="content-wrapper">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1>Mira la información mas relevante.</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/">Inicio</Link>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="card1">
                  <div className="card-header">
                    <h3 className="card-title">Usuarios Registrados</h3>
                  </div>
                  <div className="card-body">
                  <thead>
                      <tr>
                    <th>Titulo</th>
                    <th>Descripción</th>
                    </tr>
                    </thead>
                    <tbody>
                      {
                      usuarios.map(
                        (usuario) => (
                          <tr>
                          <td>{usuario.username}</td>
                        <td>{usuario.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="">
                  <div className="card-header">
                    <h3 className="card.title">Tickets</h3>
                  </div>
                  <div className="card-body">
                    <thead>
                      <tr>
                    <th>Titulo</th>
                    <th>Descripción</th>
                    <th>Opciones</th>
                    </tr>
                    </thead>
                    <tbody>
      {tickets.map((ticket) => (
        <tr key={ticket.id}>
          <td>{ticket.titulo}</td>
          <td>{ticket.descripcion}</td>
          <td>
            <Link
              to={{
                pathname: `/Reply/${ticket.id}`, // Usar el ID del ticket
              }}
              className="btn btn-secondary"
            >
              Contestar
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="main-footer">
      </footer>
    </div>
  );
};

export default Dashboard;
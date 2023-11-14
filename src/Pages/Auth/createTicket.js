import React, { useState } from "react";
import { Link } from "react-router-dom";
import APIInvoke from "../../Utils/APIInvoke";
import Cookies from "universal-cookie";
import "../../css/information.css";
import swal from 'sweetalert';

const Tickets = () => {
    const [titulo, setTitulo] = useState(""); 
    const [descripcion, setDescripcion] = useState("");

    const cookies = new Cookies();

    const crearTicket = async () => {
        try {
            const userId = cookies.get("id");

            if (!userId) {
                const msg = "Usuario no logueado.";
                swal({
                    title: 'info',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirmar:{
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
                return;
            }

            const data = {
                titulo,
                descripcion,
                usuarioId: userId,
            };

            const response = await APIInvoke.invokePOST("/Tickets", data);

            if (response) {
                const msg = "El ticket fue creado correctamente.";
                    swal({
                        title: 'Perfecto',
                        text: msg,
                        icon: 'success',
                        buttons: {
                            confirmar:{
                                text: 'Ok',
                                value: true,
                                visible: true,
                                className: 'btn btn-primary',
                                closeModal: true
                            }
                        }
                    });
                setTitulo("");
                setDescripcion("");
            }
        } catch (error) {
            console.error("Error al crear el ticket:", error);
            const msg = "Erro no se puedo crear el ticket. Intentar mas tarde.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'warning',
                buttons: {
                    confirmar:{
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });;
        }
    };

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
                        <h1>ADMIN</h1></span>
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
                                <Link to="/Dashboard" className="nav-link">
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
                                <Link to="/" className="nav-link">
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
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/Dashboard">Inicio</Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/Dashboard">Dashboard</Link>
                                    </li>
                                    <li className="breadcrumb-item active">Crear Ticket</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Nuevo Ticket</h3>
                                    </div>
                                    <div className="card-body">
                                        <form className="form">
                                            <div className="form-group">
                                                <label>Título del Ticket:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={titulo}
                                                    onChange={(e) => setTitulo(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Descripción del Ticket:</label>
                                                <textarea
                                                    className="form-control"
                                                    value={descripcion}
                                                    onChange={(e) => setDescripcion(e.target.value)}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={crearTicket}
                                            >
                                                Crear Ticket
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Tickets;
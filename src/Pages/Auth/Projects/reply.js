import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import APIInvoke from "../../../Utils/APIInvoke";
import Cookies from "universal-cookie";
import "../../../css/information.css";
import swal from 'sweetalert';

const Reply = () => {
    const { idTicket } = useParams();
    const [tickets, setTickets] = useState({});
    const [newMessage, setNewMessage] = useState("");
    const cookies = new Cookies();

    useEffect(() => {
        const obtenerTicket = async () => {
            try {
                const response = await APIInvoke.invokeGET(`/Tickets/${idTicket}`);
                if (response && response.data) {
                    setTickets(response.data);
                }
            } catch (error) {
                console.error("Error al obtener mensajes:", error);
            }
        };

        obtenerTicket();
    }, [idTicket]);

    const enviarMensaje = async () => {
        try {
            const userId = cookies.get("id");

            if (!userId) {
                const msg = "Usuario no logueado.";
                swal({
                    title: 'info',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirmar: {
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
                respuesta: newMessage,
                usuarioId: userId,
            };

            const response = await APIInvoke.invokePUT(`/Tickets/${idTicket}`, data);

            if (response && response.data) {
                // Actualizar el ticket con la respuesta
                setTickets(response.data);
                const msg = "Mensaje enviado correctamente.";
                swal({
                    title: 'Perfecto',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirmar: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });
                setNewMessage("");
            }
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            const msg = "Error al enviar el mensaje. Intenta de nuevo.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'warning',
                buttons: {
                    confirmar: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
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
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/Dashboard">Inicio</Link>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Responder Ticket</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="chat-container">
                                            <div className="chat-messages">
                                                {tickets && (
                                                    <div key={tickets.idTicket} className="message">
                                                        <h4>Título: {tickets.titulo}</h4>
                                                        <p>Descripción: {tickets.descripcion}</p>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="chat-input">
                                                <textarea
                                                    className="form-control"
                                                    placeholder="Escribe tu mensaje..."
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={enviarMensaje}
                                                >
                                                    Enviar
                                                </button>
                                            </div>
                                        </div>
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

export default Reply;

import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import Header from "../../Components/header";
import { Link } from "react-router-dom";
import APIInvoke from "../../Utils/APIInvoke";
import swal from 'sweetalert';

const ProjectsCreate = () => {
    const [tickets, setTickets] = useState({
        title: '',
        description: '',
        username: '',
        date: ''
    });
    const { title, description, username, date } = tickets;
    useEffect(() => {
        document.getElementById("title").focus();
    }, [])

    const onChange = (e) => {
        setTickets({
            ...tickets,
            [e.target.name]: e.target.value
        })
    }

    const crearTicket = async () => {
        const data = {
            title: tickets.title,
            description: tickets.description,
            username: tickets.username,
            date: tickets.date
        }
        const response = await APIInvoke.invokePOST(`/Tickets`, data);
        const idTickets = response.id;

        if (idTickets === '') {
            const msg = "El ticket no fue creado correctamente.";
            swal({
                title: '🤔',
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
        } else {
            const msg = "El ticket fue creado correctamente.";
            swal({
                title: '👌',
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
            setTickets({
                title: '',
                description: '',
                username: '',
                date: ''
            })
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        crearTicket();
    }
    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <div className="content-wrapper">
                <Header
                    titulo={"Crear Ticket"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Creacion"}
                    ruta1={"/Home"}
                />

                <section className='content'>

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Title</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove" title="Remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="col-50">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Registra nuevos tickets</h3>
                                    </div>
                                </div>
                                <div className="container" id="container">
                                    <div className="form-container sign-in-container">
                                        <form onSubmit={onSubmit}>
                                            <div className="social-container">
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    placeholder="Titulo de tu ticket"
                                                    value={title}
                                                    onChange={onChange}
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    placeholder="Descripcion"
                                                    value={description}
                                                    onChange={onChange}
                                                    required
                                                />
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    placeholder="Tu nombre"
                                                    value={username}
                                                    onChange={onChange}
                                                    required
                                                />
                                                <h9>Fecha de creacion</h9>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    placeholder="Fecha de creacion de este ticket"
                                                    value={date}
                                                    onChange={onChange}
                                                    required
                                                />
                                                <button type="submit">
                                                    Enviar
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="overlay-container">
                                        <div className="overlay">
                                            <div className="overlay-panel overlay-right">
                                                <h1>¡Hola, Amigo!</h1>
                                                <p>Visualiza los tickets creados aqui.</p>
                                                <Link to={"/Tickets"}>
                                                    <button className="ghost" id="signUp">
                                                        Ver
                                                    </button>
                                                </Link>
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
}

export default ProjectsCreate;
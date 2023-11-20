import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/navbar';
import Sidebar from '../../Components/sidebar';
import Header from '../../Components/header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import APIInvoke from "../../Utils/APIInvoke";
import swal from 'sweetalert';

const Chat = () =>{

    const navigate = useNavigate();
    const {idTickets} = useParams();
    let array = idTickets.split('@');
    const titleT = array[1];
    const descriptionT = array[2];
    const userT = array[3];
    const dateT = array[4];
    const answerT = array[5];

    const [tickets, setTickets] = useState({
        title: titleT,
        description: descriptionT,
        username: userT,
        date: dateT ,
        answerUser: answerT,
        answer: ''
    });
    const { title, description, username, date,answerUser, answer} = tickets;
    const onChange = (e) => {
        setTickets({
            ...tickets,
            [e.target.name]: e.target.value
        })
    }
    const respuestaTicket = {} =  async () =>{
        const idTickets = array[0];

        const data ={
            title: tickets.title,
            description: tickets.description,
            username: tickets.username,
            date: tickets.date,
            answerUser: tickets.answerUser,
            answer: tickets.answer

        }
        const response = await APIInvoke.invokePUT(`/Tickets/${idTickets}`, data)
        const idTicketsedit = response.id

        if (idTicketsedit !== idTickets){
            navigate("/Home")
            const msg = "La respuesta fue enviada correctamente";
                swal({

                    title: '-😉👍',
                    text: msg,
                    icon: 'success',
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
        }else{
            const msg = "Se ha producido uun error y la respuesta no ha sido enviada.";
                    swal({
                        title: '😢',
                        text: msg,
                        icon: 'info',
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
        }
    }
    const onSubmit = (e) => {
        e.preventDefault();
        respuestaTicket();
    }
    return(
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
                                                    readOnly
                                                />
                                                <input
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    placeholder="Descripcion"
                                                    value={description}
                                                    onChange={onChange}
                                                    readOnly
                                                />
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    placeholder="Tu nombre"
                                                    value={username}
                                                    onChange={onChange}
                                                    readOnly
                                                />
                                                <h9>Fecha de creacion</h9>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    placeholder="Fecha de creacion de este ticket"
                                                    value={date}
                                                    onChange={onChange}
                                                    readOnly
                                                />
                                                <input
                                                    type="text"
                                                    id="answerUser"
                                                    name="answerUser"
                                                    placeholder="Respuesta del usuario"
                                                    value={answerUser}
                                                    onChange={onChange}
                                                    readOnly
                                                />
                                                <input
                                                    type="text"
                                                    id="answer"
                                                    name="answer"
                                                    placeholder="Tu respuesta"
                                                    value={answer}
                                                    onChange={onChange}
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
    )
}

export default Chat;
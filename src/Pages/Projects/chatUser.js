import React, {  useState } from 'react';
import Navbar from '../../Components/navbar';
import Sidebar from '../../Components/sidebar';
import Header from '../../Components/header';
import { Link, useNavigate, useParams } from 'react-router-dom';
import APIInvoke from "../../Utils/APIInvoke";
import swal from 'sweetalert';
import '../../css/Style.css'

const ChatUser = () =>{

    const navigate = useNavigate();
    const {idTickets} = useParams();
    let array = idTickets.split('@');
    const titleT = array[1];
    const descriptionT = array[2];
    const userT = array[3];
    const dateT = array[4];
    const answerT = array[5];
    const userIdT = array[6];

    const [tickets, setTickets] = useState({
        title: titleT,
        description: descriptionT,
        username: userT,
        date: dateT ,
        answer:answerT,
        userId:userIdT,
        answerUser: ''
    });
    const { title, description, username, date,answer,userId,answerUser} = tickets;
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
            answer: tickets.answer,
            userId: tickets.userId,
            answerUser: tickets.answerUser

        }
        const response = await APIInvoke.invokePUT(`/Tickets/${idTickets}`, data)
        const idTicketsedit = response.id

        if (idTicketsedit !== idTickets){
            navigate("/HomeU")
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
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    placeholder="Fecha de creacion de este ticket"
                                                    value={date}
                                                    onChange={onChange}
                                                    
                                                />
                                                <input
                                                    type="text"
                                                    id="answer"
                                                    name="answer"
                                                    placeholder="Respuesta Admin"
                                                    value={answer}
                                                    onChange={onChange}
                                                    readOnly
                                                /> 
                                                <input
                                                type="text"
                                                id="userId"
                                                name="userId"
                                                placeholder="Tu id"
                                                value={userId}
                                                onChange={onChange}
                                                readOnly
                                            />
                                                <input
                                                    type="text"
                                                    id="answerUser"
                                                    name="answerUser"
                                                    placeholder="Tu respuesta"
                                                    value={answerUser}
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
                                                <Link to={"/ChatU"}>
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

export default ChatUser;
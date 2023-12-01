import React, { useEffect, useState } from "react";
import Navbar from "../../Components/navbar";
import Sidebar from "../../Components/sidebar";
import Header from "../../Components/header";
import { Link, useParams } from "react-router-dom";
import Footer from "../../Components/footer";
import APIInvoke from "../../Utils/APIInvoke";
import '../../css/Style.css'

const ChatTickets = () => {
    const [tickets, setTickets] = useState([]);
    const cargarTickets = async () => {
        const response = await APIInvoke.invokeGET(`/Tickets`);
        console.log(response.tickets)
        setTickets(response);
    }
    useEffect(() => {
        cargarTickets();
    }, [])
    
    return (
        <div className="wrapper">
            <Navbar></Navbar>
            <Sidebar></Sidebar>
            <div className="content-wrapper">
                <Header
                    titulo={"Listado de tickets"}
                    breadCrumb1={"Inicio"}
                    breadCrumb2={"Proyectos"}
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
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Mira los tickets registrados &amp; Reporte diario</h3>
                                    </div>
                                    <div className="card-body">
                                        <div id="example2_wrapper" className="dataTables_wrapper dt-bootstrap4"><div className="row"><div className="col-sm-12 col-md-6"></div><div className="col-sm-12 col-md-6"></div></div><div className="row"><div className="col-sm-12"><table id="example2" className="table table-bordered table-hover dataTable dtr-inline" aria-describedby="example2_info">
                                            <thead>
                                                <tr><th className="sorting sorting_desc" tabIndex="0" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="Rendering engine: activate to sort column ascending" aria-sort="descending">Id asigando para cada ticket</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="Browser: activate to sort column ascending">Titulo del ticket</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="Platform(s): activate to sort column ascending">Descripcion</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="Engine version: activate to sort column ascending">Nombre del usuario</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="CSS grade: activate to sort column ascending">Fecha del registro</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="Browser: activate to sort column ascending">Respuetas del usuario</th>
                                                    <th className="sorting" tabIndex="0" aria-controls="example2" rowSpan="1" colSpan="1" aria-label="Browser: activate to sort column ascending">Id usuario</th>
                                                    <th></th></tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    tickets.map(
                                                        item => (
                                                            <tr className="odd" key={item.id}>
                                                                <td className="sorting_1 dtr-control">{item.id}</td>
                                                                <td>{item.title}</td>
                                                                <td>{item.description}</td>
                                                                <td>{item.username}</td>
                                                                <td>{item.date}</td>
                                                                <td>{item.answerUser}</td>
                                                                <td>{item.userId}</td>
                                                                <td><Link to={`/ChatsR/${item.id}@${item.title}@${item.description}@${item.username}@${item.date}@${item.answerUser}@${item.userId}`} className="btn bg-success">
                                                                    <i className="fas fa-envelope"></i> Contestar
                                                                </Link></td>
                                                                
                                                            </tr>
                                                        ))
                                                }
                                            </tbody>
                                            <tfoot>
                                            </tfoot>
                                        </table></div></div><div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 10 of 57 entries</div></div><div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="example2_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="example2_previous"></li></ul></div></div></div></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default ChatTickets;
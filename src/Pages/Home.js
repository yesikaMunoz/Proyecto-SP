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
        
                <section className='content'>
                    <div className='container-fluid'>
                        <div className='row'>

                            <div className='col-lg-10 col-90'>
                                <div className='small-box bg-info'>
                                    <div className='inner'>
                                        <h3>Usuarios</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='fa fa-bag'/>
                                    </div>
                                    <Link to={"/Projects"} className='small-box-footer'>Ver los usuarios recientes <i className='fas fa-arrow-circle-right'/></Link>
                                </div>
                            </div>
                            <div className='col-lg-10 col-90'>
                                <div className='small-box bg-info'>
                                    <div className='inner'>
                                        <h3>Tickets</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='fa fa-bag'/>
                                    </div>
                                    <Link to={"/Tickets"} className='small-box-footer'>Ver los tickets registrados este mes <i className='fas fa-arrow-circle-right'/></Link>
                                </div>
                                </div>
                                <div className='col-lg-10 col-90'>
                                <div className='small-box bg-info'>
                                    <div className='inner'>
                                        <h3>Chatea</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='fa fa-bag'/>
                                    </div>
                                    <Link to={"/Chats"} className='small-box-footer'>Chatea con los usuarios sobre sus tickets<i  className='fas fa-arrow-circle-right'/></Link>
                                </div>
                                </div>
                                <div className='col-lg-10 col-90'>
                                <div className='small-box bg-info'>
                                    <div className='inner'>
                                    <h3>Crea tus propios tickets</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='fa fa-bag'/>
                                    </div>
                                    <Link to={"/TicketsC"} className='small-box-footer'>Ingresa nuevos tickets <i className='fas fa-arrow-circle-right'/></Link>
                                </div>
                            </div>
                            <br></br>
                            </div>
                        </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
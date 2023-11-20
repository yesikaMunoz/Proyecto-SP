import React from 'react';
import { Link } from 'react-router-dom';
import NavbarUser from '../Components/navbarUser';
import SidebarUser from '../Components/sidebarUser';
import HeaderUser from '../Components/headerUser';

const HomeUser = () => {
    return (
        <div class="wrapper">
            <NavbarUser></NavbarUser>
            <SidebarUser></SidebarUser>
            <div className="content-wrapper">
                <HeaderUser
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
                                        <h3>Chatea</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='fa fa-bag' />
                                    </div>
                                    <Link to={"/ChatU"} className='small-box-footer'>Chatea con los usuarios sobre sus tickets<i className='fas fa-arrow-circle-right' /></Link>
                                </div>
                            </div>
                            <div className='col-lg-90 col-10'>
                                <div className='small-box bg-info'>
                                    <div className='inner'>
                                        <h3>Crea tus propios tickets</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='fa fa-bag' />
                                    </div>
                                    <Link to={"/TicketsC"} className='small-box-footer'>Ingresa nuevos tickets <i className='fas fa-arrow-circle-right' /></Link>
                                </div>
                            </div>

                            <div className='col-lg-10 col-90'>
                                <div className='small-box bg-info'>
                                    <div className='inner'>
                                        <h3>Usuarios</h3>
                                        <p>&nbsp;</p>
                                        <h5>En nombre de todo el equipo de Serviplus, queremos expresar nuestro más sincero agradecimiento por confiar en nosotros para satisfacer tus necesidades. Valoramos profundamente tu elección de utilizar nuestra plataforma y estamos comprometidos a proporcionarte la mejor experiencia posible.
                                            En Serviplus, nos esforzamos constantemente por ofrecer servicios de alta calidad y soluciones eficientes. Tu confianza en nosotros nos impulsa a mejorar y superar tus expectativas en cada paso del camino.
                                            Si hay algo en lo que podamos ayudarte o alguna sugerencia que desees compartir, no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para garantizar tu satisfacción y hacer que tu experiencia con Serviplus sea excepcional.
                                            Una vez más.</h5>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='fa fa-bag' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-10 col-90'>
                                <div className='small-box bg-info'>
                                    <div className='inner'>
                                        <h5>gracias por ser parte de la comunidad Serviplus. Esperamos seguir siendo tu opción preferida y poder servirte en el futuro.
                                        <p>&nbsp;</p>
                                            ¡Gracias por elegirnos!
                                            Atentamente,
                                            <p>&nbsp;</p>
                                            Equipo Serviplus</h5>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className='icon'>
                                        <i className='fa fa-bag' />
                                    </div>
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
export default HomeUser;
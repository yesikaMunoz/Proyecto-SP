import React from "react";
import MenuUser from "./menuUser";
import { Link } from "react-router-dom";
import Logo from '../../node_modules/admin-lte/dist/img/AdminLTELogo.png';

const SidebarUser = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to={"../../index3.html"} className="brand-link">
                <img src={Logo}
                alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                <span className="brand-text font-weight-light">Usuario, Proyectos</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="info">
                        &nbsp;
                    </div>
                    <div className="info">
                        &nbsp;
                    </div>
                    <div className="info">
                        <Link to={"/HomeU"} className="nav-icon fas fa-home">   Menú principal</Link>
                    </div>
                </div>
                <MenuUser></MenuUser>
            </div>
        </aside>
    );
}

export default SidebarUser;
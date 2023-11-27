import React from "react";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <nav className="mt-2">
            <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
            >
                <li className="nav-item" >
                    <Link to={"/Chats"} className="nav-link">
                        <i className="nav-icon fas fa-comment" />
                        <p>Chat</p>
                    </Link>
                </li>

                <li className="nav-item" >
                    <Link to={"/Projects"} className="nav-link">
                        <i className="nav-icon fas fa-user" />
                        <p>Usuarios</p>
                    </Link>
                </li>

                <li className="nav-item" >
                    <Link to={"/Tickets"} className="nav-link">
                        <i className="nav-icon fas fa-file" />
                        <p>Tickets</p>
                    </Link>
                </li>

                <li className="nav-item" >
                    <Link to={"/"} className="nav-link">
                        <i className="nav-icon fas fa-paper-plane" />
                        <p>Salir</p>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;
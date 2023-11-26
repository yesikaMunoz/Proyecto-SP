import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/login.css";
import APIInvoke from "../../Utils/APIInvoke";
import swal from 'sweetalert';

const CreateAccount = () => {
    const [usuario, setUsuario] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirm: '',
    });

    const { username, email, phone, password, confirm } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        document.getElementById("username").focus();
    }, []);

    const determineUserRole = () => {
        // Obtener el dominio del correo electrónico
        const emailDomain = email.split("@")[1];

        // Verificar si el dominio del correo electrónico indica un rol de administrador
        const isAdmin = emailDomain.toLowerCase() === "serviplus.com";

        return isAdmin ? "admin" : "user";
    };

    const createAccount = async () => {
        const data = {
            username: usuario.username,
            email: usuario.email,
            phone: usuario.phone,
            password: usuario.password,
            role: determineUserRole(), // Determinar automáticamente el tipo de cuenta
        };

        if (password !== confirm) {
            const msg = "Contraseñas no coinciden.";
            swal({
                title: '🤨',
                text: msg,
                icon: 'error',
                buttons: {
                    confirmar: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true,
                    },
                },
            });
        } else if (password.length < 6) {
            const msg = "Contraseña demasiado corta (mayor a 6 caracteres.)";
            swal({
                title: '🤫',
                text: msg,
                icon: 'warning',
                buttons: {
                    confirmar: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true,
                    },
                },
            });
        } else {
            const existingUser = await verify(usuario.email);
            if (existingUser) {
                const msg = "El usuario ya existe.";
                swal({
                    title: '😒',
                    text: msg,
                    icon: 'info',
                    buttons: {
                        confirmar: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true,
                        },
                    },
                });
            } else {
                const msg = "El usuario fue creado correctamente.";
                swal({
                    title: '😁👍',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirmar: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true,
                        },
                    },
                });
                const response = await APIInvoke.invokePOST(`/Usuarios`, data);
                setUsuario({
                    username: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirm: '',
                });
            }
        }
    };

    const verify = async (email) => {
        try {
            const response = await APIInvoke.invokeGET(`/Usuarios?email=${email}`);
            return response && response.length > 0;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        createAccount();
    };

    return (
        <div>
               <div className='lo'></div>
            <div className="container1" id="container1">
                <div className="form-container1 sign-in-container1">
                    <form className='ño' onSubmit={onSubmit}>
                        <h1>Crea tu cuenta aquí.</h1>
                        <div className="social-container1">
                            <input
                            className="ds"
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Nombre de usuario"
                                value={username}
                                onChange={onChange}
                            />
                            <input
                            className="ds"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={onChange}
                            />
                            <input
                            className="ds"
                                type="number"
                                name="phone"
                                id="phone"
                                placeholder="Telefono"
                                value={phone}
                                onChange={onChange}
                            />
                            <input
                            className="ds"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={onChange}
                            />
                            <input
                            className="ds"
                                type="password"
                                name="confirm"
                                id="confirm"
                                placeholder="Confirma tu contraseña"
                                value={confirm}
                                onChange={onChange}
                            />
                            <button type="submit" to={"#"} className="ghost1">Crear</button>
                        </div>
                    </form>
                </div>
                <div className="overlay-container1">
                    <div className="overlay1">
                        <div className="overlay-panel1 overlay-right1">
                            <h1>¡Hola, Amigo!</h1>
                            <p>Ya tienes cuenta, ingresa a nuestro portal.</p>
                            <Link to={"/Login"}>
                                <button className="ghost1" id="signUp">Ingresar</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;

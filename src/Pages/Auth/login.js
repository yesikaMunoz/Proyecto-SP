import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from "../../Utils/APIInvoke.js";
import swal from "sweetalert";
import '../../css/login.css'

const Login = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    useEffect(() => {
        document.getElementById("email").focus();
    }, [])

    const determineUserRole = (email) => {
        const emailDomain = email.split("@")[1];
        const isAdmin = emailDomain.toLowerCase() === "serviplus.com"; 
        return isAdmin ? "admin" : "user";
    };

    const connect = async () => {
        const verify = async (email, password) => {
            try {
                const response = await APIInvoke.invokeGET(
                    `/Usuarios?email=${email}&password=${password}`
                );
                if (response && response.length > 0) {
                    return response[0];
                }
                return null;
            } catch (error) {
                console.error(error);
                return null;
            }
        };

        if (password.length < 6) {
            const msg = "Contraseña demasiado corta (Debe superar los 6 caracteres).";
            swal({
                title: "😠",
                text: msg,
                icon: "info",
                buttons: {
                    confirm: {
                        text: "Ok",
                        value: true,
                        visible: true,
                        className: "btn btn-danger",
                        closeModal: true,
                    },
                },
            });
        } else {
            const existingUser = await verify(email, password);

            if (!existingUser) {
                const msg = "No fue posible iniciar sesión, usuario o contraseña incorrecto.";
                swal({
                    title: '😑',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
            } else {
                const msg = "Ingreso exitoso";
                swal({
                    title: '🥳🥳',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });

                // Determinar el tipo de cuenta basado en el correo electrónico
                const role = determineUserRole(email);

                // Guardar el tipo de cuenta en el local storage
                localStorage.setItem('role', role);

                // Contener el token de acceso
                const jwt = existingUser.id;

                // Guardar el token en el local storage
                localStorage.setItem('id', jwt);

                // Redireccionar según el tipo de cuenta
                if (role === 'user') {
                    navigate("/HomeU");
                    const msg = "Ingreso exitoso, bienvenido Usuario";
                    swal({
                        title: '🥳🥳',
                        text: msg,
                        icon: 'success',
                        buttons: {
                            confirm: {
                                text: 'Ok',
                                value: true,
                                visible: true,
                                className: 'btn btn-danger',
                                closeModal: true
                            }
                        }
                    });
                } else if (role === 'admin') {
                    navigate("/Home");
                     const msg = "Ingreso exitoso, bienvenido Admin";
                swal({
                    title: '🥳🥳',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                    
                });
                }
            }
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        connect();
    }

    return (
        <div >
            <div className='lo'></div>
            <div className="container1" id="container1" >
                <div className="form-container1 sign-in-container1">
                    <form className='ño' onSubmit={onSubmit}>
                        <h1>Ingresa Aqui</h1>
                        <div className="social-container1">
                            <input
                            className="ds"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                            <input
                            className="ds"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={onChange}
                                required
                            />
                            <button type="submit" className="ghost1">
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>
                <div className="overlay-container1">
                    <div className="overlay1">
                        <div className="overlay-panel1 overlay-right1">
                            <h1>¡Hola, Amigo!</h1>
                            <p>¿No tienes cuenta?
                                Crea tu cuenta con tan solo unos pocos clicks.</p>
                            <Link to={"/CreateAccount"}>
                                <button className="ghost1" id="signUp">
                                    Registrar
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

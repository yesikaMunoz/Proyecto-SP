import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIInvoke from "../../Utils/APIInvoke.js";
import swal from "sweetalert";

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
                const jwt = existingUser.token;

                // Guardar el token en el local storage
                localStorage.setItem('token', jwt);

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
        <div>
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form onSubmit={onSubmit}>
                        <h1>Ingresa Aqui</h1>
                        <div className="social-container">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={onChange}
                                required
                            />
                            <button type="submit">
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>
                <Link href="#">¿Olvidaste tu Contraseña?</Link>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>¡Hola, Amigo!</h1>
                            <p>Crea tu cuenta con tan solo unos pocos datos</p>
                            <Link to={"/CreateAccount"}>
                                <button className="ghost" id="signUp">
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

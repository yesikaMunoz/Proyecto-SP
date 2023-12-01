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
                title: "!Error¡",
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
                    title: '!Error¡',
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
                    title: '!Exito¡',
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
                        title: '!Exito¡',
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
                    title: '!Exito¡',
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
      <div className="login-box" style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="login-logo">
          <b>Iniciar</b> Sesión
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope" />
                  </div>
                </div>
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />

                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-8"></div>
              </div>

              <div className="social-auth-links text-center mb-3">
                <button type="submit" className="btn btn-block btn-primary">
                  Ingresar
                </button>
                <Link to={"/CreateAccount"} className="btn btn-block btn-danger">
                  <i /> Crear Cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

export default Login;

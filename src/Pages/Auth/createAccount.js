import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
                title: '!Error¡',
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
                title: '!Error¡',
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
                    title: '!Error¡',
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
                    title: '!Exito¡',
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
        <div className="hold-transition login-page">
        <div className="login-box">
          <div className="login-logo">
            <Link to={"#"}>
              <b>Crea tu</b> Usuario
            </Link>
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">
                Bienvenido, ingrese los datos requeridos para crear un usuario
                nuevo
              </p>
              <form onSubmit={onSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                name="username"
                id="username"
                placeholder="Nombre de usuario"
                value={username}
                onChange={onChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-user" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
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
                type="number"
                className="form-control"
                name="phone"
                id="phone"
                placeholder="Telefono"
                value={phone}
                onChange={onChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={onChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="input-group mb-3">
              <input
                 type="password"
                 className="form-control"
                 name="confirm"
                 id="confirm"
                 placeholder="Confirma tu contraseña"
                 value={confirm}
                 onChange={onChange}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="social-auth-links text-center mb-3">
              <button type="submit" className="btn btn-block btn-primary">
                <i /> Enviar
              </button>
            </div>
            <Link to={"/Login"} className="btn btn-block btn-danger">
              <i /> Login
            </Link>
          </form>
            </div>
          </div>
        </div>
        </div>
      );
};

export default CreateAccount;

/* <div className="social-container1">
                            <input
                            className="input-group mb-3"
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
                        </div> */
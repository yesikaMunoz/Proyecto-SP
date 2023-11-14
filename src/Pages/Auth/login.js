import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Cookies from "universal-cookie";
import swal from 'sweetalert';

const baseUrl = "http://localhost:4000/Usuarios";
const cookies = new Cookies();

class Login extends Component {
  state = {
    form: {
      email: "",
      password: "",
    },
  };

handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
    form: {
        ...this.state.form,
        [name]: value,
    },
    });
};

iniciarSesion = () => {
    Axios.get(baseUrl, {
    params: {
        email: this.state.form.email,
        password:this.state.form.password,
    },
    })
    .then((response) => {
        return response.data;
    })
    .then((response) => {
        if (response.length > 0) {
        var respuesta = response[0];
        cookies.set("id", respuesta.id, { path: "/" });
        cookies.set("username", respuesta.username, { path: "/" });
        cookies.set("email", respuesta.email, { path: "/" });
        const msg = "Ingreso Exitoso.";
        swal({
            title: 'Bienvenido',
            text: msg,
            icon: 'success',
            buttons: {
            confirmar:{
                    text: 'Ok',
                    value: true,
                    visible: true,
                    className: 'btn btn-primary',
                    closeModal: true
                }
            }
        });
        window.location.href = "/Dashboard";
        } else {
            const msg = "Usuario o ontraseña incorrecta.";
            swal({
                title: 'Cuidado',
                text: msg,
                icon: 'warning',
                buttons: {
                    confirmar:{
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        }
    })
    .catch((error) => {
        console.error(error);
    });
};

render() {
    return (
        <div> 
        <div className="container" id="container"> 
        <div className="form-container sign-in-container"> 
            <form> 
            <h1>Ingresa Aqui</h1>
            <div className="social-container">
            <input 
                type="email"
                id="email" 
                className="form-control"
                name="email" 
                placeholder="Email" 
                onChange={this.handleChange} 
                required 
            /> 
            <input 
                type="password"
                id="password" 
                className="form-control"
                name="password" 
                placeholder="Contraseña" 
                onChange={this.handleChange} 
                required 
            /> 
            <button onClick={this.iniciarSesion}> 
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
}
export default Login;
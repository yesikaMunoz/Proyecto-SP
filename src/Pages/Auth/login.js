import React from "react";
import { Link } from "react-router-dom"; 
import "../../css/login.css";

function Login() {
return (
<div>
<div className="container" id="container">
    <div className="form-container sign-in-container">
    <form action="#">
        <h1>Ingresa Aqui</h1>
        <div className="social-container">
        </div>
        <input type="email" placeholder="Email" name="email" />
        <input type="password" placeholder="Contraseña" name="password" />
        <Link href="#">¿Olvidaste tu Contraseña?</Link>
        <button>Ingresar</button>
    </form>
    </div>
    <div className="overlay-container">
    <div className="overlay">
        <div className="overlay-panel overlay-right">
        <h1>¡Hola, Amigo!</h1>
        <p>Crea tu cuenta con tan solo unos pocos datos</p>
        <Link to={"/CreateAccount"}>
        <button className="ghost" id="signUp">Registrar</button>
                </Link>
        </div>
    </div>
    </div>
</div>
</div>

);
}

export default Login;

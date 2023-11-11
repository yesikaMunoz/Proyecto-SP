import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom"; 
import "../../css/login.css";
import APIInvoke from "../../Utils/APIInvoke";


const CreateAccount = () => {

    const [user, setUser] = useState({
        username:'',
        email:'',
        password:'',
        confirm:''
    });

    const{ username, email, password, confirm} = user;

    const onChange = (e) =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() =>{
        document.getElementById("username").focus();
    },[])
    
    const createAccount = async () =>{

    }

    const onSubmit = (e) =>{
        e.preventDefault();
        createAccount();
    }
return  (
<div>
<div className="container" id="container">
    <div className="form-container sign-in-container">
    <form onSubmit={onSubmit}>
        <h1>Crea tu cuenta aqui.</h1>
        <div className="social-container">
        </div>
        <input type="text" placeholder="Nombre de usuario" name="username" id="username" value={username} 
                                onChange={onChange}  />
        <input type="email" placeholder="Email" name="email"  id="email"  value={email} 
                                onChange={onChange}/>
        <input type="password" placeholder="Contraseña" name="password"   id="password" value={password} 
                                onChange={onChange}/>
        <input type="password" placeholder="Confirma tu contraseña" name="confirm"  id="confirm"  value={confirm} 
                                onChange={onChange}/>
        <button>Crear</button>
    </form>
    </div>
    <div className="overlay-container">
    <div className="overlay">
        <div className="overlay-panel overlay-right">
        <h1>¡Hola, Amigo!</h1>
        <p>Ya tienes cuenta, ingresa a nuestro portal.</p>
        <Link to={"/Login"}>
        <button className="ghost" id="signUp">Ingresar</button>
        </Link>
        </div>
    </div>
    </div>
</div>
</div>
);
}

export default CreateAccount;

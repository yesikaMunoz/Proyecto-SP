import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom"; 
import "../../css/login.css";
import APIInvoke from "../../Utils/APIInvoke";
import swal from 'sweetalert';

const CreateAccount = () => {
    const [usuario, setUsuario] = useState({
        username:'',
        email:'',
        phone:'',
        password:'',
        confirm:'',
    })
    const { username,email,phone,password,confirm} = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }
    useEffect(() =>{
        document.getElementById("username").focus();
    },[])

    const createaccount = async ()=>{
        
      
            const verify = async (username) => {
        try {
            const response = await APIInvoke.invokeGET(
                `/Usuarios?username=${username}`
            );
            if (response && response.length > 0) {
                return true; // El usuario ya existe
            }else{
                return false; // El usuario no existe
            }

        } catch (error) {
            console.error(error);
            return false; // Maneja el error si la solicitud falla
        }
        }
        if(password !== confirm){
            const msg = "Contraseñas no coinciden.";
            swal({
                title: '🤨',
                text: msg,
                icon: 'error',
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
        }else if (password.length < 6){
            const msg = "Contraseña demasiado corta (mayor a 6 caracteres.)";
                swal({
                    title: '🤫',
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
            } else {
                const existingUser = await verify(username);   
                const data ={
                    username:usuario.username,
                    email:usuario.email,
                    phone:usuario.phone,
                    password:usuario.password
        
                }
                if (existingUser){
                    const msg = "El usuario ya existe.";
                    swal({
                        title: '😒',
                        text: msg,
                        icon: 'info',
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
            
            else{
                const msg = "El usuario fue creado correctamente.";
                    swal({
                        title: '😁👍',
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
                const response = await APIInvoke.invokePOST(`/Usuarios`, data);
                //console.log(response);
                    setUsuario({
                        username:'',
                        email:'',
                        phone:'',
                        password:'',
                        confirm:'',
                    })
            }
        }
    }
    const onSubmit= (e) => {
            e.preventDefault();
            createaccount();
        }
    

return  (
<div>
<div className="container" id="container">
    <div className="form-container sign-in-container">
    <form onSubmit={onSubmit}>
        <h1>Crea tu cuenta aqui.</h1>
        <div className="social-container">
        <input type="text" name="username" id="username"  placeholder="Nombre de usuario" value={username} 
                                onChange={onChange}  />
        <input type="email" name="email"   id="email" placeholder="Email" value={email} 
                                onChange={onChange}/>
        <input type="number" name="phone"  id="phone" placeholder="Telefono" value={phone} 
                                onChange={onChange}/>
        <input type="password" name="password"  id="password" placeholder="Contraseña" value={password} 
                                onChange={onChange}/>
        <input type="password" name="confirm"  id="confirm" placeholder="Confirma tu contraseña" value={confirm} 
                                onChange={onChange}/>
        <button type="submit" to={"#"} >Crear</button>
        </div>
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

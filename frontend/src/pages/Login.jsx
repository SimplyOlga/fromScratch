import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";
import { useLogin } from "../hooks/useLogin";



const Login = ({ setIsAuthenticated }) => {

   
   const email = useField("email");
   const password = useField("password");
   const {error, login} = useLogin("/api/users/login")
    const navigate = useNavigate();
   


    const onSubmit = async (e) => {
        
        e.preventDefault();
        
        const data = await login({
            email: email.value, password: password.value
        });
        if (data) {
            setIsAuthenticated(true);
            navigate("/");
        }

       
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                
                <label>Email:</label>
                <input {...email} />
                <label>Password:</label>
                <input {...password} />
                
                <button>Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )

};

export default Login;
import {useState} from "react";
import { useNavigate } from "react-router-dom";



const Login = ({ setIsAuthenticated }) => {

   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
   


    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);


        try {
            const response = await fetch("/api/users/login", 
                { method: "POST", headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email, password
                }),
                        
                });
                const user = await response.json();
                if (!response.ok) {
                    console.log("no")
                    setError(user.error);
                    return;
                }
                localStorage.setItem("user", JSON.stringify(user));
                setIsAuthenticated(true)
                console.log("yay login");
                navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={onSubmit}>
                
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                
                <button>Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )

};

export default Login;
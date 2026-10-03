import {useState} from "react";
import { useNavigate } from "react-router-dom";



const Signup = ({ setIsAuthenticated }) => {

    const [fullName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [accountType, setAccountType] = useState("Inactive");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);


        try {
            const response = await fetch("/api/users/signup", 
                { method: "POST", headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email, password, fullName, phoneNumber, gender, date_of_birth: DateOfBirth, accountType
                }),
                        
                });
                const user = await response.json();
                if (!response.ok) {
                    console.log("no")
                    setError(user.error);
                    return;
                }
                localStorage.setItem("user", JSON.stringify(user));
                setIsAuthenticated(true);
                console.log("yay");
                navigate("/")
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={onSubmit}>
                <label>Name:</label>
                <input type="text" value={fullName} onChange={(e) => setName(e.target.value)} />
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password:</label>
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>Phone Number:</label>
                <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <label>Gender:</label>
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
                <label>Date of birth:</label>
                <input type="date" value={DateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                <label>Account type:</label>
                <select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <button>Sign up</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    )

};

export default Signup;
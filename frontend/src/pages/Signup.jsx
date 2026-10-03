import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

import { useField } from "../hooks/useField";



const Signup = ({ setIsAuthenticated }) => {

    const fullName = useField("text");
    const email = useField("email");
    const password = useField("password");
    const gender = useField("text");
    const phoneNumber = useField("tel");
    const DateOfBirth = useField("date");
    const accountType = useField("text", "Inactive");
    const navigate = useNavigate();
    const {signup, error} = useSignup('/api/users/signup');

    const onSubmit = async (e) => {
        e.preventDefault();
       
        const data = await signup({
            fullName: fullName.value, email: email.value, password: password.value, gender: gender.value, 
            phoneNumber: phoneNumber.value, date_of_birth: DateOfBirth.value, accountType: accountType.value
        });
        if (data) {
            setIsAuthenticated(true);
            navigate("/")
        }
       
    }

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={onSubmit}>
                <label>Name:</label>
                <input {...fullName} />
                <label>Email:</label>
                <input {...email} />
                <label>Password:</label>
                <input {...password} />
                <label>Phone Number:</label>
                <input {...phoneNumber} />
                <label>Gender:</label>
                <input {...gender} />
                <label>Date of birth:</label>
                <input {...DateOfBirth} />
                <label>Account type:</label>
                <select value={accountType.value} onChange={accountType.onChange}>
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
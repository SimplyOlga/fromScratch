import {useState } from "react";


export function useSignup(url) {
    const [error, setError] = useState('');

    const signup = async (userdata) => {
        try {
            setError(null);
            const response = await fetch(url, 
                { method: "POST", headers: {"Content-Type": "application/json"},
                body: JSON.stringify(
                    userdata
                ),
                        
                });
                const user = await response.json();
                if (!response.ok) {
                    throw new Error(user.message || user.error)
                    
                }
                localStorage.setItem("user", JSON.stringify(user));
                return user;
                console.log("yay");
                navigate("/")
        } catch (error) {
            setError(error.message)
        }
    };
    return {
        signup, error
    }

}
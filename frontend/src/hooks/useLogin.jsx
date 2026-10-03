import {useState } from "react";


export function useLogin(url) {
    const [error, setError] = useState('');

    const login = async (userdata) => {
        try {
            const response = await fetch(url, 
                { method: "POST", headers: {"Content-Type": "application/json"},
                body: JSON.stringify(
                    userdata
                ),
                        
                });
                const user = await response.json();
                if (!response.ok) {
                    console.log("no")
                    setError(user.error);
                    return;
                }
                localStorage.setItem("user", JSON.stringify(user));
                
                console.log("yay");
                navigate("/")
        } catch (error) {
            setError(error.message)
        }
    };
    return {
        login, error
    }

}
import React, { useState } from "react";

const Login: React.FC = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const login = (e: { preventDefault: () => void; }) =>{ 
        e.preventDefault(); 
        console.log("Login function called");
        console.log("email: ", email);
        console.log("password: ", password)
    }

    return(
        <div>
            <h1>Welcome Back!</h1>
            <form onSubmit={(e) => login(e)}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Enter Your Email"/>
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter Your Password"/>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
import React, { useState } from "react";
import { requestApi } from "../utils/requestAPI";
import { requestMethods } from "../utils/requestMethod";

const Login: React.FC = () => {

    const [form, setLoginForm] = useState({
        email: "",
        password: "",
    });


    const login = async(e: { preventDefault: () => void; }) =>{ 
        e.preventDefault(); 
        console.log("Login function called");

        try {
            const response = await requestApi({
                route: "auth/login",
                method: requestMethods.POST,
                body: JSON.stringify(form),
            });
            console.log(response.data.message);
            
        } catch (error : any) {
            
        }
    }

    return(
        <div>
            <h1>Welcome Back!</h1>
            <form onSubmit={(e) => login(e)}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" id="email" name="email" 
                        onChange={
                            (e) => setLoginForm((prev) => {
                                return { ...prev, email: e.target.value };
                            })
                        } 
                        required placeholder="Enter Your Email"
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" id="password" name="password" 
                        onChange={
                            (e) => setLoginForm((prev) =>{
                                return {...prev, password: e.target.value};
                            })
                        } 
                        required placeholder="Enter Your Password"/>
                </div>
                <div>
                    <input type="checkbox" id="rememberMe" name="rememberMe" />
                    <label htmlFor="rememberMe">Remember Me</label>
                </div>
                <div>
                    <a href="/forgot-password">Forgot Password?</a>
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <a href="/register">Sign Up</a></p>
            </form>
        </div>
    );
}

export default Login;
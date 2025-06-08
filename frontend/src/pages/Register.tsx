import React, { useState } from "react";
import { requestApi } from "../utils/requestAPI";
import { requestMethods } from "../utils/requestMethod";

const Register: React.FC = () => {

  const [form, setRegisterForm] = useState({
        name:"",
        email: "",
        password: "",
        phone_number:"",
        confirm_password: "",
    });

    const Register = async(e: { preventDefault: () => void; }) =>{ 
        e.preventDefault(); 
        console.log("Register function called");

        try {
            const response = await requestApi({
                route: "auth/register",
                method: requestMethods.POST,
                body: JSON.stringify(form),
            });
            console.log(response.data.message);
            
        } catch (error : any) {
            
        }
    }
     return(
        <div>
            <h1>Create a New Account</h1>
            <form onSubmit={(e) => Register(e)}>
              <div>
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="name" id="name" name="name" 
                        onChange={
                            (e) => setRegisterForm((prev) => {
                                return { ...prev, name: e.target.value };
                            })
                        } 
                        required placeholder="Enter Your Name"
                    />
                </div>
              <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" id="email" name="email" 
                        onChange={
                            (e) => setRegisterForm((prev) => {
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
                            (e) => setRegisterForm((prev) =>{
                                return {...prev, password: e.target.value};
                            })
                        } 
                        required placeholder="Enter Your Password"/>
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input 
                        type="confirm-password" id="confirm-password" name="confirm-password" 
                        onChange={
                            (e) => setRegisterForm((prev) =>{
                                return {...prev, confirm_password: e.target.value};
                            })
                        } 
                        required placeholder="Confirm Your Password"/>
                </div>
                <div>
                    <label htmlFor="phone_number">Phone Number:</label>
                    <input 
                        type="integer" id="phone_number" name="phone_number" 
                        onChange={
                            (e) => setRegisterForm((prev) =>{
                                return {...prev, phone_number: e.target.value};
                            })
                        } 
                        required placeholder="Enter Your Phone Number"/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

    
export default Register;




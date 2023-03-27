import { useState } from "react";
import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import "./style.css"



function Register() {
  
const [greetMsg, setGreetMsg] = useState("");
const [emailID, setEmail] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [Remember, setRememberMe] = useState(false);
    
return (
  
      <div className="container">
  
        <div className="row">
          <a href="" target="_blank">
            <img src="/Logo_Ezhire.svg" className="logo tauri" alt="Tauri logo" />
          </a>
        </div>
  
        <h1>Registeration</h1>
  
        <div className="column">
          <form
          onSubmit={(e) =>{
  
            e.preventDefault();
          
  
          }}>
  
  <input
              className="default_gap"
              id="username-input"
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder="Email ID"
          />

          <br></br>

          <input
              className="default_gap"
              id="username-input"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Enter Username"
          />
          
          <br></br>
          
          <input 
              className="default_gap"
              type = "Password"
              id="password-input"
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Password"
            />

            <br></br>

             <input 
              className="default_gap"
              type = "Confirm Password"
              id="password-input"
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Confirm Password"
            />
          
          <br></br>

      
          
          <button type = "button" onClick ={() =>{
          }} style={{marginTop: 20 + 'px'}}> Register </button>
          
          <br></br>
         
  
          </form>
        </div>
  
        <p>{greetMsg}</p>
      </div>
    );
  }

  export default Register
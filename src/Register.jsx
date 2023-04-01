import { useState } from "react";
import React from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import "./style.css";
// import { Button } from "./Components/Button";
import Button from "./Components/Button/";

function Register() {
  const [greetMsg, setGreetMsg] = useState("");
  const [emailID, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const [Remember, setRememberMe] = useState(false);

  return (
    <div className="container">
      <div className="row">
        <a href="" target="_blank">
          <img src="/Logo_Ezhire.svg" className="logo tauri" alt="Tauri logo" />
        </a>
      </div>

      <h1>Registeration</h1>

      <div
        className="column"
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
            type="Password"
            id="password-input"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Password"
          />

          <br></br>

          <input
            className="default_gap"
            type="Confirm Password"
            id="password-input"
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder="Confirm Password"
          />

          <br></br>

          <button className="default_m_right" type="submit" onClick={
            ()=>{
            invoke('create_user', {'mail' : emailID, 'pwd' : password}).then((message) => setResponse(message))
              //TODO Make this function blocking
              console.log("Invoked, Should get a response");
              //console.log(response);
              
              var x = JSON.parse(response);
              setGreetMsg(x.response);
              //setProceed(x.value);
            }
          }> Register</button>

          <br></br>
        </form>
      </div>

      <p>{greetMsg}</p>
    </div>
  );
}

export default Register;
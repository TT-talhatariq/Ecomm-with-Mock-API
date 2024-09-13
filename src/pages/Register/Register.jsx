import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const body = {
        name,
        email,
        password,
      };

      const response = await axios.post(
        "https://66c63bc2134eb8f43497236c.mockapi.io/User",
        body
      );

      if (response.status === 201) {
        message.success("Registered Successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <div className="register-content">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get(
        "https://66c63bc2134eb8f43497236c.mockapi.io/User"
      );
      if (response.status === 200) {
        const users = response.data;
        //loop
        const filteredData = users.filter(
          (user) => user.email === email && user.password === password
        );

        if (filteredData.length === 0) {
          message.error("Wrong Credentials");
        } else {
          dispatch(
            doLogin({
              login: true,
              id: filteredData[0].id,
              name: filteredData[0].name,
              email: filteredData[0].email,
            })
          );
          message.success("Logged In");
          setTimeout(() => navigate("/products"), 1000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="login">
      <div className="login-content">
        <h1>Login</h1>
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
          Don't have account? <Link to="/register">Register</Link>
        </p>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleChangeEmail = (e) => {
    setLoginError(false);
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setLoginError(false);
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    var data = { username: username, password: password };
    console.log(data);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data != {}) {
          localStorage.setItem("user", JSON.stringify(data));
          window.location.reload(); // reload to route to Login page
          setUsername("");
          setPassword("");
        } else {
          setLoginError(true);
        }
      })
      .catch((e) => {
        console.log(e);
        setLoginError(true);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__left">
          <h2>Đăng nhập</h2>
          <TextField
            placeholder="admin"
            type={"text"}
            id="outlined-disabled"
            label="Username"
            className="login__textfield"
            color="secondary"
            size="small"
            focused
            fullWidth
            value={username}
            onChange={handleChangeEmail}
            error={loginError && username == ""}
            helperText={
              loginError && username == "" && "Tên đăng nhập không đúng"
            }
            inputProps={{ className: "login__textfield__input" }}
          />
          <TextField
            placeholder="••••••"
            id="outlined-disabled"
            label="Password"
            type="password"
            className="login__textfield"
            color="secondary"
            size="small"
            focused
            fullWidth
            value={password}
            onChange={handleChangePassword}
            error={loginError && password == ""}
            helperText={loginError && password == "" && "Mật khẩu không đúng"}
            inputProps={{ className: "login__textfield__input" }}
          />
          <div className="login__button__container">
            <Button className="login__button" onClick={handleLogin}>
              Go
            </Button>
          </div>
        </div>
        <div className="login__right__container">
          <div className="login__right">
            <AllInclusiveOutlinedIcon className="header__icon" />
            <h1>Healthy First</h1>
            <p>
              Hệ thống quản lý các cơ sở sản xuất thực phẩm, kinh doanh dịch vụ
              ăn uống
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

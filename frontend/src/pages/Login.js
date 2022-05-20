import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllInclusiveOutlinedIcon from "@mui/icons-material/AllInclusiveOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./Login.css";

function Login() {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleChangeEmail = (e) => {
    if (e.target.value != "") {
      setLoginError(false);
    }
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    if (e.target.value != "") {
      setLoginError(false);
    }
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (email == user.email && password == user.password) {
      dispatch({
        type: "SET_USER",
        payload: {
          ...user,
          active: true,
        },
      });
    } else {
      setEmail("");
      setPassword("");
      setLoginError(true);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__left">
          <h2>Login</h2>
          <TextField
            placeholder="admin@gmail.com"
            type={"email"}
            id="outlined-disabled"
            label="Address e-mail"
            className="login__textfield"
            color="secondary"
            size="small"
            focused
            fullWidth
            value={email}
            onChange={handleChangeEmail}
            error={loginError}
            helperText={loginError && "Incorrect address e-mail"}
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
            error={loginError}
            helperText={loginError && "Incorrect password"}
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

import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { changeComponent, setAuthComponent } from "../../redux/uiSlice";
import { useSelector, useDispatch } from "react-redux";
import { DASHBOARD, SIGNUP } from "../../constants/componentsName.";
import { validateEmail, validatePassword } from "../../utills/validations";
import { loginUser } from "../../redux/usersSlice";
const initialData = {
  name: "",
  email: "",
  password: "",
  isLogin: false,
};

const LoginDialog = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [loginData, setLoginData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);

  const isFormValid =
    !errors.email && !errors.password && loginData.email && loginData.password;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    switch (name) {
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value) ? "" : "Invalid email format",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value)
            ? ""
            : "Invalid Password (include character, symbol, and number).",
        });
        break;
      default:
        break;
    }
  };

  const handleLoginClick = () => {
    if (!errors.name && !errors.email && !errors.password) {
      const findUser = users.find((user) => loginData.email === user.email);
      console.log(findUser);
      if (findUser) {
        if (findUser.email && findUser.password === loginData.password) {
          const updatedLoginData = {
            ...loginData,
            isLogin: true,
            name: findUser.name,
          };
          dispatch(loginUser({ data: updatedLoginData }));
          dispatch(changeComponent(DASHBOARD));
          console.log("userLoggedIn", updatedLoginData);
          window.location.reload();
        } else {
          console.log("email or password is incorrect");
        }
      } else {
        console.log("no data of user, signup instead");
      }
    } else {
      console.log("Form has errors");
    }
    setLoginData(initialData);
  };
  const handleSignUpInsteadClick = () => {
    dispatch(setAuthComponent(SIGNUP));
  };

  return (
    <>
      <Typography variant="h3" sx={{ fontWeight: "bold" }}>
        Welcome back
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
        Please Enter your Details
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Email
      </Typography>
      <TextField
        margin="dense"
        id="email"
        name="email"
        label="Email Address"
        type="email"
        fullWidth
        variant="outlined"
        color="info"
        value={loginData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <Typography variant="h6" sx={{ mt: 2 }}>
        Password
      </Typography>
      <TextField
        margin="dense"
        id="password"
        name="password"
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
        color="info"
        value={loginData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        onClick={() => {
          handleLoginClick();
        }}
        color="success"
        fullWidth
        disabled={!isFormValid}
        sx={{
          mt: 2,
          color: "white",
          backgroundColor: "#9f5aaf", 
          "&:hover": {
            backgroundColor: "#8a4d96", 
          },
          "&.Mui-disabled": {
            color: "#ebf5ea",
            backgroundColor: "#9f5aaf",
          },
        }}
      >
        <Typography variant="h6">Login</Typography>
      </Button>
      <Typography variant="body1" sx={{ textAlign: "center", mt: 2 }}>
        Don't Have an account?{" "}
        <Typography
          component="span"
          variant="h6"
          style={{ cursor: "pointer", textDecoration: "underline" }}
          onClick={handleSignUpInsteadClick}
        >
          Sign up instead
        </Typography>
      </Typography>
      <Button
        onClick={() => {
          handleLoginClick();
        }}
        color="black"
        disabled={!isFormValid}
      ></Button>
    </>
  );
};

export default LoginDialog;

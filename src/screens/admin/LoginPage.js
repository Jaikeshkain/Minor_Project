import {
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  TextField,
} from "@mui/material";
import TitleComponent from "../../components/TitleComponent";
import { Email, Password } from "@mui/icons-material";
import { useState } from "react";
import { postData } from "../../services/admin/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [emailId, SetEmailId] = useState("");
  const [password, setPassword] = useState("");

  const LoginSubmit = async (event) => {
    event.preventDefault();
    const body = { emailid: emailId, password: password };
    const result = await postData("adminSignup/adminlogin", body);
    if (result.status) {
      console.log(result.data);
      Swal.fire({
        icon: "success",
        title: "Great...",
        text: result.message,
        timer: 1500,
      });
      localStorage.setItem("ADMIN", JSON.stringify(result.data));
      navigate("/adminpage");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: result.message,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <img src="/logo.png" alt="Logo" />
          <form className="login" onSubmit={LoginSubmit}>
            <div className="head">
              <h2>Authorize</h2>
              <h1>Login</h1>
            </div>
            <div className="login__field">
              <List>
                <ListItem disablePadding>
                  <Email
                    style={{ padding: 3, marginTop: 0, color: "#70a1ff" }}
                  />
                  <TextField
                    style={{ marginBottom: 10 }}
                    label="Email"
                    variant="standard"
                    fullWidth
                    value={emailId}
                    onChange={(event) => SetEmailId(event.target.value)}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <Password
                    style={{ padding: 3, marginTop: 5, color: "#70a1ff" }}
                  />
                  <TextField
                    style={{ marginBottom: 10 }}
                    label="Password"
                    variant="standard"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </ListItem>
              </List>
            </div>
            <button type="submit" className="button login__submit">
              <span className="button__text">Log In Now</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}

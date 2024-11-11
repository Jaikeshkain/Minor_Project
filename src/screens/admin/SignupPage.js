import { Button, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, TextField } from "@mui/material"
import { useStyles } from "./SignupPageCss"
import TitleComponent from "../../components/TitleComponent"
import PersonIcon from "@mui/icons-material/Person";
import {  Email, Password, Phone } from "@mui/icons-material";
import 'react-datepicker/dist/react-datepicker.module.css'
import { useState } from "react";
import { postData } from "../../services/admin/FetchNodeServices";
import Swal from "sweetalert2";


export default function SignupPage(){
    var classes=useStyles()
    const [userName,setUserName]=useState('')
    const [emailId,SetEmailId]=useState('')
    const [mobileNo,setMobileNo]=useState('')
    const [password,setPassword]=useState('')
    
    const SubmitSignup=async()=>{
      var body={username:userName,emailid:emailId,mobileno:mobileNo,password:password}
      var result=await postData('adminSignup/adminsignup',body)
      if (result.status) {
        Swal.fire({
          icon: "right",
          title: "Great...",
          text: result.message,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "oops...",
          text: result.message,
        });
      }
    }

    return (
      <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TitleComponent title={"SignUp"} link={"Login"} page={"/loginpage"} />
            </Grid>

            <Grid item xs={12}>
              <List>
                <Divider
                  style={{
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 20,
                    background: "#fff",
                  }}
                />
                <ListItem disablePadding>
                  <PersonIcon
                    style={{ padding: 3, marginTop: 5, color: "#70a1ff" }}
                  />

                  <TextField
                    style={{ marginBottom: 10 }}
                    label="username"
                    variant="standard"
                    fullWidth
                    value={userName}
                    onChange={(event) => setUserName(event.target.value)}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <Email
                    style={{ padding: 3, marginTop: 5, color: "#70a1ff" }}
                  />

                  <TextField
                    style={{ marginBottom: 10 }}
                    label="email"
                    variant="standard"
                    fullWidth
                    value={emailId}
                    onChange={(event) => SetEmailId(event.target.value)}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <Phone
                    style={{ padding: 3, marginTop: 5, color: "#70a1ff" }}
                  />

                  <TextField
                    style={{ marginBottom: 10 }}
                    label="mobile no."
                    variant="standard"
                    fullWidth
                    value={mobileNo}
                    onChange={(event) => setMobileNo(event.target.value)}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <Password
                    style={{ padding: 3, marginTop: 5, color: "#70a1ff" }}
                  />

                  <TextField
                    style={{ marginBottom: 10 }}
                    label="password"
                    variant="standard"
                    fullWidth
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={SubmitSignup} variant="contained">
                  SignUp
                </Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
}
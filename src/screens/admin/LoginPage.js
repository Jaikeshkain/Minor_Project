import { Button, Divider, Grid, List, ListItem, Paper, TextField } from "@mui/material"
import { useStyles } from "./SignupPageCss"
import TitleComponent from "../../components/TitleComponent"
import { Email, Password } from "@mui/icons-material";
import { useState } from "react";
import { postData } from "../../services/admin/FetchNodeServices";
import Swal from "sweetalert2";

export default function LoginPage(){
    var classes=useStyles()
    const [emailId, SetEmailId] = useState("");
    const [password, setPassword] = useState("");

    const LoginSubmit=async()=>{
      var body={emailid:emailId,password:password}
      var result=await postData('adminSignup/adminlogin',body)
      if(result.status){
        console.log(result.data)
        alert('hii')
      }
    }

    return (
      <div className={classes.root}>
        <div className={classes.box}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TitleComponent title={"Login"} link={"SignUp?"} page={"/signuppage"} />
            </Grid>
            <Grid item xs={12}>
              <List>
                

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
                <ListItem>
                  <div
                    style={{
                      fontSize: 13,
                      color: "lightblue",
                      cursor: "pointer",
                    }}
                  >
                    Forget Password?
                  </div>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={LoginSubmit} variant="contained">Login</Button>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
}
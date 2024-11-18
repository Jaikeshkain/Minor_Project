import { Filter } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";


export const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  //displayallmovies
  displaybox: {
    width: "100%",
    height: "100vh",
    background: "#fff",
    padding: 10,
    overflowY: "auto", // Ensures scrollable content
  },
  cart: {
    position: "relative",
    width: 350,
    height: 500,
    background: "grey",
    borderRadius: 15,
    overflow: "hidden",
    transition: "all 0.3s ease", // Smooth transition
    "&:hover": {
      background: "#444", // Darker grey on hover
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)", // Add shadow effect
    },
    "&:hover $details": {
      bottom: -300,
      transition: "all 0.3s ease",
    },
    
    "&:hover $background img": {
      filter: "blur(4px)",
      transition: "all 0.3s ease",
      marginLeft: 20,
    },
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    transition: 0.3,
  },
  details: {
    position: "relative",
    width: "100%",
    background: "linear-gradient(0deg,rgb(0, 119, 152),transparent)",
    bottom: -400,
    height: 200,
    paddingTop: 40,
    paddingLeft: 13,
    transition: "bottom 0.3s ease", // Smooth slide-in effect
  },

  title: {
    position: "relative",
    color: "red",
    fontSize: 23,
    display: "flex",
    
    transition: "all 0.3s ease",
  },
  description: {
    position: "relative",
    fontSize: 14,
    height: 60,
    marginTop: 35,
  },
  multipleimages: {
    position: "relative",
    left: 300,
    top: -220,
  },
  dialogbox: {
    width: 800,
    height: 500,
    background: "#fff",
  },
  //Edit NoticeBoard
  Editroot: {
    width: "100%",
    height: "100vh",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editbox: {
    width: 600,
    height: "auto",
    background: "#fff",
    padding: 10,
  },
  editPic: {
    width: 450,
    height: 500,
    background: "#fff",
    padding: 10,
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
});
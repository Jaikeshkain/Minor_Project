import { makeStyles } from "@mui/styles";

export const useStyles=makeStyles({
    root:{
        width:'100%',
        height:"100vh",
        background:"#000",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    box:{
        width:600,
        height:"auto",
        background:"#fff",
        borderRadius:10,
        padding:10
    }
})
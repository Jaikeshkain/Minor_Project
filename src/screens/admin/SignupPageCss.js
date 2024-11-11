import { makeStyles } from "@mui/styles";
import { hover } from "@testing-library/user-event/dist/hover";

export const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    background: "#192a56",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 300,
    height: 450,
    background: "#273c75",
    padding: 5,
    borderRadius: 20,
  },
  textfieldalign: {
    display: "flex",
    alignItems: "flex-end",
    padding:10
  },
});
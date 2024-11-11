import { Divider, Grid } from "@mui/material";

export default function TitleComponent({title,link,page}  ){
    return (
      <div>
        <Grid container>
          <Grid item xs={6}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <span>
                {" "}
                <img src="logo192.png" width={30} />
              </span>
              <span
                style={{ color: "#eccc68", fontSize: 26, fontWeight: "bold" }}
              >
                NoBoard
              </span>
            </div>
            <div style={{ marginLeft: 5 }}>{title}</div>
          </Grid>
          <Grid item xs={6}>
            <a
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "flex-end",
                marginRight: 10,
                marginTop: 10,
                color: "skyblue",
              }}
              href={page}
            >
              {link}
            </a>
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: 20,
                color: "skyblue",
                marginTop: 15,
              }}
            >
              {title}
            </div>
          </Grid>
          <Grid item xs={12}>
            <Divider style={{ background: "#ced6e0",margin:10 }} />
          </Grid>
        </Grid>
      </div>
    );
}
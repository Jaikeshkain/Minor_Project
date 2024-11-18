
import { useStyles } from "./NoticeBoardCss";
import { getData, postData, serverURL } from "../../../services/admin/FetchNodeServices";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, FormControl, Grid, Grid2, InputLabel, List, ListItem, MenuItem, Select } from "@mui/material";
import TitleComponent from "../../../components/TitleComponent";
import { useNavigate } from "react-router-dom";
import { Done } from "@mui/icons-material";

export default function DisplayNoticeBoardFill() {
  var classes = useStyles();
  var navigate=useNavigate()

var username=""
    var admindata=JSON.parse(localStorage.getItem("ADMIN"))
    if(admindata){
      username=admindata.username
    }

  const [noticeBoardList,setNoticeBoardList]=useState([])
  const [open,setOpen]=useState(false)
  const [images,setImages]=useState('')
  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [picture, setPicture] = useState({ file: [] });
  const [department,setDepartment]=useState('')
  const [category,setCategory]=useState('')
  const [length,setLength]=useState(0)
  const [noId,setNoId]=useState('')
  const [selectBox,setSelectBox]=useState('All')
  const [selDepartment,setSelDepartment]=useState("")
  
  

  const fetchallnoticeboardfill = async () => {
    var result = await postData("noticeboard/displaynoticeboardfill", {
      selectbox: selectBox, seldepartment:selDepartment
    });
    if (result.status) {
      setNoticeBoardList(result.data);
    }
  };


  const handleCart=()=>{
    return noticeBoardList.map((item)=>{
      return (
        <div className={classes.cart}>
          <div className={classes.background}>
            <img
              src={`${serverURL}/${item.images[0]}`}
              style={{ width: "100%", height: "100%", transition:"all 0.3s ease",scale:"110%" }}
            />
          </div>
          <div className={classes.details}>
            <div className={classes.title} >{item.eventtitle}</div>
            <div className={classes.description}>
              <div
                dangerouslySetInnerHTML={{ __html: item.description }}
                style={{ wordBreak: "break-word" }}
              ></div>
            </div>
            <div className={classes.link}>
              ....<Button style={{color:'blue',textDecoration:'underline'}} onClick={()=>handleDialog(item)} >View More</Button>
            </div>
          </div>
          <div className={classes.multipleimages}>
            {item.images.length > 1 ? (
              <div>
                <img src="multimage.png" width={35} />
              </div>
            ) : null}
          </div>
        </div>
      );
    })
  }

  const handleDialog=(rowData)=>{
    console.log(rowData)
    setOpen(true)
    setEventTitle(rowData.eventtitle)
    setDescription(rowData.description)
    setEventDate(rowData.eventdate)
    setEventTime(rowData.eventtime)
    setPicture({file:rowData.images})
    setDepartment(rowData.department)
    setCategory(rowData.category)
    setNoId(rowData._id)
  }

  const handleCheck=()=>{
    localStorage.clear()
    navigate('/loginpage')
  }

  const handleClose=()=>{
    setOpen(false)
    setEventTitle('');
    setDescription('');
    setEventDate(null);
    setEventTime(null);
    setPicture({ file: [] });
    setDepartment([])
    setCategory([])
  }

  const handlePrevious=()=>{
    setLength(0)
  }

  const handleNext=()=>{
    setLength(1)
  }

  useEffect(function(){
    fetchallnoticeboardfill()
  },[selectBox,selDepartment])

  const showDialog = () => {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
        <DialogContent>
          <div className={classes.dialogbox}>
            <Grid container spacing={3}>
              <Grid
                item
                xs={6}
                style={{
                  width: "100%",
                  height: 500,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img
                    src={`${serverURL}${picture.file[length]}`}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />

                  <Button
                    onClick={handlePrevious} // Add logic to handle previous image
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "10px",
                      transform: "translateY(-50%)", // Center vertically
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      borderRadius: "50%",
                      minWidth: "40px",
                      height: "40px",
                    }}
                  >
                    {"<"}
                  </Button>

                  <Button
                    onClick={handleNext} // Add logic to handle next image
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)", // Center vertically
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      borderRadius: "50%",
                      minWidth: "40px",
                      height: "40px",
                    }}
                  >
                    {">"}
                  </Button>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className={classes.contents}>
                  <div style={{ fontSize: 24, fontWeight: "bold" }}>
                    Event Title: {eventTitle}
                  </div>
                  <div>Department: {department}</div>
                  <div>Category: {category}</div>
                  <div
                    dangerouslySetInnerHTML={{ __html: `Description: ${description}` }}
                    style={{ wordBreak: "break-word" }}
                  ></div>
                  <div>Event Date: {eventDate}</div>
                  <div>Event Time: {eventTime}</div>
                </div>
              </Grid>
            </Grid>
          </div>
        </DialogContent>

        <DialogActions>
          <Button color="primary" onClick={()=>handleClose()}>Cancel</Button>
          <Button color="primary" onClick={()=>handleClose()} >Done</Button>
        </DialogActions>
      </Dialog>
    );
  };


  const showAllNotice = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} >
          <div>{username}</div>
        </Grid>
        <Grid item xs={12}>
          <TitleComponent
            title={"Display All Notices"}
            link={"Add Notice"}
            page={"/noticeboard"}
          />
        </Grid>
        <Grid item xs={6} >
          <FormControl style={{width:200}}>
            <InputLabel>Club/Department</InputLabel>
            <Select label="Club/Department" value={selDepartment} onChange={(event)=>setSelDepartment(event.target.value)} >
                <MenuItem value="None">-Select-</MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="EE">EE</MenuItem>
                <MenuItem value="ME">ME</MenuItem>
                <MenuItem value="CE">EE</MenuItem>
                <MenuItem value="EC">EC</MenuItem>
                <MenuItem value="club1">CLUB-1</MenuItem>
                <MenuItem value="club2">CLUB-2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <MenuItem
                value="All"
                onClick={() => {
                  setSelectBox("All");
                  fetchallnoticeboardfill();
                }}
              >
                {selectBox === "All" ? (
                  <div
                    style={{
                      fontSize: 20,
                      background: "#C7C5F4",
                      width: 80,
                      textAlign: "center",
                      borderRadius: 20,
                    }}
                  >
                    <img src="Tick.png" width={18} /> All
                  </div>
                ) : (
                  <div>All</div>
                )}
              </MenuItem>
              <MenuItem
                value="Paid"
                onClick={() => {
                  setSelectBox("Paid");
                  fetchallnoticeboardfill();
                }}
              >
                {selectBox === "Paid" ? (
                  <div
                    style={{
                      fontSize: 20,
                      background: "#C7C5F4",
                      width: 80,
                      textAlign: "center",
                      borderRadius: 20,
                    }}
                  >
                    <img src="Tick.png" width={18} /> Paid
                  </div>
                ) : (
                  <div>Paid</div>
                )}
              </MenuItem>
              <MenuItem
                value="Free"
                onClick={() => {
                  setSelectBox("Free");
                  fetchallnoticeboardfill();
                }}
              >
                {selectBox === "Free" ? (
                  <div
                    style={{
                      fontSize: 20,
                      background: "#C7C5F4",
                      width: 80,
                      textAlign: "center",
                      borderRadius: 20,
                    }}
                  >
                    <img src="Tick.png" width={18} /> Free
                  </div>
                ) : (
                  <div>Free</div>
                )}
              </MenuItem>
            </ListItem>
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            justifyContent: "center",
          }}
        >
          {handleCart()}
        </Grid>
        <Grid item xs={12}>
          <Button onClick={handleCheck} variant="contained">
            Check
          </Button>
        </Grid>
      </Grid>
    );
  };


  return (
    <div className={classes.root}>
      <div className={classes.displaybox}>{showAllNotice()}</div>
      {showDialog()}
    </div>
  );


}

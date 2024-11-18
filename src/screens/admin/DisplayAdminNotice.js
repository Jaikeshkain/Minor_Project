import { Button, Dialog, DialogActions, DialogContent, Divider, Grid, List, ListItem, MenuItem } from "@mui/material"
import { postData } from "../../services/admin/FetchNodeServices"
import { useEffect, useState } from "react"
import { useStyles } from "./NoticeBoard/NoticeBoardCss"
import { serverURL } from "../../services/admin/FetchNodeServices"
import TitleComponent from "../../components/TitleComponent"
import { useNavigate } from "react-router-dom"

export default function DisplayAdminNotice(){
    var classes=useStyles()
    var navigate=useNavigate()
    var username=""
    var emailid=""
    var mobileno=""
    var admindata=JSON.parse(localStorage.getItem("ADMIN"))
    if(admindata){
      username=admindata.username
      emailid=admindata.emailid
      mobileno=admindata.mobileno
    }

    const [noticeBoardList, setNoticeBoardList] = useState([]);
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState("");
    const [eventTitle, setEventTitle] = useState("");
    const [description, setDescription] = useState("");
    const [eventDate, setEventDate] = useState(null);
    const [eventTime, setEventTime] = useState(null);
    const [picture, setPicture] = useState({ file: [] });
    const [department, setDepartment] = useState("");
    const [category, setCategory] = useState("");
    const [length, setLength] = useState(0);
    const [noId, setNoId] = useState("");


    const fetchallnoticeboardfillbyadmin_id=async()=>{
        var result=await postData('noticeboard/fetchallnoticeboardfillbyadmin_id',{admin_id:admindata._id})
        if(result.status){
            setNoticeBoardList(result.data)
        }
    }

    useEffect(function(){
        fetchallnoticeboardfillbyadmin_id()
    },[])

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
          <Button color="primary" onClick={()=>navigate(`/displaynoticeboardfill/editnoticeboardfill?noId=${noId}`)} >Edit</Button>
        </DialogActions>
      </Dialog>
    );
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
              ....<Button style={{color:'blue',textDecoration:'underline'}} onClick={()=>handleDialog(item)}  >View More</Button>
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

  const showAllNotice = () => {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div>{username}</div>
          <div>{emailid}</div>
          <div>{mobileno}</div>
        </Grid>
        <Grid item xs={12}>
          <TitleComponent
            title={"Display All Notices"}
            link={"Add Notice"}
            page={"/noticeboard"}
          />
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
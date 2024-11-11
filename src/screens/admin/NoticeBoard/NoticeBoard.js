import { Avatar, Button, Grid, TextField } from "@mui/material"
import { useStyles } from "./NoticeBoardCss"
import TitleComponent from "../../../components/TitleComponent"
import { useMemo, useState } from "react"
import { postData } from "../../../services/admin/FetchNodeServices"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers"
import Swal from "sweetalert2"
import dayjs from "dayjs"
import moment from "moment"

export default function NoticeBoard(){
  var classes=useStyles()

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["image", "link", "video"],
          [
            {
              color: [
                "#000000",
                "#e60000",
                "#ff9900",
                "#ffff00",
                "#008a00",
                "#0066cc",
                "#9933ff",
                "#ffffff",
                "#facccc",
                "#ffebcc",
                "#ffffcc",
                "#cce8cc",
                "#cce0f5",
                "#ebd6ff",
                "#bbbbbb",
                "#f06666",
                "#ffc266",
                "#ffff66",
                "#66b966",
                "#66a3e0",
                "#c285ff",
                "#888888",
                "#a10000",
                "#b26b00",
                "#b2b200",
                "#006100",
                "#0047b2",
                "#6b24b2",
                "#444444",
                "#5c0000",
                "#663d00",
                "#666600",
                "#003700",
                "#002966",
                "#3d1466",
              ],
            },
          ],
        ],
      },
    }),
    []
  );

  const [eventTitle,setEventTitle]=useState('')
  const [description,setDescription]=useState('')
  const [eventDate,setEventDate]=useState(null)
  const [eventTime,setEventTime]=useState(null)
  const [picture, setPicture] = useState({ file: []});
  var file=[]
  var i=0
  
  const handlePicture=(event)=>{
    for(i=0;i<event.target.files.length;i++){
      file.push(event.target.files[i])
    }
    setPicture({file:file})
  }

  const showImages=()=>{
    return picture.file.map((item)=>{
      return <Avatar src={URL.createObjectURL(item)} />
    })
  }

  const handleSubmit=async()=>{
    var formdata=new FormData()
    formdata.append("eventtitle",eventTitle)
    formdata.append("description",description)
    formdata.append("eventdate",eventDate)
    formdata.append("eventtime",eventTime)
    picture.file.forEach((file)=>{
      formdata.append("images",file);
    });
    var result = await postData("noticeboard/submitnotice", formdata);
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

  

  const datepicker=()=>{
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={['DatePicker']} >
          <DatePicker value={eventDate} onChange={(newValue)=>setEventDate(newValue)} label="Enter Event Date" />
        </DemoContainer>
      </LocalizationProvider>
    )
  }

  const timepicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <TimePicker
            value={eventTime}
            onChange={(newValue) => setEventTime(newValue)}
            label="Enter Event Time"
          />
        </DemoContainer>
      </LocalizationProvider>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TitleComponent
              title={"Add New Notice"}
              link={"View Notice"}
              page={"#"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Enter Title"
              fullWidth
              value={eventTitle}
              onChange={(event) => setEventTitle(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              placeholder="Description"
              modules={modules}
              theme="snow"
              onChange={(content) => setDescription(content)}
              value={description}
            />
          </Grid>
          <Grid item xs={6}>
            {datepicker()}
          </Grid>
          <Grid item xs={6}>
            {timepicker()}
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" component="label" fullWidth>
              Upload Poster
              <input
                type="file"
                onChange={handlePicture}
                hidden
                accept="images/*"
                multiple
              />
            </Button>
          </Grid>
          <Grid item xs={6} style={{display:'flex',flexWrap:'wrap',overflow:'auto',width:"100%"}} >
            {picture.file?showImages():<Avatar src="logo192.png" />}
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
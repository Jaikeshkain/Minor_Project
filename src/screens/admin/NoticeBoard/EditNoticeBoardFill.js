import { useSearchParams } from "react-router-dom";
import { Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import TitleComponent from "../../../components/TitleComponent";
import { useMemo, useState, useEffect } from "react";
import { postData, serverURL } from "../../../services/admin/FetchNodeServices";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./NoticeBoardCss";
import dayjs from "dayjs";

export default function EditNoticeBoardFill() {
  const [searchParams] = useSearchParams();
  const noId = searchParams.get("noId");
  var classes = useStyles();
  var navigate = useNavigate();

   var adminData = JSON.parse(localStorage.getItem("ADMIN"));

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

  const [noticeBoardList, setNoticeBoardList] = useState([]);

  const [eventTitle, setEventTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [eventTime, setEventTime] = useState(null);
  const [picture, setPicture] = useState({ file: [] });
  const [images, setImages] = useState([]);
  const [showBtn, setShowBtn] = useState(false);
  const [tempPic, setTempPic] = useState([]);
  const [category,setCategory]=useState('')
  const [department,setDepartment]=useState('')

  const fetchallnoticeboardfillbyid = async () => {
    var result = await postData("noticeboard/fetchnoticeboardfillbynoId", {
      noId: noId,
    });
    if (result.status) {
      setEventTitle(result.data.eventtitle);
      setDescription(result.data.description);
      setEventDate(dayjs(result.data.eventdate)); // Convert to dayjs object
      setEventTime(dayjs(result.data.eventtime)); // Convert to dayjs object
      setPicture({ file: result.data.images });
      setTempPic(result.data.images);
    } else {
      navigate("/displaynoticeboardfill");
    }
  };

  useEffect(function () {
    fetchallnoticeboardfillbyid();
  }, []);

  const datepicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            value={eventDate} // Use the dayjs object
            onChange={(newValue) => setEventDate(newValue)} // Updates with dayjs object
            label="Enter Event Date"
          />
        </DemoContainer>
      </LocalizationProvider>
    );
  };

  const timepicker = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <TimePicker
            value={eventTime} // Use the dayjs object
            onChange={(newValue) => setEventTime(newValue)} // Updates with dayjs object
            label="Enter Event Time"
          />
        </DemoContainer>
      </LocalizationProvider>
    );
  };

  var file = [];
  var i = 0;

  const EditImage = (event) => {
    setShowBtn(true);
    for (i = 0; i < event.target.files.length; i++) {
      file.push(event.target.files[i]);
    }
    setPicture({ file: file });
  };

  const showImages = () => {
    if (!showBtn) {
      return picture.file.map((item) => {
        return (
          <Avatar
            variant="square"
            src={`${serverURL}${item}`}
            style={{
              width: 350,
              height: 200,
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
            }}
          />
        );
      });
    } else {
      return picture.file.map((item) => {
        return (
          <Avatar
            variant="square"
            src={URL.createObjectURL(item)}
            style={{
              width: 350,
              height: 200,
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
            }}
          />
        );
      });
    }
  };

  const handlePicCancel=()=>{
    setShowBtn(false)
    setPicture({file:tempPic})
  }

  const handleEditDetails=async()=>{
    var body={eventtitle:eventTitle,description:description,eventdate:eventDate,eventtime:eventTime,noId:noId}
    var result=await postData('noticeboard/editnoticeboardfill',body)
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

  const handleDeleteDetails=async()=>{
    Swal.fire({
                toast: true,
                title: 'Do you want to Delete Category?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Yes',
                denyButtonText: 'No',
                customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                    denyButton: 'order-3',
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    var result=await postData('noticeboard/deletenoticeboardfill',{noId:noId})
                    
                    Swal.fire('Deleted!', '', 'success')
                    navigate('/displaynoticeboardfill')
                    
                    
                } else if (result.isDenied) {
                    Swal.fire('Your Data is safe', '', 'info')
                }
            })
  }

  const handleEditPic=async ()=>{
    var formdata=new FormData()
    formdata.append("noId",noId)
    picture.file.forEach((file) => {
      formdata.append("images", file);
    });
    var result=await postData('noticeboard/editnoticeboardfillPic',formdata)
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

  if(adminData){

  return (
    <div className={classes.Editroot}>
      <div className={classes.editbox}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TitleComponent
              title={"Edit Notice"}
              link={"View Notice"}
              page={"/displaynoticeboardfill"}
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
            <FormControl fullWidth>
              <InputLabel>Department</InputLabel>
              <Select
                label="Department"
                value={department}
                onChange={(event) => setDepartment(event.target.value)} // Correctly updates state
              >
                <MenuItem value="0">-Select-</MenuItem>
                <MenuItem value="CSE">CSE</MenuItem>
                <MenuItem value="EE">EE</MenuItem>
                <MenuItem value="ME">ME</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)} // Correctly updates state
              >
                <MenuItem value="None">None</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Free">Free</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <Button variant="contained" onClick={handleEditDetails} fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" onClick={handleDeleteDetails} fullWidth>
              Delete
            </Button>
          </Grid>
        </Grid>
      </div>
      <div className={classes.editPic}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {showImages()}
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {showBtn ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  width: 400,
                }}
              >
                <Button variant="contained" onClick={handleEditPic}>
                  Edit
                </Button>
                <Button variant="contained" onClick={() => handlePicCancel()}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div>
                <Button variant="contained" component="label">
                  Update Poster
                  <input
                    type="file"
                    accept="images/*"
                    onChange={EditImage}
                    multiple
                    hidden
                  />
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
else{
    navigate('/loginpage')
}
}

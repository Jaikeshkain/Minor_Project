import SignupPage from "./screens/admin/SignupPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./screens/admin/LoginPage";
import NoticeBoardfill from "./screens/admin/NoticeBoard/NoticeBoardfill";
import DisplayNoticeBoardFill from "./screens/admin/NoticeBoard/DisplayNoticeBoardFill";
import EditNoticeBoardFill from "./screens/admin/NoticeBoard/EditNoticeBoardFill";
import DisplayAdminNotice from "./screens/admin/DisplayAdminNotice";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<SignupPage />} path="/signuppage" />
          <Route element={<LoginPage />} path="/loginpage" />
          <Route element={<NoticeBoardfill />} path="/noticeboard" />
          <Route element={<DisplayNoticeBoardFill />} path="/" />
          <Route element={<EditNoticeBoardFill />} path="/displaynoticeboardfill/editnoticeboardfill" />
          <Route element={<DisplayAdminNotice />} path="/adminpage" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

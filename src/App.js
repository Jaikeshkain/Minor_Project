import SignupPage from "./screens/admin/SignupPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./screens/admin/LoginPage";
import NoticeBoard from "./screens/admin/NoticeBoard/NoticeBoard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<SignupPage />} path="/signuppage" />
          <Route element={<LoginPage />} path="/loginpage" />
          <Route element={<NoticeBoard />} path="/noticeboard" />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import axios from "axios";
import OauthGoogleCallback from "./pages/OauthGoogleCallback";

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <Routes>
        <Route Component={ProtectedRoutes}>
          <Route path="/*" Component={MainLayout} />
        </Route>
        <Route path="login" Component={Login} />
        <Route path="register" Component={Register} />
        <Route path="oauth/google/callback" Component={OauthGoogleCallback} />
      </Routes>
    </Router>
  );
};

export default App;

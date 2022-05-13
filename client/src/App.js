import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useSelector } from "react-redux";


const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route user>
        <Route exact path="/" element={<Home />}/>
        </Route>
        <Route path="/login" element={user ? <Navigate replace to="/" /> : <Login />}/>
        <Route path="/register" element={user ? <Navigate replace to="/" /> : <Register />}/>
        <Route path="/forgot" element={<Forgot/>} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </Router>
  );
};

export default App;
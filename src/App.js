import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/index.js";
import Home from "./Components/Home/index.js";
import SignUp from "./Components/SignUp/index.js";

const App = () => (
  <Routes>
    <Route exact path="/" element={<Login />} />
    <Route exact path="/signup" element={<SignUp />} />
    <Route exact path="/home" element={<Home />} />
  </Routes>
);

export default App;

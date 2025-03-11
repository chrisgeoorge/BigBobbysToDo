import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import SignUp from "./Components/Signup";
import "./App.css";
import AddToDo from "./Components/AddToDo";
import ViewAllTasks from "./Components/ViewAllTasks";
import ViewMyTasks from "./Components/ViewMyTasks";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/addtodo" element={<AddToDo/>} />
        <Route path="/viewmine" element={<ViewMyTasks/>} />
        <Route path="/viewall" element={<ViewAllTasks/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Users from "./Table/Users";
import CreateUser from "./Table/CreateUser";
import UpdateUsers from "./Table/UpdateUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path="/create" element={<CreateUser />}></Route>
        <Route path="/update/:id" element={<UpdateUsers />}></Route>
      </Routes>
    </div>
  );
}

export default App;

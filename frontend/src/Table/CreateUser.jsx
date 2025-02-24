import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { backedURL } from "../App";

const CreateUser = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addUser = await axios.post(
        backedURL + "/api/create",
        user
      );
      const response = addUser.data;
      if (response.success) {
        toast.success(response.Message);
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log(user);
  };

  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <Link to="/" className="btn btn-success mb-2">
            Go Back
          </Link>
          <form onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <div className="mb-2">
              <label htmlFor="">Name</label>
              <input
                type="text"
                value={user.name}
                name="name"
                placeholder="Enter Name"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                value={user.email}
                placeholder="Enter Email"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Address</label>
              <input
                type="text"
                name="address"
                value={user.address}
                placeholder="Enter Age"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="">Phone</label>
              <input
                type="text"
                name="phone"
                value={user.phone}
                placeholder="Enter Phone"
                className="form-control"
                required
                onChange={handleChange}
              />
            </div>
            <button className="btn btn-success mt-2">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;

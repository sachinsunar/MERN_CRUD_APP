import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { backedURL } from "../App";

const UpdateUsers = () => {
  const { id } = useParams();
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

  useEffect(() => {
    axios
      .get(`${backedURL}/api/getone/${id}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateUser = await axios.put(
        `${backedURL}/api/update/${id}`,
        user
      );
      const response = updateUser.data;
      if (response.success) {
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message); // Handle failure case
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.response?.data?.message || "Failed to update user.");
    }
  };

  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="w-50 bg-white rounded p-3">
          <Link to="/" className="btn btn-success mb-2">
            Go Back
          </Link>
          <form onSubmit={handleSubmit}>
            <h2>Update User</h2>
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
            <button className="btn btn-success mt-2">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};
export default UpdateUsers;

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Users = () => {
  let [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function userData() {
      try {
        const userdata = await axios.get("http://localhost:3000/api/read");
        const response = userdata.data;
        setUsers(response.user);
      } catch (error) {
        console.log(error);
      }
    }
    userData();
  }, []);

  //delete user
  const handleDelete = async (id) => {
    try {
      const deleteUser = await axios.delete(
        `http://localhost:3000/api/delete/${id}`
      );
      const response = deleteUser.data;
      if (response.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        toast.success(response.message);
      } else {
        toast.error(response.message); // Handle failure case
      }
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.response?.data?.message || "Failed to update user.");
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add+
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>
                  <Link
                    to={`/update/${user._id}`}
                    className="btn btn-success ms-2 "
                  >
                    Edit
                  </Link>
                  <Link
                    className="btn btn-danger ms-2 "
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(user._id);
                    }}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

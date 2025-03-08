import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { backedURL } from "../App";

const Users = () => {
  let [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function userData() {
      try {
        const userdata = await axios.get(backedURL + "/api/read");
        setUsers(userdata.data.user);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    userData();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    setLoading(true)
    try {
      const deleteUser = await axios.delete(`${backedURL}/api/delete/${id}`);
      const response = deleteUser.data;
      if (response.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete user.");
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center p-3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 bg-white rounded p-3 shadow">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="m-0">User List</h4>
              <Link to="/create" className="btn btn-success btn-sm">Add+</Link>
            </div>
            {
              loading ? <div>
                <span className="spinner-border spinner-border-sm align-center" role="status" aria-hidden="true"></span>
              </div> : <div className="table-responsive" style={{ overflowX: "auto" }}>
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td style={{ wordBreak: "break-word" }}>{user.email}</td>
                        <td style={{ whiteSpace: "pre-wrap" }}>{user.address}</td>
                        <td className="d-flex gap-2">
                          <Link to={`/update/${user._id}`} className="btn btn-success btn-sm">
                            Edit
                          </Link>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user._id)}>
                            {loading ? <span className="spinner-border spinner-border-sm align-center" role="status" aria-hidden="true"></span> : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {users.length === 0 && <p className="text-center text-muted">No users found.</p>}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;

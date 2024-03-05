"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { GET_ALL_USERS_API_URL } from "../common/constants/apiURLs";
import { fetchAllUsersFailure, fetchAllUsersSuccess } from "../../store/actions/dataActions";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const allUsers = user.users;
  const isAdmin = user.isAdmin;

  useEffect(() => {
    axios
      .get(GET_ALL_USERS_API_URL)
      .then((response) => {
        dispatch(fetchAllUsersSuccess(response.data));
      })
      .catch((error) => dispatch(fetchAllUsersFailure(error)))
      .finally(() => setLoading(false));
  }, [dispatch]);

  return (
    <>
      {isAdmin && (
        <div>
          <h2>User Count: {allUsers.length}</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.created_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  );
};

export default AdminDashboard;

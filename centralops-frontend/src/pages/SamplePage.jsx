import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/app/userSlice";

export const SamplePage = () => {
  const dispatch = useDispatch();
  const usersState = useSelector((state) => state.users);

  useEffect(() => {
    // Dispatch Redux action to fetch users
    dispatch(getUsers());
  }, [dispatch]);

  // You can log the state to see what Redux stores
  console.log("Users state:", usersState);

  return (
    <div>
      <h1 className="text-black">Sample Page for Redux Testing</h1>

      {usersState.loading && <p>Loading users...</p>}
      {usersState.error && <p>Error: {usersState.error}</p>}

      <ul>
        {usersState.list.map((user) => (
          <li key={user.empId}>
            {user.firstName} {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
};

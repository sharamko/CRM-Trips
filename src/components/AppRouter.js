import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Login';
import MyProfile from './MyProfile';
import Users from './Users';
import Trips from './Trips';
import AddTrips from './AddTrips';

const AppRouter = () => {
  const user = useSelector((state) => state.reducer.user);
  const userInfo = useSelector((state) => state.reducer.userInfo);

  return user ? (
    <Routes>
      <Route path="myprofile" element={<MyProfile />} />

      {userInfo && userInfo.admin === true ? (
        <>
          <Route path="users/" element={<Users />} />
          <Route path="users/:userId" element={<Users />} />
          <Route path="users/:userId/:edit" element={<Users />} />
        </>
      ) : null}
      <Route path="trips" element={<Trips />} />
      <Route path="trips/:tripId" element={<Trips />} />
      <Route path="trips/:tripId/:edit" element={<Trips />} />
      <Route path="addtrips" element={<AddTrips />} />
      <Route path="*" element={<Navigate replace to="/myprofile" />} />
    </Routes>
  ) : (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};

export default AppRouter;

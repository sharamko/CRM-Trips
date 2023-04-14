import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Loader from './Loader';
import UserInfo from './UserInfo';
import { useSelector } from 'react-redux';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState(null);
  const userInfo = useSelector((state) => state.reducer.userInfo);
  useEffect(() => {
    getDoc(doc(db, 'users', userId)).then((user) => setUser(user.data()));
  }, []);
  return (
    <>
      {user ? (
        <UserInfo
          title="Профіль користувача"
          user={user}
          isAdmin={userInfo.admin}
        />
      ) : (
        <Loader />
      )}
    </>
  );
};

export default UserPage;

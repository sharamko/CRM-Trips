import React from 'react';
import { collection } from 'firebase/firestore';
import { db } from '../firebase';
import Loader from './Loader';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import UserPage from './UserPage';
import UsersList from './UsersList';
import UserEdit from './UserEdit';

const Users = () => {
  const [users, loading] = useCollectionData(collection(db, 'users'));
  const { userId, edit } = useParams();
  return (
    <>
      {loading ? (
        <Loader />
      ) : userId ? (
        edit ? (
          <UserEdit userId={userId} />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersList users={users} />
      )}
    </>
  );
};

export default Users;

import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UsersList = ({ users }) => {
  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Користувачі</h2>
      <div className="list-group w-75 m-4">
        {users.map((user) => (
          <Link
            className="list-group-item list-group-item-action"
            key={user.userId}
            to={`${user.userId}`}
          >
            {user.name}
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default UsersList;

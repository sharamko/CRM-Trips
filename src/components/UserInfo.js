import React from 'react';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserInfo = ({ user, title, isAdmin }) => {
  const history = useNavigate();
  return (
    <Container style={{ fontSize: '16px' }} className="mt-4">
      <h2 className="text-center mb-4">{title}</h2>

      <p>
        Імя: <b>{user.name}</b>
      </p>
      {user.admin ? (
        <p>
          Посада: <b>Администратор</b>
        </p>
      ) : user.prof === null || user.prof === 'null' ? null : (
        <p>
          Роль: <b>{user.prof}</b>
        </p>
      )}
      <p>
        Електронна пошта: <b>{user.email}</b>
      </p>
      {isAdmin && (
        <Button
          onClick={() => history(`/users/${user.userId}/edit`)}
          variant="danger"
        >
          Редагувати дані
        </Button>
      )}
    </Container>
  );
};

export default UserInfo;

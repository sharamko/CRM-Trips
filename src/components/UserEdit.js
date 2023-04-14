import React, { useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Form } from 'react-bootstrap';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const UserEdit = ({ userId }) => {
  const [currentData, setCurrentData] = useState(null);
  const history = useNavigate();
  useEffect(() => {
    getDoc(doc(db, 'users', userId)).then((user) =>
      setCurrentData(user.data())
    );
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'admin') {
      setCurrentData((prev) => ({
        ...prev,
        [e.target.name]: !prev.admin,
      }));
    } else {
      setCurrentData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'users', currentData.userId), currentData);
    history(`/users/${userId}`);
  };

  return currentData ? (
    <Container>
      <h2 className="text-center mb-4">Редагувати користувача</h2>
      <Form>
        <Form.Group controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Імя:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="text"
              name="name"
              value={currentData.name}
              placeholder="Імя"
              onChange={handleChange}
              required
              minLength={3}
            />
          </Col>
        </Form.Group>
        <Form.Group controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Електронна пошта:
          </Form.Label>
          <Col sm={8}>
            <Form.Control
              type="email"
              name="email"
              value={currentData.email}
              placeholder="Електронна пошта"
              onChange={handleChange}
              required
            />
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group>
            <Form.Label name="prof" as="legend" column sm={2}>
              Посада:
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Не обирати"
                value="null"
                name="prof"
                id="formHorizontalRadios1"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Водій"
                value="Водій"
                name="prof"
                id="formHorizontalRadios1"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Пасажир"
                value="Пасажир"
                name="prof"
                id="formHorizontalRadios2"
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Диспетчер"
                value="Диспетчер"
                name="prof"
                id="formHorizontalRadios3"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group className="my-4" controlId="formHorizontalCheck">
          <Col sm={{ span: 10 }}>
            <Form.Check
              name="admin"
              checked={currentData.admin}
              onChange={handleChange}
              label="Адміністратор"
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Col sm={{ span: 10 }}>
            <Button
              disabled={
                currentData.name.length < 3 || currentData.email.length < 4
              }
              type="submit"
              onClick={handleSubmit}
            >
              Зберегти
            </Button>
          </Col>
        </Form.Group>
        <div className="my-2 w-75 ">
          {currentData.name.length < 3 ? (
            <Alert variant="danger">
              Імя має складатися із 3 та більше символів!
            </Alert>
          ) : null}
          {currentData.email.length < 5 ? (
            <Alert variant="danger">
              Електронна пошта має складатися із 5 та більше символів!
            </Alert>
          ) : null}
        </div>
      </Form>
    </Container>
  ) : (
    <Loader />
  );
};

export default UserEdit;

import React from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const FormTrip = ({ edit, handleChange, handleSubmit, trip }) => {
  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">
        {edit ? 'Редагувати' : 'Додати'} поїздку
      </h2>
      <Form>
        <Form.Group className="my-4" controlId="formBasicEmail">
          <Form.Label>Назва поїздки:</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            value={trip.name}
            name="name"
            placeholder="Введіть назву поїздки"
          />
        </Form.Group>
        <Form.Group className="my-4" controlId="formBasicEmail">
          <Form.Label>Звідки:</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            value={trip.start}
            name="start"
            placeholder="Введіть початок маршруту"
          />
        </Form.Group>
        <Form.Group className="my-4" controlId="formBasicEmail">
          <Form.Label>Куди:</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            value={trip.end}
            name="end"
            placeholder="Введіть кінець маршруту"
          />
        </Form.Group>
        <Form.Group className="my-4" controlId="formBasicEmail">
          <Form.Label>Кількість пасажирів:</Form.Label>
          <Form.Control
            type="number"
            onChange={handleChange}
            value={trip.numOfPass}
            name="numOfPass"
            placeholder="Введіть кількість пасажирів"
          />
        </Form.Group>
        <Form.Group className="my-4" controlId="formBasicEmail">
          <Form.Label>Номер автомобіля:</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
            value={trip.idCar}
            name="idCar"
            placeholder="Введіть номер автомобіля"
          />
        </Form.Group>

        <Button
          variant="primary"
          disabled={
            trip.name.length < 1 ||
            trip.start.length < 1 ||
            trip.end.length < 1 ||
            trip.idCar.length < 1 ||
            trip.numOfPass.length < 1
          }
          onClick={handleSubmit}
          type="submit"
        >
          {edit ? 'Редагувати' : 'Додати'}
        </Button>
        <div className="my-2 w-75 ">
          {trip.name.length < 1 ||
          trip.start.length < 1 ||
          trip.end.length < 1 ||
          trip.idCar.length < 1 ||
          trip.numOfPass.length < 1 ? (
            <Alert variant="danger">Заповніть всі поля!</Alert>
          ) : null}
        </div>
      </Form>
    </Container>
  );
};

export default FormTrip;

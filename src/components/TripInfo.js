import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { Button, Container } from 'react-bootstrap';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TripInfo = ({ tripId }) => {
  const userInfo = useSelector((state) => state.reducer.userInfo);
  const history = useNavigate();
  const [trip, setTrip] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!trip) {
      getDoc(doc(db, 'trips', tripId)).then((trip) => setTrip(trip.data()));
    } else if (trip) {
      getDoc(doc(db, 'users', trip.creator)).then((user) =>
        setUser(user.data())
      );
    }
  }, [trip]);

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'trips', tripId));
    history('/trips');
  };
  return trip && user ? (
    <Container>
      <h2 className="text-center mb-4">Поїздка: {trip.name}</h2>
      <p>
        Звідки: <b>{trip.start}</b>
      </p>
      <p>
        Куди: <b>{trip.end}</b>
      </p>
      <p>
        Кількість пасажирів: <b>{trip.numOfPass}</b>
      </p>
      <p>
        Номер авто: <b>{trip.idCar}</b>
      </p>
      <p>
        Створив поїздку: <b>{user.name}</b>
        {user.prof ? ` (${user.prof})` : user.admin ? ' (Адміністратор)' : null}
      </p>

      {userInfo.admin || trip.creator === userInfo.userId ? (
        <div>
          <Button
            className="m-2"
            onClick={() => history('/trips')}
            variant="primary"
          >
            Всі поЇздки
          </Button>
          <Button
            className="m-2"
            onClick={() => history(`/trips/${trip.id}/edit`)}
            variant="warning"
          >
            Редагувати поїздку
          </Button>
          <Button className="m-2" onClick={handleDelete} variant="danger">
            Видалити поїздку
          </Button>
        </div>
      ) : null}
    </Container>
  ) : (
    <Loader />
  );
};

export default TripInfo;

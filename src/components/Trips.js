import { collection } from 'firebase/firestore';
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../firebase';
import Loader from './Loader';
import TripInfo from './TripInfo';
import AddTrips from './AddTrips';

const Trips = () => {
  const { tripId, edit } = useParams();
  const history = useNavigate();
  const [trips, loading] = useCollectionData(collection(db, 'trips'));
  return (
    <Container className="my-4">
      {!tripId && !edit ? <h2 className="text-center mb-4">Поїздки</h2> : null}
      {tripId ? null : (
        <Button onClick={() => history('/addtrips')} variant="danger">
          Додати поїздку
        </Button>
      )}
      {loading ? (
        <Loader />
      ) : tripId ? (
        edit ? (
          <AddTrips />
        ) : (
          <TripInfo tripId={tripId} />
        )
      ) : (
        <div className="list-group w-75 my-4">
          {trips.map((trip) => (
            <Link
              className="list-group-item list-group-item-action"
              key={trip.id}
              to={`${trip.id}`}
            >
              {trip.name}
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Trips;

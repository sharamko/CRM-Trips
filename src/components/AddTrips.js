import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
import FormTrip from './FormTrip';

const AddTrips = () => {
  const history = useNavigate();
  const { tripId, edit } = useParams();
  const user = useSelector((state) => state.reducer.user);
  const [trip, setTrip] = useState({
    name: '',
    start: '',
    end: '',
    numOfPass: '',
    idCar: '',
    creator: user.uid,
    id: `${user.uid}_${Date.now()}`,
  });

  useEffect(() => {
    if (edit) {
      getDoc(doc(db, 'trips', tripId)).then((trip) => setTrip(trip.data()));
    }
  }, []);

  const handleChange = (e) => {
    setTrip((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'trips', trip.id), trip);
    history('/trips');
  };
  return trip ? (
    <FormTrip
      edit={edit}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      trip={trip}
    />
  ) : (
    <Loader />
  );
};

export default AddTrips;

import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { setUser, setUserInfo } from './store/slice';
import { useDispatch } from 'react-redux';
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from './components/Loader';
import { doc, setDoc, getDoc } from 'firebase/firestore';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user != null) {
        dispatch(setUser(auth.currentUser));
        const userInfo = {
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          prof: null,
          admin:
            auth.currentUser.email === 'sharamko25@gmail.com' ? true : false,
          userId: auth.currentUser.uid,
        };

        const beUser = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (!beUser.exists()) {
          await setDoc(doc(db, 'users', auth.currentUser.uid), userInfo);
          dispatch(setUserInfo(userInfo));
        } else {
          dispatch(setUserInfo(beUser.data()));
        }
      }
    });
  }, [auth]);

  const [_, loading] = useAuthState(auth);
  {
    if (loading) {
      return <Loader />;
    }
  }
  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;

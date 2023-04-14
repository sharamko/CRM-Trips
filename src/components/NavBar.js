import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../firebase';
import { setUser } from '../store/slice';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const user = useSelector((state) => state.reducer.user);
  const userInfo = useSelector((state) => state.reducer.userInfo);
  const dispatch = useDispatch();
  const handleLogout = () => {
    auth.signOut();
    dispatch(setUser(null));
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Link
        style={{ fontSize: '20px' }}
        className="badge badge-warning"
        to="panel"
      >
        Trips
      </Link>
      {user ? (
        <Button
          onClick={handleLogout}
          className="login-logout"
          variant="danger"
        >
          Выйти
        </Button>
      ) : (
        <Button className="login-logout" variant="primary">
          Войти
        </Button>
      )}

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Link className="nav-link" to="myprofile">
            Мій кабінет
          </Link>
          {user && userInfo && userInfo.admin === true ? (
            <Link className="nav-link" to="users">
              Користувачі
            </Link>
          ) : null}

          <Link className="nav-link" to="trips">
            Поїздки
          </Link>
        </Nav>
      </Navbar.Collapse>

      {user ? (
        <Button
          onClick={handleLogout}
          className="login-logout2"
          variant="danger"
        >
          Вийти
        </Button>
      ) : (
        <Button className="login-logout2" variant="primary">
          Увійти
        </Button>
      )}
    </Navbar>
  );
};

export default NavBar;

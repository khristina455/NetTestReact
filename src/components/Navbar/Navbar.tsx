import { FC, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Navbar.css";
import { useAuth } from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../api";

const Navbar: FC = () => {
  const { is_authenticated, user_login, is_moderator, auth, resetUser } =
    useAuth();
  const navigate = useNavigate();

  const getData = async () => {
    await auth();
  };

  const handleClick = async (e: any) => {
    e.preventDefault();

    try {
      const response = await api.api.logoutCreate();
      resetUser();
      navigate("/");
    } catch (error) {
      resetUser();
      navigate("/");
    }
  };

  useEffect(() => {
    if (!is_authenticated) {
      getData()
        .then(() => {
          console.log(is_authenticated);
        })
        .catch((error) => {
          console.log(error);
          resetUser();
        });
    }
  }, []);

  const getAdminNavbar = () => (
    <Row className="navbar">
      <Col className="navbar__logo">
        <Link to="/">
          <img src="/logo.svg" />
        </Link>
      </Col>
      <Link className="navbar__text" to="/modelings/">
        Услуги
      </Link>
      <Link className="navbar__text" to="/requests">
        Заявки
      </Link>
      <Link className="navbar__text" to="/modelings/table">Таблица услуг</Link>
      <button className="navbar__text" onClick={handleClick}>
        Выйти
      </button>
      <div className="navbar__text">{user_login}</div>
    </Row>
  );

  const getUserNavbar = () => (
    <Row className="navbar">
      <Col className="navbar__logo">
        <Link to="/">
          <img src="/logo.svg" />
        </Link>
      </Col>
      <Link className="navbar__text" to="/modelings/">
        Услуги
      </Link>
      <Link className="navbar__text" to="/requests">
        Заявки
      </Link>
      <button className="navbar__text" onClick={handleClick}>
        Выйти
      </button>
      <div className="navbar__text">{user_login}</div>
    </Row>
  );

  const getGuestNavbar = () => (
    <Row className="navbar">
      <Col className="navbar__logo">
        <Link to="/">
          <img src="/logo.svg" />
        </Link>
      </Col>
      <Col className="navbar__text">
        <Link to="/">Услуги</Link>
      </Col>
      <Col className="navbar__text">
        <Link to="/login">Войти | Регистрация</Link>
      </Col>
    </Row>
  );

  const getNavbar = () => {
    if (!is_authenticated) {
        return getGuestNavbar()
    } else if (!is_moderator) {
        return getUserNavbar()
    } else {
        return getAdminNavbar()
    }
  };

  return <Container className="navbar-container">{getNavbar()}</Container>;
};

export default Navbar;

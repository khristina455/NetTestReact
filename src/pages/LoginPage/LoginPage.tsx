import { FC, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import Breadcrumbs from "../../components/BreadCrumbs/BreadCrumbs"
import { Container, Row, Col } from "react-bootstrap"
import {api} from '../../api/index'
import "./LoginPage.css"
import { useAuth } from "../../hooks/useAuth.ts";


const LoginPage: FC = () => {
    const navigate = useNavigate()
    const {setUser, auth} = useAuth()

    const handleLogin = async (e: any) => {
        e.preventDefault()
        const response = await api.api.signInCreate({login: e.target.login.value, password: e.target.password.value})

        if (response.status == 200) {
            const data = {
                is_authenticated: true,
                is_moderator: response.data["isAdmin"],
                user_id: response.data["userId"],
                user_login: e.target.login.value,
            }

            console.log(data)
            setUser(data)
            navigate("/modelings")
        }
        return false        
    }
    

    const handleAuth  = async () => {
        const flag = await auth()
        if (flag) {
            navigate("/")
        }
    }

    useEffect(() => {
        handleAuth().then(() => {
        }).catch((error) => {
            console.log(error)
        })
    }, []);

    return (
        <div className="site-body">
        <Container>
            <Row>
                {<Breadcrumbs pages={[ { link: `/login`, title: "Вход" } ]} />}
            </Row>
            <Row>
                <Container style={{ marginLeft: "30px", marginTop: "30px" , width: "360px"}}>
                    <Row style={{ display: "flex" }}>
                        <h1 style={{ fontSize: "36px", fontWeight: "500" }}>Вход в аккаунт</h1>
                    </Row>
                    <form onSubmit={ handleLogin } id="login-form" style={{ marginTop: "30px" }}>
                        <Row>
                            <Col className="left-col">
                                <h3>Логин пользователя</h3>
                            </Col>
                            <Col className="right-col">
                                <input type="text" className="input-form" name="login" placeholder="Введите логин пользователя" required />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="left-col">
                                <h3>Пароль</h3>
                            </Col>
                            <Col className="right-col">
                                <input type="password" className="input-form" name="password" placeholder="Введите пароль" required />
                            </Col>
                        </Row>
                        <Row>

                                <button id="login-button" className="login-button" style={{marginTop: "24px"}} type="submit">Войти</button>

                        </Row>
                    </form>

                    <Link to="/signup" className="form-link" style={{ textDecoration: "None"}}><h3>Регистрация</h3></Link>
                </Container>
            </Row>
        </Container>
        </div>
    )
}

export default LoginPage;
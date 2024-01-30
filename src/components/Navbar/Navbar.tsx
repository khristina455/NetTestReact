import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Navbar.css'


const Navbar: FC = () => {
    return (
        <Container className='navbar-container'>
            <Row className='navbar'>
                <Col className='navbar__logo'><a href='/'><img src='/NetTestReact/logo.svg' /></a></Col>
                <Col className='navbar__text' href='/'>
                 <a href='/'>Услуги</a>
                </Col>
            </Row>     
        </Container>
    )
}

export default Navbar

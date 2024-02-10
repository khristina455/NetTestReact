import { FC } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Navbar.css'
import { Link } from 'react-router-dom'


const Navbar: FC = () => {
    return (
        <Container className='navbar-container'>
            <Row className='navbar'>
                <Col className='navbar__logo'><Link to='/NetTestReact/'><img src='/NetTestReact/logo.svg' /></Link></Col>
                <Col className='navbar__text' href='/NetTestReact/'>
                 <Link to='/NetTestReact/'>Услуги</Link>
                </Col>
            </Row>     
        </Container>
    )
}

export default Navbar

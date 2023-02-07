import React from 'react';
import Login from '../components/Login';
import ImageCollage from '../components/ImageCollage';
import {Container, Col, Row} from 'react-bootstrap';

const LoginPage = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <Login/>
                </Col>
                <Col>
                    <ImageCollage/>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage
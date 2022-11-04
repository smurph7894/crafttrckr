import React from 'react';
import RegisterForm from '../components/RegisterForm';
import ImageCollage from '../components/ImageCollage';
import {Container, Col, Row} from 'react-bootstrap';

const Register = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <RegisterForm/>
                </Col>
                <Col>
                    <ImageCollage/>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
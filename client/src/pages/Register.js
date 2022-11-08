import React from 'react';
import RegisterForm from '../components/RegisterForm';
import ImageCollage from '../components/ImageCollage';
import {Container, Col, Row, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <Row>
                <Col>
                    <RegisterForm/>
                    <Button
                        style={{margin: "0rem .8rem", backgroundColor: "gray", border: "gray"}}
                        onClick={()=> navigate('/')}
                    >
                    Back to Home
                    </Button>
                </Col>
                <Col>
                    <ImageCollage/>
                </Col>
            </Row>
        </Container>
    )
}

export default Register
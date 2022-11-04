import React, {useEffect, useState} from 'react';
import Login from '../components/Login';
import ImageCollage from '../components/ImageCollage';
import {Container, Col, Row} from 'react-bootstrap';
import UserLogo from '../components/sub-components/UserLogo';

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
            <UserLogo />
        </Container>
    )
}

export default LoginPage
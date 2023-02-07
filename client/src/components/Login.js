import React, {useState} from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import {Container, Form, Col, Row, Button} from 'react-bootstrap';
import { userState } from '../GlobalState';
import log from '../helpers/logging';

const Login = () => {

    const[error, setError] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const navigate = useNavigate();

    const onLoginHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/crafttrckr/user/login", {email: userEmail, password: userPassword})
            .then((res)=>{
                log(res.data.user);
                userState(res.data.user);
                navigate(`/home`);
            })
            .catch((err)=>{
                log("error.response.data.errors:", err.response.data.errors);
                setError("Your email or password is incorrect. ");
            });
    };

    return (
        <Container>
            <Row style={{padding: ".5rem"}}>
                <h1 style={{margin: "3rem 0rem", padding: "0", fontWeight:"800", color: "blue"}}>CRAFT TRCKR</h1>
            </Row>
            <Row>
                <Col>
                    <Row>
                        <h3>Login</h3>
                        <Form onSubmit={onLoginHandler}>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    onChange={(e)=> setUserEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={(e)=> setUserPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Row>
                                    <Col>
                                        <Button type="submit" className="btn btn-primary btn-lg" style={{margin: "2rem 0rem .25rem 0rem"}}>
                                            Login
                                        </Button>
                                    </Col>
                                    <Col></Col>
                                    <Col></Col>
                                </Row>
                                <Row style={{margin: "0rem 0rem 1rem 0rem", fontWeight: "600"}}>
                                    {
                                    error?
                                    <Form.Text style={{padding: "0"}}>{error}</Form.Text>
                                    :null
                                    }
                                </Row>
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row>
                        <Link to={"/register"}>Create an Account</Link>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Login
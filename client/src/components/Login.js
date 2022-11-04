import React, {useState} from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import {Container, Form, Col, Row, Button} from 'react-bootstrap';
import ImageCollage from './ImageCollage';

const Login = () => {

    const[error, setError] = useState({});
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const onLoginHandler=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/crafttrckr/user/login", {email: userEmail, password: userPassword})
            .then((res)=>{
                console.log(res.data.user);
                setUser(res.data.user);
                navigate(`/user/${user._id}`);
            })
            .catch((err)=>{
                console.log("error.response.data.errors:", err.response.data.errors);
                setError("Your email or password is incorrect. ");
            })
    }

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
                                {
                                error.email?
                                <Form.Text>{error}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    onChange={(e)=> setUserPassword(e.target.value)}
                                />
                                {
                                error.password?
                                <Form.Text>{error}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit" className="btn btn-primary btn-lg" style={{margin: "2rem 0rem 1rem 0rem"}}>
                                    Login
                                </Button>
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
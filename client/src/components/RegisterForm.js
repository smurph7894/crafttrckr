import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {Container, Form, Col, Row, Button} from 'react-bootstrap';
import ImageCollage from './ImageCollage';

const RegisterForm = () => {

    const[error, setError] = useState({});
    const [user, setUser] = useState();
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        birthdate: "",
        password: ""
    });

    const navigate = useNavigate();

    const newSubitHandler=(e)=>{
        axios.post("http://localhost:8000/api/crafttrckr/user/register", newUser)
            .then((res)=>{
                console.log(res.data);
                setUser(res.data.user);
                navigate(`/user/${user._id}`);
            })
            .catch((err)=>{
                console.log("error.response.data.errors", err.response.data.errors);
                setError(err.response.data.errors);
            });
    };

    const onChangeHandler = (e) => {
        const newUserCombined = {...newUser};
        newUserCombined[e.target.name] =e.target.value;
        setNewUser(newUserCombined);
    };

    return (
        <Container>
            <Row style={{padding: ".5rem"}}>
                <h1 style={{margin: "3rem 0rem", padding: "0", fontWeight:"800", color: "blue"}}>CRAFT TRCKR</h1>
            </Row>
            <Row>
                <h3 >Register</h3>
                <Col>
                    <Row>
                        <Form onSubmit={newSubitHandler}>
                        <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={newUser.name}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.name?
                                <Form.Text>{error.name.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={newUser.name}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.name?
                                <Form.Text>{error.name.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}> 
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={newUser.name}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.name?
                                <Form.Text>{error.name.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={newUser.name}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.name?
                                <Form.Text>{error.name.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Birthdate:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birthdate"
                                    value={newUser.name}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.name?
                                <Form.Text>{error.name.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={newUser.name}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.name?
                                <Form.Text>{error.name.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmedPassword"
                                    value={newUser.name}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.name?
                                <Form.Text>{error.name.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group>
                                <Button type="submit" className="btn btn-primary btn-lg" style={{margin: "2rem 0rem 1rem 0rem"}}>
                                    Create Account
                                </Button>
                            </Form.Group>
                        </Form>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default RegisterForm
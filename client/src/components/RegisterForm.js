import React, {useMemo, useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {Container, Form, Col, Row, Button} from 'react-bootstrap';
import { userState } from '../GlobalState';
import log from '../helpers/logging';

const RegisterForm = () => {

    const[error, setError] = useState({});
    const [newUser, setNewUser] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        birthdate: "",
        password: ""
    });

    const navigate = useNavigate();

    const emailValid = useMemo(()=>{
        const isValid = /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(newUser.email);
        const isEmpty = newUser.email.length === 0;

        return {
            isValid,
            isEmpty
        }
    }, [newUser.email]);

    log("test", !!error.email || (!emailValid.isValid && !emailValid.isEmpty));

    const newSubitHandler=(e)=>{
        e.preventDefault();
        console.log("emailValid", emailValid);
        if(!emailValid.isValid || emailValid.isEmpty){
            setError({email: true});
            return ;
        }
        axios.post("http://localhost:8000/api/crafttrckr/user/register", newUser)
            .then((res)=>{
                log("registerForm", res.data);
                userState(res.data);
                navigate(`/home`);
            })
            .catch((err)=>{
                // log("error.response.data.errors", err.response.data.errors);
                setError(err.response.data.errors);
                // log("!!! error:", error);
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
                                    value={newUser.firstName}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.firstName?
                                <Form.Text>{error.firstName.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={newUser.lastName}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.lastName?
                                <Form.Text>{error.lastName.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}> 
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={newUser.username}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.username?
                                <Form.Text>{error.username.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={newUser.email}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                !!error.email || (!emailValid.isValid && !emailValid.isEmpty)?
                                <Form.Text>{"You must enter a valid and unique email."}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Birthdate:</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="birthdate"
                                    value={newUser.birthdate}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.birthdate?
                                <Form.Text>{"You must be at least 13 years old to create an account."}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={newUser.password}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.password?
                                <Form.Text>{error.password.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                            <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmedPassword"
                                    value={newUser.confirmedPassword}
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.confirmPassword?
                                <Form.Text>{error.confirmPassword.message}</Form.Text>
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
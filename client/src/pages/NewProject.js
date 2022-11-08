import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import Header from '../components/Header';
import { useReactiveVar } from '@apollo/client';
import { userState } from '../GlobalState';
import Sidenav from '../components/Sidenav';

const NewProject = () => {

    const user = useReactiveVar(userState);
    const [newProject, setNewProject] = useState({
        projectName: "",
        projectImage: "",
        tags: [],
        creatorId: "",
        content: "",
        projectMedia: []
    });
    const [error, setError] = useState({});

    const navigate = useNavigate();

    const onNewProjectSubmitted=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/crafttrckr/project", newProject)
            .then((res)=>{
                console.log("******",res);
                // console.log("!!!!! project",res.data.project);
                navigate(`/project/${res.data._id}/edit`);
            })
            .catch((err)=>{
                console.log(err);
                console.log("error.response.data.errors:", err.response.data.errors);
                if(err.response.data.code === 11000){
                    setError({projectName: {message: "Your Project Title must be unique."}});
                }
                else if(err.response.data.code){
                    setError({general: {message: "Something went wrong when creating your project."}});
                }
                else{
                    setError(err.response.data.errors);
                }
            });
    };

    const onChangeHandler = (e)=>{
        const newProjectObject = {...newProject};
        newProjectObject[e.target.name] = e.target.value;
        console.log("e.target.name = ", e.target.name);
        setNewProject(newProjectObject);
    };

    return (
        <Container>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col xs lg={3}>
                    <Sidenav />
                </Col>
                <Col xs lg={9}>
                    <Form onSubmit={onNewProjectSubmitted}>
                        <Row style={{paddingBottom:"1rem"}}>
                            <h2 style={{fontWeight:"600"}}>Start your new project by entering a inspire title!</h2>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label>Project Title:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="projectName"
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.projectName? 
                                <Form.Text>{error.projectName.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group style={{margin: "1rem 0rem 1rem 0rem"}}>
                                    <Form.Label>Project Cover Image:</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="projectImage"
                                        accept="image/png, image/jpeg"
                                        onChange={(e)=> onChangeHandler(e)}
                                    />
                                </Form.Group>
                            </Col>
                            <Col></Col>
                        </Row>
                        <Row>
                            <Form.Group style={{margin: "1rem 0rem 1.5rem 0rem"}}>
                                <Form.Label>Tags:</Form.Label>
                                <p>Please enter at least one project tag separated by commas (i.e. sewing, dress, flower, painting)</p>
                                <Form.Control
                                    type="text"
                                    name="tags"
                                    onChange={(e)=> onChangeHandler(e)}
                                />
                                {
                                error.tags? 
                                <Form.Text>{error.tags.message}</Form.Text>
                                :null
                                }
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Col>
                                    <Button
                                        type="submit"
                                        className="btn btn-primary btn-sm"
                                    >
                                    Create
                                    </Button>
                                    {
                                    error.general? 
                                    <Form.Text>{error.general.message}</Form.Text>
                                    :null
                                    }
                                </Col>
                                <Col></Col>
                                <Col></Col>
                            </Form.Group>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default NewProject
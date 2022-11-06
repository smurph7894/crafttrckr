import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Container, Row} from 'react-bootstrap';
import ProjectEditor from '../components/ProjectEditor';
import Header from '../components/Header';
import { useReactiveVar } from '@apollo/client';
import { userState } from '../GlobalState';

const NewProject = () => {

    const user = useReactiveVar(userState);
    const [newProject, setNewProject] = useState({
        projectName: "",
        projectImage: "",
        tags: [],
        creatorId: "",
        content: ""
    });
    const [error, setError] = useState();

    const navigate = useNavigate();

        const onNewProjectSubmitted=(e)=>{
            e.preventDefault();
            axios.post("http://localhost:8000/api/crafttrckr/project", {newProject})
                .then((res)=>{
                    console.log(res.data.user);
                    //get id from server
                    navigate(`/project/${newProject._id}`);
                })
                .catch((err)=>{
                    console.log("error.response.data.errors:", err.response.data.errors);
                    setError(err.response.data.errors);
                });
        };

    return (
        <Container>
            <Row>
                <Header />
            </Row>
            <Row>
                <ProjectEditor 
                    submitHandler = {onNewProjectSubmitted}
                    user = {user}
                    project = {newProject}
                    setProject = {setNewProject}
                    error = {error}
                />
            </Row>
        </Container>
    )
}

export default NewProject
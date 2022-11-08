import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Col, Row} from 'react-bootstrap';
import { useReactiveVar } from '@apollo/client';
import { userState } from '../GlobalState';
import Sidenav from '../components/Sidenav';
import ProjectEditor from '../components/ProjectEditor';
import Header from '../components/Header';

const UpdateProject = () => {

    const {id} = useParams();
    const user = useReactiveVar(userState);
    const [editProject, setEditProject] = useState();
    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/crafttrckr/project/${id}`)
            .then((res)=>{
                console.log("****", res);
                const newProject = {...res.data, tags: res.data.tags.join(",")};
                setEditProject(newProject);
            })
            .catch((err)=>{
                console.log(err);
            });
    }, [id]);

    const onEditProject=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/crafttrckr/project/${id}`, editProject)
            .then((res)=>{
                console.log("******",res);
                navigate(`/project/${id}`);
            })
            .catch((err)=>{
                console.log(err);
                console.log("error.response.data.errors:", err.response.data.errors);
                setError(err.response.data.errors);
            });
    };

    if(!editProject) {
        return null;
    }

    return (
        <>
            <Container>
                <Row>
                    <Header />
                </Row>
                <Row>
                    <Col xs lg={3}>
                        <Sidenav />
                    </Col>
                    <Col xs lg={9}>
                        <ProjectEditor
                            project={editProject}
                            setProject={setEditProject}
                            error={error}
                            setError={setError}
                            submitHandler={onEditProject}
                        />
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default UpdateProject
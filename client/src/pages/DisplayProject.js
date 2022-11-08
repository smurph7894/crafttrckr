import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Col, Row, Button} from 'react-bootstrap';
import Header from '../components/Header';
import Sidenav from '../components/Sidenav';

const DisplayProject = () => {

    const {id} = useParams();
    const [ project, setProject] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/crafttrckr/project/${id}`)
            .then((res)=>{
                console.log(res.data);
                setProject(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        }, [id]);

    const deleteProject = () => {
        axios.delete(`/api/crafttrckr/project/${id}`)
            .then((res)=>{
                navigate("/home");
            })
            .catch((err)=>{
                console.log(err);
            });
    };

    if(!project) {
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
                        <h2>{project.projectName}</h2>
                        <p>{project.Content}</p>
                        <p>Tags:</p>
                        <ul>
                            {project.tags.map((tag, index)=>
                                <li key={index}>{tag}</li>
                            )}
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={()=>navigate(`/project/${id}/edit`)}>Edit Project</Button>
                    </Col>
                    <Col>
                        <Button onClick={deleteProject}>Delete</Button>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                </Row>
            </Container>
        </>
    )
}

export default DisplayProject
import React, {useEffect, useMemo, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Col, Row, Button} from 'react-bootstrap';
import Header from '../components/Header';
import Sidenav from '../components/Sidenav';
import { convertFromRaw, Editor, EditorState } from 'draft-js';

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
        axios.delete(`http://localhost:8000/api/crafttrckr/project/${id}`)
            .then((res)=>{
                navigate("/home");
            })
            .catch((err)=>{
                console.log(err);
            });
    };

    const editorState = useMemo(()=>{
        if (!project || !project.content) {
            return EditorState.createEmpty();
        }
        return EditorState.createWithContent(convertFromRaw(
            JSON.parse(project.content)));
    }, [project?.content]);

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
                    <Col xs lg={6}>
                        <Row>
                            <h2>{project.projectName}</h2>
                            <Editor 
                                editorState={editorState} 
                                readOnly={true} 
                            />
                            <p
                                style={{marginTop: "2rem"}}
                            >Tags:</p>
                            <ul>
                                {project.tags.map((tag, index)=>
                                    <li 
                                        key={index}
                                        style={{margin: "0rem 1.25rem"}}
                                    >{tag}</li>
                                )}
                            </ul>
                        </Row>
                        <Row>
                            <Col>
                                <Button 
                                    onClick={()=>navigate(`/project/${id}/edit`)}
                                    style={{margin: "0rem 0rem .5rem .25rem"}}
                                >Edit Project
                                </Button>
                            </Col>
                            <Col>
                                <Button 
                                    onClick={deleteProject}
                                    style={{margin: "0rem .25rem .5rem .5rem"}}
                                >Delete
                                </Button>
                            </Col>
                            <Col></Col>
                            <Col></Col>
                        </Row>
                    </Col>
                    <Col xs lg={3}>
                    <   img 
                            src={`http://localhost:8000/files/${project.projectImage}`} 
                            alt="project cover photo"
                            style={{width: "20rem", margin: "1rem 0rem"}}
                        />
                    </Col>
                </Row>
                
            </Container>
        </>
    )
}

export default DisplayProject
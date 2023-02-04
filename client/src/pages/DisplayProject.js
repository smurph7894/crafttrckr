import React, {useEffect, useMemo, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Col, Row, Button} from 'react-bootstrap';
import Header from '../components/Header';
import Sidenav from '../components/Sidenav';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { useReactiveVar } from '@apollo/client';
import { userState } from '../GlobalState';

const DisplayProject = (props) => {

    const {id} = useParams();
    const user = useReactiveVar(userState);
    // const [ project, setProject] = useState();
    const {project} = props;
    const [creatorInfo, setCreatorInfo] = useState();
    const navigate = useNavigate();

    // useEffect(()=>{
    //     console.log("id", id);
    //     axios.get(`http://localhost:8000/api/crafttrckr/project/${id}`)
    //         .then((res)=>{
    //             console.log(res.data);
    //             setProject(res.data);
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         });
    // }, [id]);
    
    console.log("id", id);
    console.log("project", project);
    console.log("creatorId", project.creatorId);

    useEffect(()=>{
        if (user._id !== project.creatorId){
            axios.get(`http://localhost:8000/api/crafttrckr/user/${project.creatorId}`)
            .then((res)=>{
                console.log(res.data);
                setCreatorInfo(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }, [user._id]);

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

    const creatorDiv = () => {
        if (user._id !== project.creatorId){
            return (
                // <h6>Created By: {creatorInfo.firstName} {creatorInfo.lastName}</h6>
                <h6>test</h6>
        )} else {
            return null
        }};

    const loggedIn = () => {
        if (user._id === project.creatorId){
            return (
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
                </Row>);
        } else{
            return null;
        }
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
                    <Col xs lg={6}>
                        <Row>
                            <h2>{project.projectName}</h2>
                            {creatorDiv()}
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
                        {loggedIn()}
                    </Col>
                    <Col xs lg={3}>
                        <img 
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
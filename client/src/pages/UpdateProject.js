import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Container, Col, Row} from 'react-bootstrap';
import Sidenav from '../components/Sidenav';
import ProjectEditor from '../components/ProjectEditor';
import Header from '../components/Header';
import log from '../helpers/logging';

const UpdateProject = () => {

    const {id} = useParams();
    const [editProject, setEditProject] = useState();
    const [error, setError] = useState({});
    const [file, setFile] = useState();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/crafttrckr/project/${id}`)
            .then((res)=>{
                log("****", res);
                const newProject = {...res.data, tags: res.data.tags.join(",")};
                setEditProject(newProject);
            })
            .catch((err)=>{
                log(err);
            });
    }, [id]);

    const onEditProject=(e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/crafttrckr/project/${id}`, editProject)
            .then((res)=>{
                log("******",res);
                refreshPage();
            })
            .catch((err)=>{
                log(err);
                log("error.response.data.errors:", err.response.data.errors);
                setError(err.response.data.errors);
            });
    };

    const onCoverImageUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        axios.post(
            `http://localhost:8000/api/crafttrckr/project/${id}/addFile`, 
            formData, 
            {headers:{"Content-Type": "multipart/form-data"}}
        );
        refreshPage();
    };

    const refreshPage=()=>{
        window.location.reload(false);
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
                            // line 80 only needed if saving files to local desktop files
                            coverPhotoHandler={onCoverImageUpload}
                            file={file}
                            setFile={setFile}
                        />
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}

export default UpdateProject
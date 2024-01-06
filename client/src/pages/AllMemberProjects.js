import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProjectIcon from "../components/sub-components/ProjectIcon.js";
import Header from "../components/Header";
import Sidenav from '../components/Sidenav.js';
import log from '../helpers/logging.js';

const AllMemberProjects = () => {

    const [ allProjects, setAllProjects] = useState([]);

    useEffect(()=>{
        log("test print");
        if(allProjects.length === 0){
        axios.get("http://localhost:8080/api/crafttrckr/project/AllMemberProjects")
            .then((res)=>{
                log(res.data);
                setAllProjects(res.data);
            })
            .catch((err)=>{
                log(err);
            });
        }}, [allProjects]);

    log("All Projects", allProjects);

    if(allProjects.length === 0) {
        return null;
    }

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
                    <Row>
                        {allProjects.map((project,index)=>
                        <Col xs={3} key={index}>
                            <ProjectIcon 
                            oneProject={project}
                            />
                        </Col>
                        )}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default AllMemberProjects
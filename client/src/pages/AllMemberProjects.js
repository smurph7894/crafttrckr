import { useReactiveVar } from '@apollo/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {useParams} from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import ProjectIcon from "../components/sub-components/ProjectIcon.js";
import Header from "../components/Header";
import { userState } from '../GlobalState.js';
import Sidenav from '../components/Sidenav.js';

const AllMemberProjects = () => {

    const {id} = useParams();
    const user = useReactiveVar(userState);
    const [ allProjects, setAllProjects] = useState([]);

    useEffect(()=>{
        console.log("test print");
        if(allProjects.length === 0){
        axios.get("http://localhost:8000/api/crafttrckr/project/AllMemberProjects")
            .then((res)=>{
                console.log(res.data);
                setAllProjects(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        }}, [allProjects]);

    console.log("All Projects", allProjects);

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
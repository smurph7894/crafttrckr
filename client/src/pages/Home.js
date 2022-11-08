import { useReactiveVar } from '@apollo/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate} from 'react-router-dom';
import ProjectIcon from "../components/sub-components/ProjectIcon.js";
import Header from "../components/Header";
import { userState } from '../GlobalState.js';
import Sidenav from '../components/Sidenav.js';

const Home = () => {

    const user = useReactiveVar(userState);
    const [ userAndProjectList, setUserAndProjectList] = useState();

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/crafttrckr/user/${user._id}`)
            .then((res)=>{
                console.log(res.data);
                setUserAndProjectList(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        }, [user._id]);

    console.log(userAndProjectList);

    if(!userAndProjectList) {
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
                        {userAndProjectList.projects.map((project,index)=>
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

export default Home
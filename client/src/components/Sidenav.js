import { useReactiveVar } from '@apollo/client';
import axios from 'axios';
import React, { useEffect } from 'react';
import {Col, Container, Nav, Navbar} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userState } from '../GlobalState';

function Sidenav() {

    const user = useReactiveVar(userState);
    const navigate = useNavigate();

    const logout = () => {
        axios.post(`http://localhost:8000/api/crafttrckr/user/logout`)
            .then((res)=>{
                navigate(`/`);
            })
            .catch((err)=>{
                console.log(err);
            });
        };

    return (
        <>
        <Container>
            <Col xs lg={9}>
                <Nav className="flex-column" style={{border: "2px solid black"}}>
                        <Nav.Link style={{  borderBottom: "1px solid grey" }} href={`/home`}>Home</Nav.Link>
                        <Nav.Link style={{  borderBottom: "1px solid grey" }} href={`/project/new`}>Create Project</Nav.Link>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                </ Nav>
            </Col>
            <Col xs lg={3}> </Col>
        </Container>
        </>
    )
}

{/* <h3>Profile</h3>
<h3>Profile</h3>
<h3>Discussion Boards</h3>
<h3>Following</h3>
<h3>Logout</h3> */}
export default Sidenav
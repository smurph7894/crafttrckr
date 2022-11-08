import { useReactiveVar } from '@apollo/client';
import axios from 'axios';
import React, { useEffect } from 'react';
import {Container, Nav, Navbar} from 'react-bootstrap';
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
            <Nav className="flex-column">
                    <Nav.Link href={`/home`}>Home</Nav.Link>
                    <Nav.Link onClick={logout}>Logout</Nav.Link>
            </ Nav>
        </>
    )
}

{/* <h3>Profile</h3>
<h3>Profile</h3>
<h3>Discussion Boards</h3>
<h3>Following</h3>
<h3>Logout</h3> */}
export default Sidenav
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {Container} from 'react-bootstrap';
import {Image} from 'react-bootstrap/Image';

const UserLogo = (props) => {

    const {user} = useState();

    const imagePicker = (user) => {
        if(user)
    }

    return (
        <div>
            <Container>
                <div 
                    >

                </div>
                    <img src="/assets/defaults/userIcon.jpg" alt="user icon"  style={{ height: "5rem", border: ".01rem solid black", borderRadius: "50%"}}/>
            </Container>
        </div>
    )
}

export default UserLogo
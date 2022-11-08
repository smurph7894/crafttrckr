import React from 'react';
import {Container} from 'react-bootstrap';

const UserLogo = (props) => {

    const {user} = props;

    return (
        <div>
            <Container style={{padding: "0"}}>
                <div>
                    <img 
                        src="/assets/defaults/userIcon.jpg" 
                        alt="user icon"  
                        style={{ height: "5rem", width: "5rem", border: ".01rem solid black", borderRadius: "50%"}}
                    />
                </div>
            </Container>
        </div>
    )
}

export default UserLogo
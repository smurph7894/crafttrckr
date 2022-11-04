import React from 'react';
import {Container} from 'react-bootstrap';

const UserLogo = (props) => {

    const {user} = props;

    const imagePicker = (user) => {
        let iconImage = null;
        if( user !== null ) {
            iconImage=user.profileImage;
        }
        else{
            iconImage="/assets/defaults/userIcon.jpg";
        }
        return iconImage;
    };

    return (
        <div>
            <Container>
                <div>
                    <img 
                        src={imagePicker(user)} 
                        alt="user icon"  
                        style={{ height: "5rem", width: "5rem", border: ".01rem solid black", borderRadius: "50%"}}
                    />
                </div>
            </Container>
        </div>
    )
}

export default UserLogo
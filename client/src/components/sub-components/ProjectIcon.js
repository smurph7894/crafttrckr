import React from 'react';
import {useNavigate} from "react-router-dom";
import {Card} from 'react-bootstrap';

const ProjectIcon = (props) => {

    const {oneProject} = props;
    const navigate = useNavigate();

    return (
        <>
            <Card 
                onClick={()=>navigate(`/project/${oneProject._id}`)}
                style = {{margin:"1rem"}}
            >
                <Card.Title style = {{padding: ".25rem .5rem", fontSize:"1rem"}}>{oneProject.projectName}</Card.Title>
                <Card.Img variant='top' 
                    // below src only works if using commented out code to save to local desktop and on local host.
                    // src={`http://localhost:8080/files/${oneProject.projectImage}`} 
                    src={oneProject.projectImage}
                    alt={`${oneProject.projectName} cover photo`}
                    style = {{display: "block", marginLeft:"auto", marginRight:"auto", width:"6rem"}}
                />
                <Card.Footer style = {{padding: "0rem .25rem", height:"3rem"}}>
                    <small className="text-muted" style={{fontSize:".6rem"}}> Last updated: </small><br />
                    <small className="text-muted" style={{fontSize:".6rem"}}>{oneProject.updatedAt}</small>
                </Card.Footer>
            </Card>
        </>
    )
}

export default ProjectIcon

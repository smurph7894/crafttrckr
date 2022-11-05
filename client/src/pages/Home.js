import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import ProjectIcon from "../components/sub-components/ProjectIcon.js";

const Home = () => {

    const {id} = useParams();
    const [ userAndProjectList, setUserAndProjectList] = useState();

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/crafttrckr/user/${id}`)
            .then((res)=>{
                console.log(res.data);
                setUserAndProjectList(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        }, [id]);

    return (
        <Container>
            {userAndProjectList.projects.map((project,index)=>
                <div key={index}>
                    <p onClick={navigate(`/project/${project._id}`)}>{project.projectName}</p>
                    <img 
                        src={ project.projectImage? project.projectImage : <ProjectIcon /> } 
                        alt= "Project Image"
                        onClick={navigate(`/project/${project._id}`)}
                    />
                </div>
            )}
        </Container>
    )
}

export default Home
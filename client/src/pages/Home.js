import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

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
                    <p onClick={navigate(`/project/${projects._id}`)}>{project.projectName}</p>
                    <img src="" alt={}></img>
                </div>
            )}
        </Container>
    )
}

export default Home
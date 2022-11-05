import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {Container, Col, Row} from 'react-bootstrap';

const NewProject = () => {

    const {id} = useParams;
    const [user, setUser] = useState();
    const [newProject, setNewProject] = useState();
    const [error, setError] = useState();

    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/crafttrckr/user/${id}`)
            .then((res)=>{
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
        }, [id]);

        const onNewProjectSubmitted=(e)=>{
            e.preventDefault();
            axios.post("http://localhost:8000/api/crafttrckr/project", {newProject})
                .then((res)=>{
                    console.log(res.data.user);
                    navigate(`/project/${newProject._id}`);
                })
                .catch((err)=>{
                    console.log("error.response.data.errors:", err.response.data.errors);
                    setError(err.response.data.errors);
                });
        };

    return (
        <Container>
            
        </Container>
    )
}

export default NewProject
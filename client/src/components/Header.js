import { useReactiveVar } from '@apollo/client';
import axios from 'axios';
import React, {useState} from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserLogo from "../components/sub-components/UserLogo";
import { userState } from '../GlobalState';

const Header = () => {

    const user = useReactiveVar(userState);
    const [projectTagSearch, setProjectTagSearch] = useState();
    const [projectSearchList, setProjectSearchList] = useState();

    const navigate = useNavigate();

    // const onSubmitSearch = (e) => {
    //     e.preventDefault();
    //     axios.get('http://localhost:8000/api/crafttrckr/project/search/tags', {projectTagSearch})
    //         .then((res)=> {
    //             console.log("res.data");
    //             setProjectSearchList(res.data);
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         });
    // };

    return (
        <Container>
            <Row style={{padding: ".5rem"}}>
                <Col>
                    <Row>
                        <Col style={{textAlign: "left", padding: "0rem 3.5rem"}}>
                            <UserLogo 
                                user={user}
                            />
                            <h4>{user.username}</h4>
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <h1 
                        style={{
                            margin: "1.5rem 0rem", 
                            padding: "0", 
                            fontWeight:"800", 
                            color: "blue",
                            textAlign: "center"
                        }}
                        >CRAFT TRCKR
                    </h1>
                </Col>
                    {/* <Row>
                        <input 
                            type="checkbox" 
                            name="followingUserID" 
                            value={user._id}
                        >Follow {user.userName}</input>
                    </Row> */}
                    {/* look at adding a follow creator option */}
                <Col>
                    <Row>
                        {/* <Form onSubmit={onSubmitSearch}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    name="tags"
                                    value="Search"
                                    onChange={(e)=> setProjectTagSearch(e.target.value)}
                                />
                            </Form.Group>
                        </Form> */}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Header
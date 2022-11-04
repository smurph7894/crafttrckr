import axios from 'axios';
import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import UserLogo from "../components/sub-components/UserLogo";

const Header = (props) => {

    const {user} = props;
    const [projectTagSearch, setProjectTagSearch] = useState();
    const [projectSearchList, setProjectSearchList] = useState();

    const navigate = useNavigate();

    const onSubmitSearch = (e) => {
        e.preventDefault();
        axios.get('http://localhost:8000/api/crafttrckr/project/search/tags', {projectTagSearch})
            .then((res)=> {
                console.log("res.data");
                setProjectSearchList(res.data);
            })
            .catch((err)=>{
                console.log(err);
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <UserLogo 
                        user={user}
                    />
                </Col>
                <Col>
                    <Row>{user.userName}</Row>
                    <Row>
                        <input type="checkbox" name="followingUserID" value={user._id}>Follow {user.userName}</input>
                    </Row>
                </Col>
                <Col>
                    <Row>
                        <Form onSubmit={onSubmitSearch}>
                            <Form.Group>
                                <Form.Control
                                    type="text"
                                    name="tags"
                                    value="Search"
                                    onChange={(e)=> setProjectTagSearch(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Row>
                    <Row>
                        <Button 
                            link={navigate("/project/new")} 
                            className="btn btn-primary btn-sm" 
                        >
                        Create A New Project
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Header
import { useReactiveVar } from '@apollo/client';
import { ContentState, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { userState } from '../GlobalState';

const ProjectEditor = (props) => {

    const user = useReactiveVar(userState);
    const {project, error, setError, setProject, submitHandler, coverPhotoHandler, file, setFile } = props;
    const [editorState, setEditorState] = useState( project.content? EditorState.createWithContent(convertFromRaw(
        JSON.parse(project.content)
    )) : EditorState.createEmpty());

    const onChangeHandler = (e)=>{
        console.log("e",e);
        const newProjectObject = {...project};

        newProjectObject[e.target.name] = e.target.value;

        console.log("e.target.name = ", e.target.name);
        console.log("e.target.value = ", e.target.value);

        setProject(newProjectObject);
    };

    const onEditorStateChange = (editorState) => {
        setEditorState( editorState );
        const contentValue = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const newObject = {...project, content: contentValue};
        setProject(newObject);
    };

    if(!project) {
        return null;
    };

    console.log(project);

    return (
        <Container>
            <Form onSubmit={submitHandler}>
                <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                    <Form.Label>Project Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="projectName"
                        value={project.projectName}
                        onChange={(e)=> onChangeHandler(e)}
                    />
                    {
                    error.projectName? 
                    <Form.Text>{error.projectName.message}</Form.Text>
                    :null
                    }
                </Form.Group>
                <Form.Group style={{ border:"2px solid grey", margin: "1rem 0rem 0rem 0rem"}}>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                    />
                </Form.Group>
                <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                    <Form.Label>Tags:</Form.Label>
                    <p>Please enter at least one project tag separated by commas (i.e. sewing, dress, flower, painting)</p>
                    <Form.Control
                        type="text"
                        name="tags"
                        value={project.tags}
                        onChange={(e)=> onChangeHandler(e)}
                    />
                    {
                    error.tags? 
                    <Form.Text>{error.tags.message}</Form.Text>
                    :null
                    }
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col style={{margin: "2rem 0rem"}}>
                            <Button
                                type='submit'
                                className="btn btn-primary btn-sm"
                            >
                            Submit
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
            <Form onSubmit={coverPhotoHandler} style={{margin: "4rem 0rem"}}>
                <Form.Group>
                    <Form.Label>Project Cover Image:</Form.Label>
                    <Form.Control
                        name="coverImage"
                        type="file"
                        onChange={(e)=>setFile(e.target.files[0])}
                    />
                    <Row>
                        <img 
                            src={`http://localhost:8000/files/${project.projectImage}`} 
                            alt="project cover photo"
                            style={{width: "5rem", margin: "1rem 0rem"}}
                        />
                    </Row>
                    <Row style={{padding:"0rem .5rem"}}>
                        <Button 
                            style={{margin: "2rem 0rem"}}
                            type='submit'
                            className="btn btn-primary btn-sm"
                            style={{width:"6rem"}}
                        >
                        Add Photo
                        </Button>
                    </Row>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default ProjectEditor
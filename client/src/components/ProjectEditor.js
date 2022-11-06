import { EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ProjectEditor = (props) => {

    const {project, error, setProject, user, submitHandler } = props;
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const onChangeHandler = (e)=>{
        const newProjectObject = {...project};

        newProjectObject[e.target.name] = e.target.value;

        console.log("e.target.name = ", e.target.name);
        console.log("e.target.value = ", e.target.value);

        setProject(newProjectObject);
    };

    const onEditorStateChange = (editorState) => {
        setEditorState( editorState );
    };

    return (
        <Container>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label>Project Title:</Form.Label>
                    <Form.Control
                        type="text"
                        name="projectName"
                        value={project.projectName}
                        onChange={(e)=> onChangeHandler(e)}
                    />
                </Form.Group>
                <Form.Group style={{visibility: "hidden", border:"2px solid black"}}>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={onEditorStateChange}
                    />
                    <Form.Control
                        value={editorState.getCurrentContent().getPlainText('\u0001')}
                        type="text"
                        name="content"
                        onChange={()=> console.log("ignore")}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Project Image:</Form.Label>
                    <Form.Control
                        type="text"
                        name="projectImage"
                        value={project.projectImage}
                        onChange={(e)=> onChangeHandler(e)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Tags:</Form.Label>
                    <p>Please enter at least one project tag separated by commas (i.e. sewing, dress, flower, painting)</p>
                    <Form.Control
                        type="text"
                        name="tags"
                        value={project.tags}
                        onChange={(e)=> onChangeHandler(e)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        style={{visibility: "hidden"}}
                        type="text"
                        value={user._id}
                        name="creatorId"
                        onChange={(e)=> onChangeHandler(e)}
                    />
                </Form.Group>
            </Form>
        </Container>
    )
}

export default ProjectEditor
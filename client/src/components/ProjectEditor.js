import React from 'react';
import { Container } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Form } from 'react-router-dom';

const ProjectEditor = () => {

    const {project, setProject, user, }

    const onChangeHandler = (e)=>{
        const newProjectObject = {...project};

        newProjectObject[e.target.name] = e.target.value;

        console.log("e.target.name = ", e.target.name);
        console.log("e.target.value = ", e.target.value);

        setProject(newProjectObject);
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
                <Form.Group>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Project Image:</Form.Label>
                    <Form.Control
                        // type="text"
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
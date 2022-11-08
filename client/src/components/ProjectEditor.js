import { useReactiveVar } from '@apollo/client';
import { ContentState, convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { userState } from '../GlobalState';

const MAX_COUNT = 10;

const ProjectEditor = (props) => {

    const user = useReactiveVar(userState);
    const {project, error, setError, setProject, submitHandler } = props;
    // const [coverImage, setCoverImage] = useState();
    const [editorState, setEditorState] = useState( project.content? EditorState.createWithContent(convertFromRaw(
        JSON.parse(project.content)
    )) : EditorState.createEmpty());
    // const [fileLimit, setFileLimit] = useState(false);

    const onChangeHandler = (e)=>{
        console.log("e",e);
        const newProjectObject = {...project};

        newProjectObject[e.target.name] = e.target.value;

        console.log("e.target.name = ", e.target.name);
        console.log("e.target.value = ", e.target.value);

        setProject(newProjectObject);
    };

    // const onFileLoad =(e)=>{
    //     setCoverImage(e.target.files[0]);
    //     console.log(e.target.files[0]);
    //     const newProjectObject = {...project};

    //     newProjectObject.projectImage = e.target.files[0];

    //     setProject(newProjectObject);
    // };
    
    // const handleUploadFiles = (files) => {
    //     const uploaded = [...project.projectMedia];
    //     let limitedExceeded = false;
    //     files.some((file)=>{
    //         if(uploaded.findIndex((f)=> f.name === file.name) === -1) {
    //             uploaded.push(file);
    //             if(uploaded.length === MAX_COUNT) setFileLimit(true);
    //             if(uploaded.length > MAX_COUNT) {
    //                 alert (`You can only add a maxium of ${MAX_COUNT} files`);
    //                 setFileLimit(false);
    //                 limitedExceeded = true;
    //                 return true;
    //             }
    //         }
    //     });
    //     if (!limitedExceeded) setProject(uploaded);
    // };

    // const onFileUpload = (e) => {
    //     const chosenFiles = Array.prototype.slice.call(e.target.files);
    //     handleUploadFiles(chosenFiles);
    // };

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
                {/* <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                    <Form.Label>Project Cover Image:</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/png, image/jpeg"
                        name="projectImage"
                        // value={project.projectImage || ""}
                        onChange={(e)=> onFileLoad(e)}
                    />
                    <img src={project.projectImage} alt='Project Cover Image' />
                </Form.Group> */}
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
                {/* <Form.Group style={{margin: "1rem 0rem 0rem 0rem"}}>
                    <Form.Label htmlFor='fileUpload'>
                        <a className={`btn btn-primary btn-s ${!fileLimit ? '' : 'disabled'}`}>
                            Project Images and Videos:
                        </a>
                    </Form.Label>
                    <Form.Control
                        type="file" 
                        id='fileUpload'
                        multiple
                        accept="image/png, image/jpeg"
                        value={project.projectMedia?.toString() || ""}
                        name="projectMedia"
                        onChange={(e)=> onFileUpload(e)}
                        disabled={fileLimit}
                    />
                    <div className="uploaded-files-list">
                        {project.projectMedia.map(file => (
                            <div>
                                <Container>
                                    <img src={file.name} alt='project media' />
                                </Container>
                            </div>
                        ))}
                    </div>
                </Form.Group> */}
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
        </Container>
    )
}

export default ProjectEditor
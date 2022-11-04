import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const ImageCollage = () => {
    return (
        <Container>
            <Row>
                <Col style={{padding: "0"}}>
                    <img src='/assets/collageImages/collageCropped.png' 
                        alt="abstract painting" 
                        style={{ height: "60rem",width:"auto", margin: ".1rem", padding: "0"}}
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default ImageCollage
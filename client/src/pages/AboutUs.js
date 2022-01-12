import React from "react";
import {Card, CardGroup, Col, Container, Nav, Row} from 'react-bootstrap'

const programmers = [
  {
    name: "Michael Knutson1", 
    image: "https://cdn10.bigcommerce.com/s-npe4l/products/1157/images/1335/B-MZ-SMSHD---HIGH__85441.1477602947.1280.1280.jpg?c=2",
    GitHub: "https://github.com/MRKnutson/",
    LinkedIn: "www.linkedin.com/in/michaelrknutson",
    email: "mrknutson44@gmail.com",
    blurb: "Some stuff about me and how great I am at Coding!"

},
{
  name: "Michael Knutson2", 
  image: "https://cdn10.bigcommerce.com/s-npe4l/products/1157/images/1335/B-MZ-SMSHD---HIGH__85441.1477602947.1280.1280.jpg?c=2",
  GitHub: "https://github.com/MRKnutson/",
  LinkedIn: "www.linkedin.com/in/michaelrknutson",
  email: "mrknutson44@gmail.com",
  blurb: "Some stuff about me and how great I am at Coding!"

},
{
  name: "Michael Knutson3", 
  image: "https://cdn10.bigcommerce.com/s-npe4l/products/1157/images/1335/B-MZ-SMSHD---HIGH__85441.1477602947.1280.1280.jpg?c=2",
  GitHub: "https://github.com/MRKnutson/",
  LinkedIn: "www.linkedin.com/in/michaelrknutson",
  email: "mrknutson44@gmail.com",
  blurb: "Some stuff about me and how great I am at Coding!"

},
{
  name: "Michael Knutson4", 
  image: "https://cdn10.bigcommerce.com/s-npe4l/products/1157/images/1335/B-MZ-SMSHD---HIGH__85441.1477602947.1280.1280.jpg?c=2",
  GitHub: "https://github.com/MRKnutson/",
  LinkedIn: "www.linkedin.com/in/michaelrknutson",
  email: "mrknutson44@gmail.com",
  blurb: "Some stuff about me and how great I am at Coding!"

}
]

const AboutUs = () => {

  const renderProgrammers = () =>{
    return programmers.map((developer)=>{
      return(
        <Col key = {developer.name}>
        <Card className = "text-center" style ={{
          width: "25rem",
          boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
          marginTop: "45px"
          }}>
          <Card.Img variant = "top" src = {developer.image} style = {{
             maxWidth: "25rem"
            }}/>
          <Card.Body>
            <Card.Title>{developer.name}</Card.Title>
            <Card.Text>{developer.blurb}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <Nav>
              <Nav.Item>
                <Nav.Link href = {developer.GitHub}>
                  <img src = "https://logos-world.net/wp-content/uploads/2020/11/GitHub-Emblem.png" 
                  style = {{height: "3rem"}}
                  />
                </Nav.Link>
                <Nav.Link href = {developer.LinkedIn}>
                  <img src = "https://www.passionateinmarketing.com/wp-content/uploads/2021/11/linledin-B2Binstitute.png"
                  style = {{height: "2rem"}}
                  />
                </Nav.Link>
                {/* <Nav.Link href = {person.LinkedIn}>Personal Website</Nav.Link> */}
              </Nav.Item>
            </Nav>
          </Card.Footer>
        </Card>
        </Col>
      )
    })
  };
  return (
    <Container>
      <h1>About Us</h1>
      <Row md = {1} lg = {2}>
        {renderProgrammers()}
      </Row>

    </Container>
  )
}

export default AboutUs;
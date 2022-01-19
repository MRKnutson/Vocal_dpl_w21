import React, { useState } from "react";
import {Card, CardGroup, Col, Container, Nav, Row} from 'react-bootstrap'
import EntryModal from "../components/EntryModal";
import {PrimaryColor, SecondaryColor, ActionColor, VocalHeader} from '../components/Styles.js'

const AboutUs = () => {
  return (
    <>
    <VocalHeader>About Us</VocalHeader>
    {/* <CardGroup> */}
    <Card style={{width:"15em", border:"none", margin:"6em"}}>
    <Card.Img src = "https://cdn10.bigcommerce.com/s-npe4l/products/1157/images/1335/B-MZ-SMSHD---HIGH__85441.1477602947.1280.1280.jpg?c=2" alt = "Asher Bay"/>
      <div  style={{textAlign:"center", color:"white", padding:"1em"}} class = "card-block special-card">
      <Card.Title>Asher Bay</Card.Title>
      <Card.Link href="https://github.com/MRKnutson/">
        <img src = "https://logos-world.net/wp-content/uploads/2020/11/GitHub-Emblem.png" 
        style = {{height: "3rem"}}/>
      </Card.Link>
      <Card.Link href="www.linkedin.com/in/michaelrknutson">
        <img src = "https://www.passionateinmarketing.com/wp-content/uploads/2021/11/linledin-B2Binstitute.png"
        style = {{height: "2rem"}}/>
      </Card.Link>
      <Card.Text>Email</Card.Text>
      <Card.Text>Asher is a coding maniac and he will tell us about it soon.</Card.Text>
      </div>
    </Card>
    {/* <div>
    <img src = "https://res.cloudinary.com/djhlv2nfc/image/upload/v1642024460/Vocal/Images/IMG_4372_qcefm7.jpg" alt = "Michael Knutson"/>
      <h2>Michael Knutson</h2>
      <a href="https://github.com/MRKnutson/">GitHub</a>
      <a href="www.linkedin.com/in/michaelrknutson">LinkedIn</a>
      <h3>mrknutson44@gmail.com</h3>
      <p>I come from a biological and statistical background. After helping to design a server that can be deployed on research vessels I realized my passion was in programming. It didn't take me long to decide to become a full-time developer!</p>
    </div>
    <div>
    <img src = "https://cdn10.bigcommerce.com/s-npe4l/products/1157/images/1335/B-MZ-SMSHD---HIGH__85441.1477602947.1280.1280.jpg?c=2" alt = "Dennis Plank"/>
      <h2>Dennis Plank</h2>
      <a href="https://github.com/DennyPlank/">GitHub</a>
      <a href="www.linkedin.com/in/dennis-plank-4b5547224">LinkedIn</a>
      <h3>DennyMouzon@gmail.com</h3>
      <p>I just like thing to work right. When the button you click doesnt do anything? Yeah. Nightmare fuel.</p>
    </div>
    <div>
    <img src = "https://res.cloudinary.com/djhlv2nfc/image/upload/v1642119399/Vocal/Images/DD4625AA-BAE3-4897-9B6D-424C6CB78A44_1_201_a_kkxazz.jpg" alt = "Ruby Reed"/>
      <h2>Ruby Reed</h2>
      <a href="https://github.com/rubyreed/">GitHub</a>
      <a href="https://www.linkedin.com/in/ruby-reed-454844134/">LinkedIn</a>
      <h3>rubysreed@gmail.com</h3>
      <p>After earning a Bachelor's in Biological Science I spent some time traveling and trying to figure out my career... I finally landed on coding! And I'm loving it.</p>
    </div> */}
    {/* </CardGroup> */}
    </>
  )
};

export default AboutUs;
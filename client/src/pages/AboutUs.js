import React, { useState } from "react";
import { Card, CardGroup, Col, Container, Nav, Row } from "react-bootstrap";
import EntryModal from "../components/EntryModal";
import {
  PrimaryColor,
  SecondaryColor,
  ActionColor,
  VocalHeader,
} from "../components/Styles.js";
import AsherPic from "../images/AsherPic.jpg";

const programmers = [
  {
    name: "Asher Bay",
    image: AsherPic,
    GitHub: "https://github.com/asherbay/",
    LinkedIn: "https://www.linkedin.com/in/asherbay/",
    email: "asherbay@gmail.com",
    blurb:
      "I’m a web developer based in Salt Lake City. I love tinkering with code and solving interesting problems. After studying electronic music composition in college I found a passion for building systems that led me to pursue a career in programming.",
  },
  {
    name: "Michael Knutson",
    image:
      "https://res.cloudinary.com/djhlv2nfc/image/upload/v1643589976/IMG_3750_1_bxhc6s.jpg",
    GitHub: "https://github.com/MRKnutson/",
    LinkedIn: "https://linkedin.com/in/michaelrknutson",
    email: "mrknutson44@gmail.com",
    blurb:
      "I come from a biological and statistical background. After helping to design a server that can be deployed on research vessels I realized my passion was in programming. It didn't take me long to decide to become a full-time developer!",
  },
  {
    name: "Dennis Plank",
    image:
      "https://res.cloudinary.com/doqs3jkhw/image/upload/v1643862183/IMG_5943_s9kc9f.jpg",
    GitHub: "https://github.com/DennyPlank/",
    LinkedIn: "www.linkedin.com/in/dennis-plank-4b5547224",
    email: "DennyMouzon@gmail.com",
    blurb:
      "Growing up in the Bay Area, I was always surrounded by Tech. Whether it was driving through Facebook HQ in Palo Alto, Google HQ in Mountain View, or any number of the 1000's of Bay Area startups, Big Tech was everywhere. It was impossible to ignore; the problem solving and day to day life (ok lets face it, the money) were to hard to resist, and in 2021 I started Web Development and loved it, eager to grow and learn more. Here I am.  ",
  },
  {
    name: "Ruby Reed",
    image:
      "https://res.cloudinary.com/djhlv2nfc/image/upload/c_crop,h_1232,w_1232/v1643503884/Vocal/Images/Image_from_iOS_rh0l5z.jpg",
    GitHub: "https://github.com/rubyreed/",
    LinkedIn: "https://www.linkedin.com/in/ruby-s-reed/",
    email: "rubysreed@gmail.com",
    blurb:
      "After earning a Bachelor's in Biological Science I spent some time traveling and trying to figure out my career... I finally landed on Web Development (with an emphasis on Front End)! And I'm loving it.",
  },
];

const AboutUs = () => {
  const renderProgrammers = () => {
    return programmers.map((developer) => {
      return (
        <Col key={developer.name}>
          <CardGroup>
            <Card
              className='shadow-none'
              style={{
                width: "auto",
                border: "none",
                marginRight: "2em",
                marginBottom: "2em",
              }}
            >
              <Card.Img variant='top' src={developer.image} />
              <Card.Body
                style={{ textAlign: "center", color: "white", padding: "1em" }}
                class='card-block special-card'
              >
                <Card.Link href={developer.GitHub}>
                  <img
                    src='https://logos-world.net/wp-content/uploads/2020/11/GitHub-Emblem.png'
                    style={{ height: "3rem" }}
                  />
                </Card.Link>
                <Card.Link href={developer.LinkedIn}>
                  <img
                    src='https://www.passionateinmarketing.com/wp-content/uploads/2021/11/linledin-B2Binstitute.png'
                    style={{ height: "2rem" }}
                  />
                </Card.Link>
                <Card.Title style={{ fontWeight: "700" }}>
                  {developer.name}
                </Card.Title>
                <Card.Text>{developer.blurb}</Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      );
    });
  };
  return (
    <Container style={{ marginBottom: "5rem" }}>
      <VocalHeader style={{ margin: "5rem" }}>About Us</VocalHeader>

      <Row md={1} lg={2}>
        {renderProgrammers()}
      </Row>
    </Container>
  );
};

export default AboutUs;

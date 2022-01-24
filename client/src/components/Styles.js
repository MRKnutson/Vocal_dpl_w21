import {
  Card,
  Navbar,
  Button,
  Container,
  Form,
  DropdownButton,
} from "react-bootstrap";
import styled from "styled-components";

//here are our theme colors for the app
export const PrimaryColor = "#2A3950";
export const SecondaryColor = "#3E619B";
export const ActionColor = "#EF4B4C";

//used in about us page
export const StatCard = styled(Card)`
  width: 19.5rem;
  margin: 1rem;
  border-radius: 0.75rem;
  height: 30rem;
`;

export const GraphCard = styled(Card)`
  width: 100%;
  margin: 1rem;
  color: white;
  border-radius: 0.75rem;
  background-color: ${SecondaryColor};
`;

export const StatText = styled(Card.Text)`
  padding: 10px;
`;

//used in navbar
export const VocalNavbar = styled(Navbar)`
  background-color: ${PrimaryColor};
`;

export const VocalButton = styled.button`
color:white;
background-color: ${ActionColor};
border:none;
border-radius:.2rem;
padding:.5rem;
marginL.5rem;
&:hover {
  background-color: ${SecondaryColor}
}
`;

export const ViewButton = styled.button`
color:white;
background-color: ${ActionColor};
border:none;
border-radius:.2rem;
padding:.5rem;
marginL.5rem;
&:hover {
  background-color: ${PrimaryColor}
}
`;

export const VocalHeader = styled.h1`
  color: white;
`;

export const HoverImage = styled.img`
  width: 10rem;
  border: 0.25rem solid white;
  border-radius: 0.5rem;
  margin: 1rem;
  &:hover {
    cursor: pointer;
  }
`;

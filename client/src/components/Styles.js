import {Card, Navbar, Button, Container, Form, DropdownButton} from "react-bootstrap";
import styled from "styled-components";

//here are our theme colors for the app
export const PrimaryColor = "#2A3950"
export const SecondaryColor = "#3E619B"
export const ActionColor = "#EF4C4C"

//used in about us page
export const StatCard = styled(Card)`
  width: 300px;
  margin: 20px;
`
export const StatText = styled(Card.Text)`
  padding: 10px;
`

//used in navbar
export const VocalNavbar = styled(Navbar)`
  background-color: ${PrimaryColor};
`

export const VocalButton = styled.button`
background-color: ${ActionColor};
border:none;
border-radius:.2rem;
&:hover {
  background-color: ${SecondaryColor}
}
`

export const VocalHeader = styled.h1`
color: white;
`

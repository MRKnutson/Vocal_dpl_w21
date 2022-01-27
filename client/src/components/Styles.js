import { Select } from "@mui/material";
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
export const HighlightColor = "#6C63FF"

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
  width: 12rem;
  border: 0.2rem solid white;
  border-radius: 0.3rem;
  margin: 1rem;
  &:hover {
    cursor: pointer;
    width: 12.25rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 15px 25px,
      rgba(0, 0, 0, 0.05) 0px 5px 10px;
  }
`;

export const RedSelect = styled(Select)`
  background-color: ${ActionColor};
  border-radius: 0.75rem;
  color: white;
  & .MuiSelect-root {
    background-color: ${ActionColor};
  }
  & .MuiSelect-nativeInput {
    background-color: ${ActionColor};
  }
  & .MuiSelect-filled {
    background-color: ${ActionColor};
  }
  & .MuiSelect-select {
    color: white;
  }
  & .MuiSelect-icon {
    color: white;
  }
`;

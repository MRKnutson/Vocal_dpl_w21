import {Card, Navbar} from "react-bootstrap";
import styled from "styled-components";


export const PrimaryColor = "#2A3950"
export const SecondaryColor = "#3E619B"
export const ActionColor = "#EF4C4C"

export const StatCard = styled(Card)`
  width: 300px;
  margin: 20px;
`

export const StatText = styled(Card.Text)`
  padding: 10px;
`

export const VocalNavbar = styled(Navbar)`
  background-color: ${PrimaryColor};
`


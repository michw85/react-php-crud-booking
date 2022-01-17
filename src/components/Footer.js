import React from 'react'
import { Container } from 'react-bootstrap'

const yearNow = new Date().getFullYear();

const Footer = () => {
    return(
    <Container fluid style={{backgroundColor: '#212529', color:'#fff'}} >
        <Container style={{display: 'flex', justifyContent: 'center', padding:'10px'}}>
            <p>Copyright &copy; {yearNow} All Rights Reserved</p>
        </Container>
    </Container>
    )
}

export default Footer
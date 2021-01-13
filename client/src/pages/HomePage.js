import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const HomePage = () => {
  const [newMessage, setNewMessage] = useState("")

  const handleChangeMessage = (e) => {
    setNewMessage(e.target.value);
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    
  }


  return (
    <Container>
      <h1>HomePage</h1>
    </Container>
  );
};

export default HomePage;
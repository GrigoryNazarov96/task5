import React, { useState } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";

const NavBar = () => {
  const [seed, setSeed] = useState(0);

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand>Task 5</Navbar.Brand>
        <Nav className="d-flex justify-content-between align-items-center">
          <Nav.Item className="me-3">
            <Form.Label style={{ color: "white", marginBottom: 0 }}>
              Error count:
            </Form.Label>
          </Nav.Item>
          <Nav.Item className="me-3">
            <Form.Control
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
          </Nav.Item>
          <Nav.Item className="me-5">
            <Nav.Item className="d-flex justify-content-between">
              <Form.Label
                style={{ color: "white", marginBottom: 0, fontSize: 16 }}
              >
                0
              </Form.Label>
              <Form.Label
                style={{ color: "white", marginBottom: 0, fontSize: 16 }}
              >
                10
              </Form.Label>
            </Nav.Item>
            <Form.Range
              min={0}
              max={10}
              step={0.25}
              value={seed}
              onChange={(e) => setSeed(e.target.value)}
            />
          </Nav.Item>
          <Nav.Item className="d-flex justify-content-between align-items-center">
          <Nav.Item className="me-3">
            <Form.Label style={{ color: "white", marginBottom: 0 }}>
              Seed: 
            </Form.Label>
          </Nav.Item>
            <Form.Control className="me-3" />
            <Button variant="outline-light">Random</Button>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;

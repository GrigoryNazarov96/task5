import React from 'react';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';

const NavBar = ({
  setSeed,
  seed,
  setLocale,
  errorsProbability,
  setErrorsProbability,
  handleCSVExport,
}) => {
  const handleSeedChange = (e) => {
    setSeed(Number(e.target.value));
  };

  const handleRandomSeed = () => {
    setSeed(Math.floor(Math.random() * 400));
  };

  const handleLocaleChange = (e) => {
    setLocale(e.target.value);
  };

  const handleErrorsProbabilityChange = (e) => {
    setErrorsProbability(Number(e.target.value));
  };

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand>Task 5</Navbar.Brand>
        <Nav className="d-flex justify-content-between align-items-center">
          <Nav.Item className="me-3">
            <Button onClick={handleCSVExport}>Export CSV</Button>
          </Nav.Item>
          <Nav.Item className="me-3">
            <Form.Select
              aria-label="Default select example"
              onChange={handleLocaleChange}
            >
              <option value="ru">RU</option>
              <option value="he">HE</option>
              <option value="de">DE</option>
            </Form.Select>
          </Nav.Item>
          <Nav.Item className="me-3">
            <Form.Label style={{ color: 'white', marginBottom: 0 }}>
              Error count:
            </Form.Label>
          </Nav.Item>
          <Nav.Item className="me-3">
            <Form.Control
              value={errorsProbability}
              onChange={handleErrorsProbabilityChange}
            />
          </Nav.Item>
          <Nav.Item className="me-5">
            <Nav.Item className="d-flex justify-content-between">
              <Form.Label
                style={{ color: 'white', marginBottom: 0, fontSize: 16 }}
              >
                0
              </Form.Label>
              <Form.Label
                style={{ color: 'white', marginBottom: 0, fontSize: 16 }}
              >
                10
              </Form.Label>
            </Nav.Item>
            <Form.Range
              min={0}
              max={10}
              step={0.25}
              value={errorsProbability}
              onChange={handleErrorsProbabilityChange}
            />
          </Nav.Item>
          <Nav.Item className="d-flex justify-content-between align-items-center">
            <Nav.Item className="me-3">
              <Form.Label style={{ color: 'white', marginBottom: 0 }}>
                Seed:
              </Form.Label>
            </Nav.Item>
            <Form.Control
              className="me-3"
              value={seed}
              onChange={handleSeedChange}
            />
            <Button variant="outline-light" onClick={handleRandomSeed}>
              Random
            </Button>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;

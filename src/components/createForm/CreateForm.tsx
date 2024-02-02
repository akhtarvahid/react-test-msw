import React from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

type CreateFormType = {
}

const CreateForm: React.FC<CreateFormType> = () => {
  return (
    <Form>
      <Row className="justify-content-center">
        <Col sm={6}>
          <Col sm={12}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label htmlFor="enterName">Enter name</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Enter name"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder='Enter name'
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group controlId="formCountry" className="mb-3">
              <Form.Label htmlFor="enterLocation">
                Select location
              </Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select country</option>
                <option value="india">India</option>
                <option value="uae">UAE</option>
                <option value="Turkey">Turkey</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Label htmlFor="enterColor">
              Select favourite color
            </Form.Label>
            <Row sm={12}>
              <Col sm={3}><Form.Label htmlFor="exampleColorInput">Color picker</Form.Label></Col>
              <Col sm={9}>
                <Form.Control
                  type="color"
                  id="exampleColorInput"
                  defaultValue="#42bca8"
                  title="Choose your color"
                />
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    </Form>
  )
}
export default CreateForm;
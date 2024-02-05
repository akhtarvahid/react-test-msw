import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { FormField } from '../../App';

interface CreateFormType {
  setFavColors: React.Dispatch<React.SetStateAction<FormField[]>>;
}

const CreateForm: React.FC<CreateFormType> = ({ setFavColors }) => {
  const [formValue, setFormValues] = useState<FormField>({
    name: '',
    location: '',
    color: ''
  })

  return (
    <Form>
      <Row className="justify-content-center">
        <Col sm={6}>
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="enterName">Enter name</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Enter name"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder='Enter name'
                  onChange={(e) => setFormValues(values => ({ ...values, name: e.target.value }))}
                />
              </InputGroup>
            </Form.Group>
          </Col>
          <Col sm={12}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="enterLocation">
                Select location
              </Form.Label>
              <Form.Select aria-label="location" onChange={(e) => setFormValues(values => ({ ...values, location: e.target.value }))}>
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
              <Col sm={3}><Form.Label htmlFor="colorInput">Color picker</Form.Label></Col>
              <Col sm={9}>
                <Form.Control
                  aria-label="Color picker"
                  title="Type your color"
                  onChange={(e) => setFormValues(values => ({ ...values, color: e.target.value }))}
                />
              </Col>
            </Row>
            <Row>
              <Button variant="primary" onClick={() => setFavColors((colors: any) => ([formValue, ...colors]))}>Submit</Button>
            </Row>
          </Col>
        </Col>
      </Row>
    </Form>
  )
}
export default CreateForm;
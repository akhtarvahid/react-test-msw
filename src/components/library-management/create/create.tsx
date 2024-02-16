import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { createBookLibrary } from "../helper/helper";

export interface Book {
  title: string,
  author: string,
  price: string
}

const initialState = {
  title: "",
  author: "",
  price: ""
}
const Create: React.FC = () => {
  const [form, setForm] = useState<Book>(initialState);
  const [success, setSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | undefined>('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => {
      return {
        ...f,
        [e.target.name]: e.target.value
      }
    })
  }
  const submitHandler = async (e: { preventDefault: () => void; }) => { 
    e.preventDefault();
    const res = await createBookLibrary(form);
    setResponseMessage('Created');
    setSuccess(true);
   }
  

  return (
    <Form>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" name="title" onChange={handleFormChange} value={form.title || ''} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" placeholder="Enter author" name="author" value={form.author || ''} onChange={handleFormChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Price" name="price" value={form.price || ''} onChange={handleFormChange} />
      </Form.Group>
      <Button variant="primary" type="submit" name='Submit'
        onClick={submitHandler}>
        Submit
      </Button>
      <span data-testid="creating-msg">{success ? 'successfully created' : ''}</span>
      <p>{responseMessage}</p>
    </Form>
  )
}
export default Create;
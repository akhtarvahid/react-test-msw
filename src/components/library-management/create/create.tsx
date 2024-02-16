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
  const [createdUser, setCreatedUser] = useState<any>({});
  const [success, setSuccess] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

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
    setResponseMessage('Mocked success message from MSW');
    setCreatedUser(res);
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
      <Button variant="primary" type="submit"
        onClick={submitHandler}>
        Submit
      </Button>
      <span data-testid="creating-msg">{success ? 'successfully created' : ''}</span>
      <h1 data-testid="create-new">{createdUser?.title}</h1>
      <p>{responseMessage}</p>
    </Form>
  )
}
export default Create;
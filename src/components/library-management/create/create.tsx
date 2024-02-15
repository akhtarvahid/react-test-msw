import useSWRMutation from "swr/mutation";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";
import { LIBRARY_API } from "../constant";
import axios from "axios";

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
const Create = () => {
  const [form, setForm] = useState<Book>(initialState);
  const [isCreating, setIsCreating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => {
      return {
        ...f,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter title" name="title" onChange={handleFormChange} value={form.title || ''}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" placeholder="Enter author" name="author" value={form.author || ''} onChange={handleFormChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Price" name="price" value={form.price || ''} onChange={handleFormChange} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={isCreating}
        onClick={async (e) => {
          e.preventDefault();
          if(form.title) {
            setIsCreating(true);
            try {
              await axios.post(LIBRARY_API, {...form})
              setIsCreating(false);
              setSuccess(true);
            } catch (e) {
              // error handling
            }
          }}
         }>
        Submit
      </Button>
      <span data-testid="creating-msg">{success ? 'successfully created': ''}</span>
    </Form>
  )
}
export default Create;
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { createBookLibrary } from "../helper/helper";

export interface Book {
  title: string;
  author: string;
  price: string;
}

const initialState = {
  title: "",
  author: "",
  price: "",
};
const Create: React.FC = () => {
  const [form, setForm] = useState<Book>(initialState);
  const [responseMessage, setResponseMessage] = useState<string | undefined>('');
  const [isReadyToPost, setIsReadyToPost] = useState(false);

  useEffect(() => {
    if (isReadyToPost) {
      createBookLibrary(form);
      setIsReadyToPost(false);
      setResponseMessage('successfully created')
    }
  }, [isReadyToPost]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => {
      return {
        ...f,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (form.title) {
      setIsReadyToPost(true);
    } else {
      setResponseMessage('Fields are empty')
    }
  };

  return (
    <>
    {isReadyToPost && <h1 style={{ color: "green" }}>Loading...</h1>}
    <Form>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          onChange={handleFormChange}
          value={form.title || ""}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="author">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter author"
          name="author"
          value={form.author || ""}
          onChange={handleFormChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="text"
          placeholder="Price"
          name="price"
          value={form.price || ""}
          onChange={handleFormChange}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        name="Submit"
        onClick={submitHandler}
      >
        Submit
      </Button>
      <p>{responseMessage}</p>
    </Form>
    </>
  );
};
export default Create;

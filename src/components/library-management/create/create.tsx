import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { isFieldsEmpty } from "../helper/helper";
import { LIBRARY_API } from "../constant";
import { Book, BookResponse } from "../../../types/common-types";


type CreateProps = {
  onAddBook: React.Dispatch<BookResponse>;
};

const initialState = {
  title: "",
  author: "",
  price: "",
};
const Create: React.FC<CreateProps> = ({ onAddBook }) => {
  const [form, setForm] = useState<Book>(initialState);
  const [responseMsg, setResponseMsg] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setForm((f) => {
      return {
        ...f,
        [e.target.name]: value,
      };
    });
  };

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if(!isFieldsEmpty(form))
    fetch(LIBRARY_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .then((res) => {
        onAddBook(res);
        setResponseMsg("Successfully created");
      })
      .catch(() => setError("Something went wrong!"));
  };

  return (
    <>
      <div>{responseMsg}</div>
      <div>{error}</div>
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
      </Form>
    </>
  );
};
export default Create;

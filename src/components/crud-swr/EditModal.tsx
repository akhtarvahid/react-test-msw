import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Book, BookResponse } from "../../types/common-types";

type EditModal = {
  onUpdateBook: React.Dispatch<BookResponse>;
  selected: BookResponse | null;
};
const EditModal: React.FC<EditModal> = ({ onUpdateBook, selected }) => {
  const [form, setForm] = useState<Book>({
    title: selected?.title || "",
    author: selected?.author || "",
    price: selected?.price || "",
  });
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => {
      return {
        ...f,
        [e.target.name]: e.target.value,
      };
    });
  };
  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (selected) {
      onUpdateBook({
        ...form,
        id: selected?.id,
        createdAt: selected?.createdAt,
        image: selected?.image,
      });
    }
  };
  return (
    <Modal
      show={selected ? true : false}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit {"selected?.title"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          name="Update"
          onClick={submitHandler}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default EditModal;

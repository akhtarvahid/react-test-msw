import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Book, BookResponse } from "../../types/common-types";


type UpdateProps = {
    onUpdateBook: React.Dispatch<BookResponse>;
    selected: BookResponse,
}

const UpdateBook: React.FC<UpdateProps> = ({ onUpdateBook, selected }) => {
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
        onUpdateBook({
            ...form,
            id: selected.id,
            createdAt: selected.createdAt, 
            image: selected.image
        });
    };

    return (
        <>
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
                    name="Update"
                    onClick={submitHandler}
                >
                    Update
                </Button>
            </Form>
        </>
    );
};
export default UpdateBook;

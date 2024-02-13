import useSWRMutation from "swr/mutation";
import { TODOS_API_URL } from "../Todos/Todos";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

interface UserTodo {
    name: string,
    email: string,
    location: string,
    company: string,
    isResident: boolean
}

async function postRequest(url: RequestInfo | URL, { arg }: { arg: UserTodo }) {
    console.log('arg:::', arg);
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(arg)
    }).then(res => res.json())
}

const initialState = {
    name: "",
    email: "",
    location: "",
    company: "",
    isResident: false
}
const Create = () => {
    const [form, setForm] = useState(initialState);
    const { data, trigger: createTodo, isMutating: isCreating } = useSWRMutation(TODOS_API_URL, postRequest)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name);
        setForm((f) => {
            return {
                ...f,
                [e.target.name]: e.target.id === 'isResident' ? e.target.checked : e.target.value
            }
        })
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" name="name" onChange={handleFormChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleFormChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Location" name="location" onChange={handleFormChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="company">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Company" name="company" onChange={handleFormChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="isResident">
                <Form.Check type="checkbox" label="Is Resident?" name="isResident" onChange={handleFormChange} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isCreating}
                onClick={async (e) => {
                    e.preventDefault();
                    console.log(form)
                    try {
                        const newTodo: UserTodo = {
                            name: " AL",
                            email: "sidd@gmail.com",
                            location: "Bengaluru",
                            company: "yara",
                            isResident: true
                        }
                        const result = await createTodo(newTodo)
                        console.log('result', result, data);
                    } catch (e) {
                        // error handling
                    }
                }}>
                Submit
            </Button>
        </Form>
    )
}
export default Create;
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { BookResponse } from "../../types/common-types";
import Badge from 'react-bootstrap/Badge';

const BookList: React.FC<{ 
    books: BookResponse[], 
    setSelected: React.Dispatch<BookResponse | null>,
    handleDeleteBook: React.Dispatch<string>; 
}> = ({ 
    books, setSelected, handleDeleteBook 
}) => {
    return (
        <div>
            <ListGroup>
                {books?.map((book: BookResponse) =>
                    <ListGroup.Item key={book.id}>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                        <h5 onClick={() => setSelected(book)}>
                            <Badge bg="secondary">Edit</Badge>
                            <Badge bg="secondary" onClick={() => handleDeleteBook(book.id)}>Delete</Badge>
                        </h5>
                    </ListGroup.Item>
                )}

            </ListGroup>
        </div>
    )
}
export default BookList;
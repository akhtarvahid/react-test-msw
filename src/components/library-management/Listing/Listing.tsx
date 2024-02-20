import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { BookResponse } from "../../../types/common-types";

const Listing:React.FC<{books: BookResponse[]}> = ({ books }) => {
  return (
    <div data-testid="library">
      <h1>Library</h1>
      <ListGroup>
        {books?.map((book: BookResponse) => (
          <ListGroup.Item key={book.id}>
            <Card.Title>{book.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {book.author}
            </Card.Subtitle>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default Listing;

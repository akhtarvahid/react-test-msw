import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Book } from '../create/create';

export interface Books extends Book {
  id: string;
  image: string;
  createdAt: string;
}

function Listing({ books }: any) {

  return (
    <div data-testid="library">
      <h1>Listing management</h1>
      <ListGroup>
        {books?.map((book: Books) =>
          <ListGroup.Item key={book.id}>
            <Card.Title>{book.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
          </ListGroup.Item>
        )}

      </ListGroup>
    </div>
  );
}

export default Listing;

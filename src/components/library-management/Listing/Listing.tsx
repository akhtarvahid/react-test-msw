import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import { LIBRARY_API } from '../constant';
import { Book } from '../create/create';

interface Books extends Book {
  id: string;
  image: string;
  createdAt: string;
}

function Listing() {
  const [books, setBooks] = useState<Books[]>([]);
  useEffect(() => {
    fetch(LIBRARY_API)
      .then(res => res.json())
      .then(res => setBooks(res))
  }, [])

  return (
    <div data-testid="library">
      <h1>Listing management</h1>
      <ListGroup>

        {[...books].reverse().map((book) =>
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

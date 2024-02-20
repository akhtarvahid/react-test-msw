import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { BookResponse } from "../../types/common-types";
import Badge from "react-bootstrap/Badge";

const BookList: React.FC<{
  title: string;
  books: BookResponse[];
  setSelected: React.Dispatch<BookResponse | null>;
  handleDeleteBook: React.Dispatch<string>;
}> = ({ title, books, setSelected, handleDeleteBook }) => {
  return (
    <div>
      <h2 className="books-title">{title}</h2>
      <ListGroup as="ol" numbered>
        {books?.map((book: BookResponse, i: number) => (
          <ListGroup.Item
            key={book.id}
            as="li"
            className="d-flex justify-content-between align-items-start"
            variant={i%2 == 0 ? "dark": ""}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{book.title}</div>
              <div className="subText">{book.author}</div>
            </div>
           <div className="badges">
           <Badge bg="secondary" onClick={() => setSelected(book)} pill>
              Edit
            </Badge>
            <Badge bg="secondary" onClick={() => handleDeleteBook(book.id)}>
              Delete
            </Badge>
           </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
export default BookList;

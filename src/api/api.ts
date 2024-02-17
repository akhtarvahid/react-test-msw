import axios from 'axios';

const api = axios.create({
  baseURL: 'https://65a1879f42ecd7d7f0a6b7ba.mockapi.io',
});

export const getBooks = async () => {
  const response = await api.get('/library');
  return response.data;
};

export const addBook = async (newBook: any) => {
  const response = await api.post('/library', newBook);
  return response.data;
};

export const updateBook = async (bookId: any, updatedBook: any) => {
  const response = await api.put(`/library/${bookId}`, updatedBook);
  return response.data;
};

export const deleteBook = async (bookId: any) => {
  await api.delete(`/library/${bookId}`);
};

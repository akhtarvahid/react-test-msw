import { HttpResponse, http } from 'msw';
import { libraryMoock, mockData, todosMock } from '../utils/mock-data/mock-data';
import { TODOS_API_URL } from '../components/todo-app/Todos/Todos';
import { LIBRARY_API } from '../components/library-management/constant';

export const handlers = [
    http.get('https://jsonplaceholder.typicode.com/users', () => {
        return HttpResponse.json(mockData)
    }),
    http.get(TODOS_API_URL, () => {
        return HttpResponse.json(todosMock)
    }),

    // Library Management
    http.get(LIBRARY_API, () => {
        return HttpResponse.json(libraryMoock)
    }),
    http.post(LIBRARY_API, async ({ request }) => {
        const newPost = await request.json();
        console.log('post REQUEST:::::', newPost);

        return HttpResponse.json({}, { status: 200 })
    }),
    http.delete(`${LIBRARY_API}/:id`,  ({ params }) => {
      const { id } = params;
      console.log(`Deleted data for: ${id}`);
      return HttpResponse.json({}, { status: 200 })
    })

]
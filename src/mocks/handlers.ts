import { HttpResponse, http } from 'msw';
import { mockData, todosMock } from '../utils/mock-data/mock-data';
import { TODOS_API_URL } from '../components/todos/Todos';

export const handlers = [
    http.get('https://jsonplaceholder.typicode.com/users', (resolver) => {
        return HttpResponse.json(mockData)
    }),
    http.get(TODOS_API_URL, (resolver) => {
        return HttpResponse.json(todosMock)
    })
]
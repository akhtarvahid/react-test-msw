import { DefaultBodyType, DefaultRequestMultipartBody, HttpResponse, delay, http } from 'msw';
import { libraryMoock, mockData, todosMock } from '../utils/mock-data/mock-data';
import { TODOS_API_URL } from '../components/todo-app/Todos/Todos';
import { LIBRARY_API } from '../components/library-management/constant';
const allPosts = new Map()

export const handlers = [
    http.get('https://jsonplaceholder.typicode.com/users', (resolver) => {
        return HttpResponse.json(mockData)
    }),
    http.get(TODOS_API_URL, (resolver) => {
        return HttpResponse.json(todosMock)
    }),
    http.get(LIBRARY_API, (resolver) => {
        return HttpResponse.json(libraryMoock)
    }),
    http.post(LIBRARY_API, async ({ request }) => {
        const newPost = await request.json();
        return HttpResponse.json({
            title: 'Akhtar'
        }, { status: 200 } )
    })
]
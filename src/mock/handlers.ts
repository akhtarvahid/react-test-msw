import { HttpResponse, http } from 'msw';
import { mockData } from '../utils/mock-data/mock-data';

export const handlers = [
    http.get('https://jsonplaceholder.typicode.com/users', (resolver) => {
        return HttpResponse.json(mockData)
    }),

    http.post('https://jsonplaceholder.typicode.com/posts', async ({ request }) => {
        const requestBody = await request.json();
        //const parsed = JSON.parse(requestBody);
        console.log('s::::', requestBody);
        return HttpResponse.json({
            id: Math.floor(Math.random() * 1000),
            content: requestBody,
        })
    })
]
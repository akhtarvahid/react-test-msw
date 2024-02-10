import { HttpResponse, http } from 'msw';
import { mockData } from '../utils/mock-data/mock-data';

export const handlers = [
    http.get('https://jsonplaceholder.typicode.com/users', (resolver) => {
        return HttpResponse.json(mockData)
    })
]
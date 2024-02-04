import { HttpResponse, http } from 'msw';

export const handlers = [

    // http.get('https://jsonplaceholder.typicode.com/users', ({ cookies }) => {
    //     console.log(cookies)
    //     return HttpResponse.json(Array.from(allPosts.values()))
    // })

    http.get('/posts', ({ request, params, cookies }) => {
        return HttpResponse.json([
            "Leanne Graham",
            "Ervin Howell",
            "Clementine Bauch"
        ])
    })
]
import { HttpResponse, http } from "msw";
import {
  charactersMock,
  libraryMoock,
  todosMock,
} from "../utils/mock-data/mock-data";
import { TODOS_API_URL } from "../components/todo-app/Todos/Todos";
import { LIBRARY_API } from "../components/library-management/constant";
import { SERIES_API } from "../utils/env";

export const handlers = [
  http.get(TODOS_API_URL, () => {
    return HttpResponse.json(todosMock);
  }),

  // Library Management - CRUD
  http.get(LIBRARY_API, () => {
    console.log(`GET REQUEST data`);
    return HttpResponse.json(libraryMoock);
  }),
  http.post(LIBRARY_API, async ({ request }) => {
    const newPost = await request.json();
    console.log(`POST REQUEST data for: ${JSON.stringify(newPost)}`);

    return HttpResponse.json({}, { status: 200 });
  }),
  http.delete(`${LIBRARY_API}/:id`, ({ params }) => {
    const { id } = params;
    console.log(`DELETE data for: ${id}`);
    return HttpResponse.json({}, { status: 200 });
  }),
  http.put(`${LIBRARY_API}/:id`, async ({ request, params }) => {
    const { id } = params;
    const nextPost = await request.json();
    console.log("PUT data with:", id, nextPost);
    return HttpResponse.json({ nextPost }, { status: 200 });
  }),

  // Table 
  http.get(`${SERIES_API}/character`, async ({ request }) => {
    const url = new URL(request.url);
    console.log('url::::', JSON.stringify(url));
    const characterId = url.searchParams.get('page')
    console.log('characterId::::', characterId);

    if (!characterId) {
      return new HttpResponse(null, { status: 404 })
    }

    const pageIndex = parseInt(characterId);
    
    return HttpResponse.json({
        info: { pages: 5, next: true },
        results: [charactersMock[pageIndex-1]]
    });
})
];

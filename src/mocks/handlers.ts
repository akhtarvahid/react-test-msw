import { HttpResponse, http } from "msw";
import {
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

    return HttpResponse.json({
        info: { pages: characterId },
        results: [{
            id: 1,
            name: "Rick Sanchez",
            status: "Alive",
            species: "Human",
            type: "",
            gender: "Male",
            origin: {
                name: "Earth (C-137)",
                url: "https://rickandmortyapi.com/api/location/1"
            },
            location: {
                name: "Citadel of Ricks",
                url: "https://rickandmortyapi.com/api/location/3"
            },
            image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            episode: [],
            url: "https://rickandmortyapi.com/api/character/1",
            created: "2017-11-04T18:48:46.250Z"
        }]
    });
})
];

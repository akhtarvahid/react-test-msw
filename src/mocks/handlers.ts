import { HttpResponse, http } from 'msw';

export const handlers = [
    http.get('https://jsonplaceholder.typicode.com/users', ()=>{
           HttpResponse.json([
            {
                name: "Leanne Graham"
              },{
                name: "Ervin Howell"
              },{
                name: "Clementine Bauch"
              }
           ])
    })
]
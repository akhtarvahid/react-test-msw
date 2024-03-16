import { render, screen, within } from '@testing-library/react';
import Table from '../Index';
import { server } from '../../../mocks/server';
import { HttpResponse, http } from 'msw';

function renderComponent() {
  const users = [
    { name: 'jane', email: 'jane@jane.com' },
    { name: 'sam', email: 'sam@sam.com' },
  ];
  render(<Table  />);

  return {
    users,
  };
}

describe('Table component', () => {
    test('render table row per page', () => {
        // Render the component
        renderComponent();
      
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    test('render component asynchronously to render data', async () => {
        const SERIES_API = 'character';
        const pageIndex = 1
        server.use(
            http.get(`${SERIES_API}/character/?page=${pageIndex}`, () => {
                return HttpResponse.json({
                    info: {},
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
        )

        // Render the component
        await render(<Table  />);
      
        screen.debug();
    });
      
})

import { render, screen } from "@testing-library/react"
import { HttpResponse, http } from "msw";
import UserList from "../UserList";
import { server } from "../../../mocks/server";


describe('Users component', () => {
    it('Users title', () => {
        render(<UserList />);
        const heading = screen.getByRole('heading', { level: 1});
        expect(heading).toBeInTheDocument();
    })

    it('users fetched successfully', async() => {
        render(<UserList />);
        const heading = await screen.findByText('iPhone 9');
        expect(heading).toBeInTheDocument();
    })

    it('users api error', async() => {
        render(<UserList />);
        server.use(
            http.get('https://jsonplaceholder.typicode.com/users', () => {
                return new HttpResponse(null, { status: 401 })
            })
        )
        const heading = await screen.queryByText('iPhone 9');
        expect(heading).not.toBeInTheDocument();
    })
})
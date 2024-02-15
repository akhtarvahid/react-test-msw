import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'

export const TODOS_API_URL = 'https://65a1879f42ecd7d7f0a6b7ba.mockapi.io/todo';

interface UserTodo {
    name: string,
    avatar: string,
    email: string,
    location: string,
    company: string,
    isResident: boolean,
    description: string,
    id: string
}

async function getRequest(url: RequestInfo | URL) {
    return fetch(url, {
        method: 'GET',
    }).then(res => res.json())
}
const Todos = ({ searchText }: any) => {
    const { data: users, trigger, isMutating } = useSWRMutation(TODOS_API_URL, getRequest)

    useEffect(() => {
        const getUsersTodos = async () => {
            await trigger()
        }
        getUsersTodos()
    }, [])

    return (
        <div>
            {isMutating ? <div>loading...</div> : <div data-testid="todos"
                style={{ display: 'flex', flexFlow: 'row wrap' }}>
                {users && [...users].reverse().filter(user => user.name.toLowerCase().startsWith(searchText?.toLowerCase()))
                    .map((user: UserTodo) =>
                        <div style={{ backgroundColor: 'slategrey', margin: 5 }} data-testid="todo-row" key={`${user.id} ${user.name}`} className='todo-row'>
                            <img src={user.avatar} alt='avatar' />
                            <div>
                                <h3>{user.name}</h3>
                                <div>{user.company}</div>
                                <p>{user.isResident ? <span data-testid="resident">Resident</span> : <span data-testid="non-resident">Non-Resident</span>}</p>
                            </div>
                            <div>
                                <button onClick={() => { }}>View</button>
                                <button onClick={() => { }}>Edit</button>
                                <button onClick={() => { }}>Delete</button>
                            </div>
                        </div>
                    )}
            </div>}
        </div>
    )
}

export default Todos;
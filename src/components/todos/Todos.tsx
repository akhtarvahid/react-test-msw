import React, { useEffect, useState } from 'react'

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

const Todos = () => {
    const [users, setUsers] = useState<UserTodo[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getUsersTodos = async () => {
            const response = await fetch(TODOS_API_URL);
            const result = await response.json();
            setUsers(result.slice(0, 5));
            setIsLoading(false)
        }
        getUsersTodos()
    }, [])

    return (
        <div>
            <h1>User Todos</h1>
            {isLoading ? <div>loading...</div> : <div data-testid="todos">
                {users
                    .map(user =>
                        <div data-testid="todo-row" key={`${user.id} ${user.name}`} className='todo-row'>
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
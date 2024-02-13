import useSWRMutation from "swr/mutation";
import { TODOS_API_URL } from "../Todos/Todos";


interface UserTodo {
    name: string,
    email: string,
    location: string,
    company: string,
    isResident: boolean
}

async function postRequest(url: RequestInfo | URL, { arg }: { arg: UserTodo }) {
    console.log('arg:::', arg);
    return fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(arg)
    }).then(res => res.json())
}

const Create = () => {
    const { data, trigger: createTodo, isMutating: isCreating } = useSWRMutation(TODOS_API_URL, postRequest)

    return (
        <div>
            <h1>User Todos</h1>

            <button disabled={isCreating}
                onClick={async () => {
                    try {
                        const newTodo: UserTodo = {
                                name: "ABCD AL",
                                email: "sidd@gmail.com",
                                location: "India",
                                company: "ABCD",
                                isResident: true
                        }
                        const result = await createTodo(newTodo)
                        console.log('result', result, data);
                    } catch (e) {
                        // error handling
                    }
                }}>Create New</button>
        </div>
    )
}
export default Create;
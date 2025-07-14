import { useQuery, useQueryClient } from '@tanstack/react-query'

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const ReactQuery = () => {
    const url: string = 'https://jsonplaceholder.typicode.com/todos/1';
    const { data, isLoading, refetch } = useQuery({
        queryKey: ['todo'],
        queryFn: async () => {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json() as Promise<Todo>;
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    })

    const queryClient = useQueryClient();

    const handleUseCache = () => {
        const cached = queryClient.getQueryData<Todo>(['todo']);
        console.log('Cached data:', cached);
        //   setTodo(cached ?? null);
    };

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {data && (
                <div>
                    <h2>{data.title}</h2>
                    <p>Status: {data.completed ? 'Completed' : 'Pending'}</p>
                </div>
            )}
            <button onClick={() => refetch()}>Refresh data</button>
            <button onClick={() => handleUseCache()}>Cached data</button>
        </>
    )
}

export default ReactQuery;
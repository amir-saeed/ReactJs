import useSWR from 'swr';

interface User {
    id: number;
    name: string;
    email: string;
}

const SWRExample = () => {

    const { data, error, isLoading } = useSWR<User[]>('https://jsonplaceholder.typicode.com/users', async (url: string) => {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {data && (
                <ul>
                    {data.map(user => (
                        <li key={user.id}>
                            {user.name} - {user.email}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default SWRExample;  
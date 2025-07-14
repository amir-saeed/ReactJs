import { useState, useEffect } from 'react';

interface User {
    id: number;
    name: string;
}

const FetchAPI = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setLoading(false);
            })

    }, []);

    return (
        <>
            {loading ? <div>Loading...</div> :
                <div>
                    {users.map((user: User) => <div key={user.id}>{user.name}</div>)}
                </div>
            }
        </>
    )

}

export default FetchAPI;
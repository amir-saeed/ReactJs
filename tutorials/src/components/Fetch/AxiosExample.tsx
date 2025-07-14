import axios from 'axios';
import { useState, useEffect } from 'react';


interface Post {
    id: number;
    title: string;
}

const AxiosEample = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
            .then((response: any) => {
                const posts = response.data;
                setPosts(posts);
                setLoading(false);
                console.log(posts);
            }).catch((error: any) => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            })

    }, []);

    return (
        <>
            {
                loading ? <div>Loading...</div> :
                    posts.length === 0 ? <div>No posts available</div> :
                        <ul>
                            {posts.map((post: Post) => <li key={post.id}>{post.title}</li>)}
                        </ul>
            }
        </>
    )
}

export default AxiosEample;
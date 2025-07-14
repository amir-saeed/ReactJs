import { useEffect } from "react"



const Debug = () => {

    const debuger = async () => {
        const abc: any = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!abc.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await abc.json()

        return data;
    }

    useEffect(() => {

        debuger()
            .then((data) => {
                console.log('Data fetched successfully:', data);
                // You can add more debug logic here
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])

    return (
        <div>Debug</div>
    )
}

export default Debug
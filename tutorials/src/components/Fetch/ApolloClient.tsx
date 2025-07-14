import { useQuery, gql, ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { useEffect, useState } from 'react';

const GET_COUNTRIES = gql`
 query {
  countries {
    code
    name
    capital
    currency
  }
 }
`
interface Countries {
    code: string;
    name: string;
    capital: string;
    currency: string;
}

function UserComponent() {
    const { loading, error, data } = useQuery<{ countries: Countries[] }>(GET_COUNTRIES);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <ul>
                {
                    data?.countries && data?.countries.map((country) => (
                        <li key={country.code}>
                            <strong>{country.name}</strong> - {country.capital} ({country.currency})
                        </li>
                    ))
                }
            </ul>
        </>
    )
}

export default function ApolloExample() {
    const [client, setClient] = useState<ApolloClient<any> | null>(null);
    useEffect(() => {

        const initializeApollo = async () => {
            const cache = new InMemoryCache();

            persistCache({
                cache,
                storage: new LocalStorageWrapper(window.localStorage),
            });


            const client = new ApolloClient({
                link: new HttpLink({
                    uri: 'https://countries.trevorblades.com/',
                }),
                cache
            });

            setClient(client);
        };

        initializeApollo();
    }, []);

    if (!client) {
        return <div>Loading Apollo Client...</div>;
    }

    return (
        <ApolloProvider client={client}>
            <UserComponent />
        </ApolloProvider>
    );
}
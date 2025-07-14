import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactQuery from './ReactQuery';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

const ReactQueryEntry = () => {
    const queryClient = new QueryClient();

    const localStoragePersister = createAsyncStoragePersister({
        storage: window.localStorage,
    });

    persistQueryClient({
        queryClient,
        persister: localStoragePersister,
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
    });

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQuery />
        </QueryClientProvider>
    )
}

export default ReactQueryEntry
type FetchPostResponse<R> = {
    data: R | null;
    error: string | null;
};

export const fetchPost = async <R>(
    url: string,
    body: string,
    headers: HeadersInit
): Promise<FetchPostResponse<R>> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers,
            body,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`);
        }

        const data: R = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: (error as Error).message };
    }
};

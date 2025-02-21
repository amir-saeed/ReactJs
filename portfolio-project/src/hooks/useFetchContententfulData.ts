import { createClient, Entry } from "contentful";
import { useEffect, useState } from "react";

type UseContentfulEntriesHook = {
  entries: Entry<any>[] | null;
  loading: boolean;
  error: string | null;
};

const contenfulClient = createClient({
  space: import.meta.env.VITE_REACT_APP_SPACE,
  environment: "master",
  accessToken: import.meta.env.VITE_REACT_APP_KEY,
});

export const useContentfulEntries = (
  contentType: string
): UseContentfulEntriesHook => {
  const [entries, setEntries] = useState<Entry<any>[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        setLoading(true);
        const response = await contenfulClient.getEntries({
          content_type: contentType,
        });

        setEntries(response.items);
      } catch (error: any) {
        console.error(error);
        setError(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return { entries, loading, error };
};

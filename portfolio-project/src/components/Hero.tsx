import RichTextRenderer from "./shared/RichTextRenderer";
import { useEffect, useState } from "react";
import { GET_BIO } from "../graphql/getBio";
import { fetchPost } from "../utils/fetchBio";
import { Document } from "@contentful/rich-text-types";

const Hero = () => {
  const [title, setTitle] = useState<string | null>(null);
  const [summary, setSummary] = useState<Document | null>(null);
  const fetchData = async () => {
    const url: string = `${import.meta.env.VITE_REACT_APP_URL}/${import.meta.env.VITE_REACT_APP_SPACE}`;
    const queryPayload = {
      query: GET_BIO,
      variables: { id: import.meta.env.VITE_REACT_APP_BIO_ID },
    };
    const data = JSON.stringify(queryPayload);
    const authToken = {
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_KEY}`,
      "Content-Type": "application/json",
    }
    const result: any = await fetchPost(url, data, authToken);
    return {
      response: result.data,
      error: result.error
    }
  }

  useEffect(() => {
    fetchData()
      .then(({ response }: any) => {
        const { data, error } = response;
        if (error) {
          throw new Error(`Failed to fetch data: ${error}`);
        }
        setTitle(data?.bio.jobTitle);
        setSummary(data?.bio.careerSummary.json);
      });
  }, []);

  return (
    <div className="bg-gray-50 p-8 w-full text-center">
      <h1 className="text-4xl font-bold text-gray-700">John Doe</h1>
      <h2 className="text-2xl font-semibold text-gray-700 py-3">{title}</h2>
      <div className="text-gray-500 mt-2 text-justify">
        <RichTextRenderer document={summary} />
      </div>
    </div>
  );
};

export default Hero;

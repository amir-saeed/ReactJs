import { useEffect, useState } from "react";
import { fetchPost } from "../utils/fetchBio";
import { GET_EXPERIENCE } from "../graphql/getExperience";
import RichTextRenderer from "./shared/RichTextRenderer";

const Experience = () => {
  const [entries, setEntries] = useState<any[] | null>([]);
  const fetchData = async () => {
    const url: string = `${import.meta.env.VITE_REACT_APP_URL}/${import.meta.env.VITE_REACT_APP_SPACE}`;
    const queryPayload = {
      query: GET_EXPERIENCE,
    };
    const data = JSON.stringify(queryPayload);
    const authToken = {
      Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_KEY}`,
      "Content-Type": "application/json",
    }
    const result: any = await fetchPost(url, data, authToken);

    const {
      data: {
        data: {
          experienceCollection: { items = [] } = {}
        } = {}
      } = {}
    } = result || {};

    return {
      response: items,
      error: result.error
    };
  }

  useEffect(() => {
    fetchData()
      .then(({ response, error }: any) => {
        if (error) {
          throw new Error(`Failed to fetch data: ${error}`);
        }
        setEntries(response);
      });
  }, []);

  return (
    <div className="join join-vertical w-full mt-5 mb-5">
      <h1 className="ml-4 w-full text-center font-bold text-[36px]">Experience</h1>
      {
        entries?.map((entry) => { 
           return (
            <div className="collapse collapse-arrow join-item border-b-2" key={entry.order}>
            <input type="radio" name="my-accordion-4" />
            <div className="collapse-title text-xl font-medium">
               {entry.companyName}
            </div>
            <div className="collapse-content">
              <RichTextRenderer document={entry.description} />
            </div>
          </div>
           )
        })
      }
    </div>
  );
};

export default Experience;

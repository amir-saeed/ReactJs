import { useContentfulEntries } from "../hooks/useFetchContententfulData";
import RichTextRenderer from "./shared/RichTextRenderer";

const Hero = () => {
  const { entries, loading, error } = useContentfulEntries("bio");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const jobTile = (entries?.[0]?.fields.jobTitle as string) ?? "";
  let careerSummary: any = entries?.[0]?.fields.careerSummary;

  console.log(entries);

  
  return (
    <div className="bg-gray-50 p-8 w-full text-center">
      <h1 className="text-4xl font-bold text-gray-700">John Doe</h1>
      <h2 className="text-2xl font-semibold text-gray-700 py-3">{jobTile}</h2>
      <div className="text-gray-500 mt-2 text-justify">
        <RichTextRenderer document={careerSummary} />
      </div>
    </div>
  );
};

export default Hero;

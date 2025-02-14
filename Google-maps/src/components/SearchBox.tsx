import { Autocomplete } from "@react-google-maps/api";

interface SearchBoxProps {
  onLoad: (autocomplete: google.maps.places.Autocomplete) => void;
  onPlaceChanged: () => void;
}

const SearchBox = ({ onLoad, onPlaceChanged }: SearchBoxProps) => {
  return (
    <div className="absolute top-4 left-4 z-10 w-96">
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder="Search locations..."
          className="w-full p-2 border rounded shadow-sm"
        />
      </Autocomplete>
    </div>
  );
};

export default SearchBox;

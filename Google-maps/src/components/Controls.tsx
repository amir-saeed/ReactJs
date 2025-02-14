interface ControlsProps {
  getUserLocation: () => void;
}

const Controls = ({ getUserLocation }: ControlsProps) => {
  return (
    <button
      onClick={getUserLocation}
      className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
    >
      Get My Location
    </button>
  );
};

export default Controls;

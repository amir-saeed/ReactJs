export const getUserLocation = (setCenter: Function, addMarker: Function) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(userLocation);
        addMarker({
          ...userLocation,
          id: "user-location",
          title: "Your Location",
          description: "You are here",
        });
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }
};

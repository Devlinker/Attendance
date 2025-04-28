export const getLocation = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser"));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            reject(new Error("Unable to retrieve location: " + error.message));
          },
          {
            enableHighAccuracy: true, // Ensures precise location
            timeout: 10000, // Wait up to 10 seconds
            maximumAge: 0, // Always get a fresh location
          }
        );
      }
    });
  };
  
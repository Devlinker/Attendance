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
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error("User denied the request for Geolocation."));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error("Location information is unavailable."));
              break;
            case error.TIMEOUT:
              reject(new Error("The request to get user location timed out."));
              break;
            default:
              reject(new Error("An unknown error occurred."));
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  });
};

export const getSystemInfo = () => {
  const ua = navigator.userAgent;
  const platform = navigator.platform;

  const osMatch = ua.match(/\(([^)]+)\)/); 
  const osInfo = osMatch ? osMatch[1] : "Unknown OS";

  let browser = "Unknown Browser";
  let version = "";

  if (ua.includes("Chrome")) {
    const match = ua.match(/Chrome\/([\d.]+)/);
    browser = "Chrome";
    version = match ? match[1] : "";
  } else if (ua.includes("Safari") && ua.includes("Version")) {
    const match = ua.match(/Version\/([\d.]+)/);
    browser = "Safari";
    version = match ? match[1] : "";
  } else if (ua.includes("Firefox")) {
    const match = ua.match(/Firefox\/([\d.]+)/);
    browser = "Firefox";
    version = match ? match[1] : "";
  } else if (ua.includes("Edg")) {
    const match = ua.match(/Edg\/([\d.]+)/);
    browser = "Edge";
    version = match ? match[1] : "";
  }

  const engineMatch = ua.match(/(AppleWebKit|Gecko)\/[\d.]+/);
  const engine = engineMatch ? engineMatch[0] : "Unknown Engine";

  return {
    platform,
    os: osInfo,
    browser: `${browser} ${version}`,
    engine,
    userAgent: ua,
  };
};

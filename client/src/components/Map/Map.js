import React, { useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Map.css";

mapboxgl.accessToken = 'pk.eyJ1Ijoidmluc21va2UiLCJhIjoiY2xzdGtpb2dmMTF1ZjJyczBpdHN1bjN6MCJ9.ctEn8V4u_p-SlP9EJOOwuw';

const Map = ({ setEventData, locationRef, setOpenLocation }) => {
  const [zoom, setZoom] = useState(13); // Initial zoom level

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: locationRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [13.7302, 45.5481], //Koper
      zoom: zoom,
    });

    // Add navigation control (zoom in/out)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('click', (e) => {
      const { lng, lat } = e.lngLat;
      // Optionally convert the lng/lat to a more user-friendly address using a geocoding API
      // and then pass it to the parent component
      // Here you can use Mapbox's geocoding service or another service like OpenCage
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`)
        .then((response) => response.json())
        .then((data) => {
          const placeName = data.features[0]?.place_name;
          setEventData((prev) => ({...prev, place:placeName, latitude:lat, longitude:lng}));
          setOpenLocation(false);
        })
        .catch((error) => console.log('Error fetching address:', error));

    });
    return () => map.remove(); // Cleanup on unmount
  }, []); 

  return <div className="map-container" ref={locationRef} />;
};

export default Map;

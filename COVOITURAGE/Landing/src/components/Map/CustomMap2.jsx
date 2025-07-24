import React, { useState } from "react";
import './CustomMap2.css'
import { Map, Marker} from "@vis.gl/react-google-maps";

const CustomMap = () => {
  
  // shows marker on London by default
  const [markerLocation, setMarkerLocation] = useState({
    lat: 36.7372, lng:  3.087
  });

  return (
    <div className="mapp-containe">
      <Map
        style={{ borderRadius: "20px" }}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={markerLocation} />
      </Map>
    </div>
  );
}

export default CustomMap;
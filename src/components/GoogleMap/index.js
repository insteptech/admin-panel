import React, { useState, useEffect } from 'react'
import GMap from "./Map";
const GOOGLE_MAP_API_KEY = ' AIzaSyDqWAalhVvsiQZ0dmaYXdFt320FZ6VggfU';
const GoogleMap = (props) => {
  // console.log(props.location, "longlonglonglonglonglong");
  const loadGoogleMapScript = (callback) => {

    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }


  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);

  return (
    <div className="googlemMap text-center">
      {!loadMap ? <div>Loading...</div> :
        props?.location[0] !== null && props?.location[1] !== null ?
          <GMap lat={props.location[0]} long={props.location[1]} />
          :
          // <GMap lat={props.location[0]} long={props.location[1]} />
          "No Location"
      }
    </div>
  );
}

export default GoogleMap;


// learn_mongodb


// mongodb+srv://learn_mongodb:learn_mongodb@cluster0.smmnx.mongodb.net/learn_mongodb?retryWrites=true&w=majority

// mongodb+srv://learn_mongodb:learn_mongodb@cluster0.smmnx.mongodb.net/test
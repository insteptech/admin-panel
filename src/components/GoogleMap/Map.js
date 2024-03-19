import React, { useEffect, useRef } from 'react';
const GMap = (props) => {
  // console.log(props, "ggggggggggggggggg");
  const googleMapRef = useRef(null);
  let googleMap = null;

  useEffect(() => {
    googleMap = initGoogleMap();
    createMarker();
  }, [props]);

  useEffect(() => {
    return () => {
      googleMap = null;
    };
  }, [props]);
  //   Number(props.lat), lng: Number(props.long)

  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      //   center: { lat: 26.7605533, lng: 83.3731667 },
      center: { lat: Number(props.lat), lng: Number(props.long) },
      zoom: 8
    });
  }

  // create marker on google map
  const createMarker = () => new window.google.maps.Marker({
    // position: { lat: 26.7605533, lng: 83.3731667  },
    position: { lat: Number(props.lat), lng: Number(props.long) },
    map: googleMap
  });

  return <div
    ref={googleMapRef}
    style={{ height: 500, width: 'auto' }}
  />
}

export default GMap;
import React from 'react'
import GoogleMap from '.'
import { useLocation } from "react-router-dom";

const MapModal = (props) => {
  // console.log(props, "props_props");
  const location = useLocation();
  const { pathname } = location;
  const page = pathname.split("/").pop();
  // console.log(page, "locationlocationlocationlocationlocationlocationlocationlocation");


  // const refreshMap = (e) => {
  //   // e.preventDefault();
  //   // props.history.location("/users")

  //   // console.log(props.history,"props.historyprops.history");
  //   window.location.href = `/users/${page}`

  // }
  return (
    <div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        data-backdrop="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true"
                //  onClick={(e) => refreshMap(e)}
                >
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <GoogleMap location={props.location} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapModal

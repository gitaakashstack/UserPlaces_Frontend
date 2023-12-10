import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Fragment } from "react";
import Modal from "../../shared/components/ui/Modal";
import Button from "../../shared/components/ui/Button";
import "../../index.css";
import "./MapModal.css";

const MapModal = function (props) {
  const location = {
    lat: 22.54904,
    lng: 88.336594,
  };

  const options = {
    disableDefaultUI: true,
    mapId: "18e3c580ad7960ff",
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBYdbVZQBK55-83r8H8npbGlw9JPgFj5Ao",
  });

  return isLoaded ? (
    <Modal
      modalHeader={props.modalHeader}
      modalFooter={
        <Fragment>
          <Button className="close-map-btn" onClick={props.onClick}>
            CLOSE
          </Button>
        </Fragment>
      }
    >
      <GoogleMap
        center={location}
        zoom={11}
        mapContainerClassName="map-container"
        options={options}
      ></GoogleMap>
    </Modal>
  ) : (
    <h3>Map loading</h3>
  );
};

export default MapModal;

/* child component of googleMap 
<div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "black",
            }}
            lat={location.lat}
            lng={location.lng}
            text="marker"
          ></div>
          */

import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Backdrop from "../../shared/components/ui/Backdrop";
import Button from "../../shared/components/ui/Button";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import Modal from "../../shared/components/ui/Modal";
import useHttp from "../../shared/hooks/use-http";
import authContext from "../../store/authContext";
import MapModal from "./MapModal";
import "./PlaceItem.css";
import ErrorModal from "../../shared/components/ui/ErrorModal";

const PlaceItem = function (props) {
  const [showMapModal, setShowMapModal] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);
  const [isLoading, error, sendHttpRequest, clearError] = useHttp();
  const { token } = useContext(authContext);

  function showMapHandler() {
    setShowMapModal(true);
  }

  function closeMapHandler() {
    setShowMapModal(false);
  }

  const mapModalElement = (
    <MapModal modalHeader={props.placeData.address} onClick={closeMapHandler} />
  );

  function showDelModalHandler() {
    setShowDelModal(true);
  }

  function closeDelModalHandler() {
    setShowDelModal(false);
  }

  function deletePlaceHandler() {
    closeDelModalHandler();
    sendHttpRequest(
      `http://localhost:5000/api/places/${props.placeData._id}`,
      "DELETE",
      null,
      { Authorization: "Bearer " + token }
    )
      .then(() => props.onDeletePlace(props.placeData._id))
      .catch(() => {});
  }

  const delModalElement = (
    <Modal
      modalHeader="Are You Sure"
      modalFooter={
        <Fragment>
          <Button
            className="cancel-del-modal-btn"
            onClick={closeDelModalHandler}
          >
            CANCEL
          </Button>
          <Button className="del-place-btn" onClick={deletePlaceHandler}>
            DELETE
          </Button>
        </Fragment>
      }
    >
      Once deleted, the place cannot be restored!
    </Modal>
  );

  return (
    <Fragment>
      {isLoading && (
        <>
          <Backdrop />
          <LoadingSpinner />
        </>
      )}
      {showMapModal && mapModalElement}
      {showDelModal && delModalElement}
      {showMapModal || showDelModal ? (
        showMapModal ? (
          <Backdrop onClick={closeMapHandler} />
        ) : (
          <Backdrop onClick={closeDelModalHandler} />
        )
      ) : null}
      {error && <ErrorModal onClick={clearError}>{error.message}</ErrorModal>}

      <li className="place-item">
        <div className="place-img-container">
          <img
            src={`http://localhost:5000/${props.placeData.image}`}
            alt="Ratneshwar Mahadev Temple"
          ></img>
        </div>
        <section className="img-details">
          <h2 className="img-name">{props.placeData.title}</h2>
          <h4 className="img-address">{props.placeData.address}</h4>
          <p className="img-description">{props.placeData.description}</p>
        </section>
        <footer className="img-btns">
          <Button className="map-btn" onClick={showMapHandler}>
            VIEW ON MAP
          </Button>
          <Button
            to={`/api/places/${props.placeData._id}`}
            className="edit-btn"
          >
            EDIT
          </Button>
          <Button className="del-btn" onClick={showDelModalHandler}>
            DELETE
          </Button>
        </footer>
      </li>
    </Fragment>
  );
};

export default PlaceItem;

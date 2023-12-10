import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Backdrop from "../../shared/components/ui/Backdrop";
import CenteredCard from "../../shared/components/ui/CenteredCard";
import ErrorModal from "../../shared/components/ui/ErrorModal";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import useHttp from "../../shared/hooks/use-http";
import PlaceItem from "./PlaceItem";
import "./PlaceList.css";

const PlaceList = function () {
  const [isLoading, error, sendHttpRequest, clearError] = useHttp();
  const { userID } = useParams();
  let [loadedUserPlaces, setUserPlaces] = useState(null);

  useEffect(() => {
    sendHttpRequest(`http://localhost:5000/api/places/user/${userID}`)
      .then((responseData) => setUserPlaces(responseData.data))
      .catch(() => {});
  }, [sendHttpRequest, userID]);

  function filterLoadedPlacesHandler(deletedPlaceID) {
    console.log(loadedUserPlaces);
    setUserPlaces((prevPlaces) => {
      return prevPlaces.filter((placeObj) => placeObj._id !== deletedPlaceID);
    });
  }
  let placesList = [];

  if (loadedUserPlaces) {
    placesList =
      loadedUserPlaces.length === 0 ? (
        <CenteredCard>Could Not Find Any Place For This User</CenteredCard>
      ) : (
        loadedUserPlaces.map((pd) => (
          <PlaceItem
            placeData={pd}
            key={pd._id}
            onDeletePlace={filterLoadedPlacesHandler}
          />
        ))
      );
  }

  return (
    <>
      {isLoading && <Backdrop />}
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && (
        <>
          <Backdrop />
          <ErrorModal onClick={clearError}>{error.message}</ErrorModal>
        </>
      )}
      <ul className="place-list">{placesList}</ul>;
    </>
  );
};

export default PlaceList;

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import useHttp from "../../shared/hooks/use-http";
import UpdatePlaceForm from "../components/UpdatePlaceForm";
import Backdrop from "../../shared/components/ui/Backdrop";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import ErrorModal from "../../shared/components/ui/ErrorModal";
import authContext from "../../store/authContext";

const initialFormData = {
  title: "",
  description: "",
};

const UpdatePlace = function () {
  const [isLoading, backendError, sendHttpRequest, clearError] = useHttp();
  const { placeID } = useParams();
  const navigate = useNavigate();
  const [oldFormData, setOldFormData] = useState(initialFormData);
  const [receivedOldPlaceData, setReceivedOldPlaceData] = useState(false); // if this state is not used, then <UpdatePlaceForm> component is rendered before receiving the old data(which is executed in use effect) and hence the initial state value of title and description in custom hook is initialized by an empty string. So, to initialize by form data only, we must wait until form data is recived to render the UpdatePlaceForm component
  const { userID, token } = useContext(authContext);

  useEffect(() => {
    sendHttpRequest(`http://localhost:5000/api/places/${placeID}`)
      .then((responseData) => responseData.data)
      .then(({ title = "", description = "" }) =>
        setOldFormData({ title, description })
      )
      .then(() => setReceivedOldPlaceData(true))
      .catch(() => {});
  }, [sendHttpRequest]);

  function updatePlaceHandler(newFormData) {
    sendHttpRequest(
      `http://localhost:5000/api/places/${placeID}`,
      "PATCH",
      newFormData,
      { "Content-Type": "application/json", Authorization: "Bearer " + token }
    )
      .then(() => navigate(`/api/places/user/${userID}`))
      .catch((err) => {});
  }
  return (
    <>
      {isLoading && (
        <>
          <Backdrop />
          <LoadingSpinner />
        </>
      )}

      {receivedOldPlaceData && (
        <UpdatePlaceForm
          oldFormData={oldFormData}
          updatePlaceHandler={updatePlaceHandler}
          backendError={backendError}
        />
      )}
    </>
  );
};

export default UpdatePlace;

/*{!isLoading && error && (
        <>
          <Backdrop />
          <ErrorModal onClick={clearError}>{error}</ErrorModal>
        </>
      )}*/

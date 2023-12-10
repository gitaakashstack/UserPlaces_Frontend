import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../shared/components/ui/LoadingSpinner";
import useHttp from "../../shared/hooks/use-http";
import UserItem from "./UserItem";
import "./UserList.css";
import Backdrop from "../../shared/components/ui/Backdrop";

const UserList = function () {
  const [isLoading, error, sendHttpRequest] = useHttp();
  const [loadedUsers, setLoadedUsers] = useState(null);
  console.log(error);

  useEffect(() => {
    sendHttpRequest("http://localhost:5000/api/users")
      .then((responseData) => setLoadedUsers(responseData.data))
      .catch(() => {});
  }, [sendHttpRequest]);

  let userList = [];

  if (loadedUsers)
    userList = loadedUsers.map((userData) => (
      <CSSTransition
        timeout={1000}
        appear
        mountOnEnter
        key={userData._id}
        classNames="loading"
      >
        <UserItem
          key={userData._id}
          userData={{
            name: userData.name,
            avatarImgUrl: userData.image,
            placesCount: userData.places.length,
          }}
        />
      </CSSTransition>
    ));

  return (
    <>
      {isLoading && <Backdrop />}
      {isLoading && <LoadingSpinner />}
      {!isLoading && error && (
        <div className="error-container">{error.message}</div>
      )}
      {!isLoading && loadedUsers && loadedUsers.length === 0 && (
        <div className="error-container">No users found</div>
      )}
      {!isLoading && loadedUsers && loadedUsers.length > 0 && (
        <TransitionGroup component="ul" className="user-list">
          {userList}
        </TransitionGroup>
      )}
    </>
  );
};

export default UserList;

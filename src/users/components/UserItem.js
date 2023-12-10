import "./UserItem.css";

const UserItem = function (props) {
  const {
    userData: { avatarImgUrl, placesCount, name },
  } = props;
  console.log(avatarImgUrl);

  return (
    <li className="user-item-container xx">
      <div className="avatar">
        <img
          src={`http://localhost:5000/${avatarImgUrl}`}
          alt="Profile Pic"
        ></img>
      </div>
      <div className="user-info">
        <h3 className="user-name">{name}</h3>
        <p className="place-count">
          {placesCount === 1 ? `${placesCount} Place` : `${placesCount} Places`}
        </p>
      </div>
    </li>
  );
};

export default UserItem;

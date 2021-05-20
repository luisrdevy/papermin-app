import { useUser } from "../context/UserContext";

const UserMinimal = () => {
  const { user, logout } = useUser();
  return (
    <div>
      {user && (
        <div onClick={logout}>
          <img
            src={user.photoURL || ""}
            alt={user.displayName || ""}
            width="50"
            height="50"
          />
          <span>{user.displayName}</span>
        </div>
      )}
    </div>
  );
};

export default UserMinimal;

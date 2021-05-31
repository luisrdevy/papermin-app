import { useUser } from "../context/UserContext";

const UserMinimal = () => {
  const { user, logout } = useUser();
  return (
    <div>
      {user && (
        <div onClick={logout} style={{ display: "flex", alignItems: "center" }}>
          <span>{user.displayName}</span>
          <img
            src={user.photoURL || ""}
            alt={user.displayName || ""}
            width="50"
            height="50"
            style={{ borderRadius: "50%", marginLeft: ".5rem" }}
          />
        </div>
      )}
    </div>
  );
};

export default UserMinimal;

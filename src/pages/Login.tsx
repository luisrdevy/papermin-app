import { useUser } from "../context/UserContext";

const Login = () => {
  const { login } = useUser();
  return (
    <div>
      <p>Login</p>
      <button onClick={login}>login with google</button>
    </div>
  );
};

export default Login;

import { AuthConsumer } from "../context/loginContext";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const { authed } = AuthConsumer();

  return authed === true ? children : <Navigate to="/" replace />;
}

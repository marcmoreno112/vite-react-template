import { AuthConsumer } from "../shared/adapters/adapters";
import LoginScreen from "./layoutLoginUser";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function ProtectedRoute({ children }: Props) {
  const { authed } = AuthConsumer();

  return authed ? children : <LoginScreen />;
}

import { AuthConsumer } from "../shared/adapters/adapters";

interface Auth {
  authed: boolean;
  logout: () => void;
}

export default function Dashboard() {
  const auth = AuthConsumer();

  if (!auth) {
    return null;
  }

  const { logout } = auth as Auth;
  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-screen">
      <header>
        <nav>
          <ul>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </header>
      <body>
        <h1>Dashboard</h1>
      </body>
    </div>
  );
}

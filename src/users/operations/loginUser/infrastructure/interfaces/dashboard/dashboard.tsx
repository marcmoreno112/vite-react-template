import { ScaleButton } from "@telekom/scale-components-react";
import { AuthConsumer } from "../../../application/adapters/adapters";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const auth = AuthConsumer();
  const navigate = useNavigate();

  if (!auth) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/import-data");
  };

  return (
    <div className="dashboard-screen">
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <ScaleButton className="button" type="submit">
          Importar datos
        </ScaleButton>
      </form>
    </div>
  );
}

import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <Link to="/create-deck">Create Deck</Link>
    </>
  );
};

export default Dashboard;

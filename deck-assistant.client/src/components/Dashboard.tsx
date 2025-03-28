import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/api-client";

interface Deck {
  id: string;

  title: string;

  companyName: string;

  industry: string;

  problemStatement: string;

  solution: string;

  businessModel: string;

  financials: string;

  teamInfo: string;
}

const Dashboard = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get<Deck[]>("/decks")
      .then((res) => setDecks(res.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <>
      <div>Dashboard</div>
      <ul>
        {decks.map((deck) => (
          <li>{deck.id}</li>
        ))}
      </ul>
      <Link to="/create-deck">Create Deck</Link>
      {error}
    </>
  );
};

export default Dashboard;

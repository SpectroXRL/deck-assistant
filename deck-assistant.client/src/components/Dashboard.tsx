import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-black text-white px-6 py-4">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Create Deck Button */}
        <Link
          to="/create-deck"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium mb-8"
        >
          Create Deck
          <Plus size={20} />
        </Link>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Decks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {decks.map((deck) => (
            <Link
              key={deck.id}
              to="/deck-viewer"
              state={{ deckId: deck.id, title: deck.title }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer block"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {deck.title}
              </h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Company:</span> {deck.companyName}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Industry:</span> {deck.industry}
              </p>
              <p className="text-gray-500 text-sm mt-4 line-clamp-2">
                {deck.problemStatement}
              </p>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {decks.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No decks yet. Create your first deck to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

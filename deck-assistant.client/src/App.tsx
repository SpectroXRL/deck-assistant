import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import DeckViewer from "./components/DeckViewer";
import { SlideSchema } from "./components/Slide";
import apiClient from "./services/api-client";
import { ArrowLeft } from "lucide-react";

interface CreateDeck {
  title: string;
  companyName: string;
  industry: string;
  problemStatement: string;
  solution: string;
  businessModel: string;
  financials: string;
  teamInfo: string;
}

interface SlidesResponse {
  deckId: string;
  slideGroup: SlideSchema[];
}

function App() {
  const location = useLocation();
  const [slides, setSlides] = useState<SlideSchema[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const state = location.state as { deckId: string; title: string } | null;

    if (!state?.deckId) {
      setError("No deck selected");
      setLoading(false);
      return;
    }

    setTitle(state.title);

    // Fetch slides for the selected deck
    apiClient
      .get<SlidesResponse>(`/decks/${state.deckId}/slides`)
      .then((res) => {
        setSlides(res.data.slideGroup);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [location.state]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading deck...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-red-600 text-lg mb-4">Error: {error}</p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors font-medium"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const deckId = (location.state as { deckId: string; title: string } | null)
    ?.deckId || "";

  return (
    <div className="relative">
      {/* Back Button */}
      <Link
        to="/"
        className="absolute top-4 left-4 z-20 bg-white shadow-md rounded-full p-3 hover:bg-gray-100 transition-colors"
        title="Back to Dashboard"
      >
        <ArrowLeft size={24} />
      </Link>

      <DeckViewer title={title} slides={slides} deckId={deckId} />
    </div>
  );
}

export const addEntry = (data: CreateDeck) => {
  // Generate deck via AI
  return apiClient
    .post("/ai/generate-deck", data)
    .then((res) => {
      const generatedDeck = res.data;

      // Save deck metadata
      return apiClient.post("/decks", {
        title: data.title,
        companyName: data.companyName,
        industry: data.industry,
        problemStatement: data.problemStatement,
        solution: data.solution,
        businessModel: data.businessModel,
        financials: data.financials,
        teamInfo: data.teamInfo,
      });
    })
    .then((deckRes) => {
      const deckId = deckRes.data.id;

      // Save slides
      return apiClient.post(`/decks/${deckId}`, {
        slideGroup: [], // This should contain the generated slides from AI
      });
    });
};

export default App;

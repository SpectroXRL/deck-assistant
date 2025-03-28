import { useEffect, useState } from "react";
import DeckViewer, { DeckSchema } from "./components/DeckViewer";
import apiClient from "./services/api-client";
import { data } from "react-router-dom";

interface CreateDeck {
  companyName: string;
  industry: string;
  problemStatement: string;
  solution: string;
  businessModel: string;
  financials: string;
  teamInfo: string;
}

function App() {
  const [deck, setDeck] = useState<DeckSchema>({ title: "", slides: [] });
  const [error, setError] = useState("");

  const originalEntries = deck;

  useEffect(() => {
    apiClient
      .post("/ai/generate-deck", data)
      .then((res) => setDeck(res.data))
      .catch((err) => {
        setError(err.message);
        setDeck(originalEntries);
      });
  }, []);

  return (
    <>
      <DeckViewer title={deck.title} slides={deck.slides} />
      {error}
    </>
  );
}

export const addEntry = (data: CreateDeck) => {
  apiClient.post("/timetable-entries", data);
};

export default App;

import { useEffect, useState } from "react";
import DeckViewer, { DeckSchema } from "./components/DeckViewer";
import apiClient from "./services/api-client";

function App() {
  const [deck, setDeck] = useState<DeckSchema>({ title: "", slides: [] });
  const [error, setError] = useState("");
  const data = {
    companyName: "EcoTech Solutions",
    industry: "Renewable Energy",
    problemStatement: "High carbon emissions from traditional energy sources",
    solution: "Affordable solar panels with 40% higher efficiency",
    businessModel: "Direct-to-consumer sales and installation services",
    financials: "Projected $2M revenue in Year 1, $8M in Year 2",
    teamInfo: "Founded by engineers from MIT and Stanford",
  };

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

export default App;

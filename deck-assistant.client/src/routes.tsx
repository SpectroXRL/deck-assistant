import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateDeckForm from "./components/CreateDeckForm";
import App, { addEntry } from "./App";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/create-deck", element: <CreateDeckForm onSubmit={addEntry} /> },
  { path: "/deck-viewer", element: <App /> },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateDeckForm from "./components/CreateDeckForm";
import App from "./App";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "/create-deck", element: <CreateDeckForm /> },
  { path: "/deck-viewer", element: <App /> },
]);

export default router;

import { Navbar } from "./components/layout/Navbar.tsx";
import { NewNoteInput } from "./components/form/NewNoteInput.tsx";
import { Dashboard } from "./components/layout/Dashboard.tsx";

export function App() {
  return (
    <>
      <Navbar />
      <NewNoteInput />
      <Dashboard />
    </>
  );
}

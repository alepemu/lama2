import { Navbar } from "./components/layout/Navbar.tsx";
import { NewNoteInput } from "./components/form/NewNoteInput.tsx";
import { Dashboard } from "./components/layout/Dashboard.tsx";

export function App() {
  return (
    <div className="bg-zinc-900 text-white">
      <Navbar />
      <NewNoteInput />
      <Dashboard />
    </div>
  );
}

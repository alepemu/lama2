import { Navbar } from "./components/layout/Navbar.tsx";
import { CreateNewNote } from "./components/form/CreateNewNote.tsx";
import { Dashboard } from "./components/layout/Dashboard.tsx";

export function App() {
  return (
    <div className="bg-zinc-900">
      <Navbar />
      <CreateNewNote />
      <Dashboard />
    </div>
  );
}

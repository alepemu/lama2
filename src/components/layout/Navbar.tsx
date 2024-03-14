import { version } from "../../../package.json";

export function Navbar() {
  return (
    <div className="flex justify-between items-center h-12 px-4 bg-zinc-800">
      <h1 className="text-xl font-bold">LAMA2</h1>
      <h1 className="text-md opacity-50">v{version}</h1>
    </div>
  );
}

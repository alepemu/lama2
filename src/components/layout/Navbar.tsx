import { version } from "../../../package.json";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center h-10 px-4 bg-zinc-800">
      <h1 className="text-xl font-bold">LAMA2</h1>
      <h2 className="text-md opacity-50">v{version}</h2>
    </div>
  );
};

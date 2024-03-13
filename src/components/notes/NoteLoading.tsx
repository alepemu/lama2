import { FC } from "react";

const NoteLoading: FC = () => {
  return (
    <div className="flex flex-col justify-center min-w-80 min:h-24 overflow-hidden bg-gradient-to-br from-stone-600 to-stone-700 p-4 rounded-xl border-2 border-white/25 animate-fade-in">
      <div className="flex w-fit mx-auto animate-bounce-side">
        <svg
          className="bg-white/50 animate-spin-slow h-12 w-12 rounded-xl"
          viewBox="0 0 24 24"
        />
      </div>
    </div>
  );
};

export { NoteLoading };

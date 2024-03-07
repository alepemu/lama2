import { FC } from "react";

const LoadingNote: FC = () => {
  return (
    <div className="flex flex-col justify-center min-w-80 min:h-24 overflow-hidden bg-stone-700/50 p-4 rounded-xl text-white border-2 border-white/25">
      <div className="flex w-fit mx-auto animate-bounce-side">
        <svg
          className="bg-white/50 animate-spin-slow h-12 w-12 rounded-xl"
          viewBox="0 0 24 24"
        />
      </div>
    </div>
  );
};

export { LoadingNote };

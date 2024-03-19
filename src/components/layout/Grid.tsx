import { ReactNode } from "react";
// Hooks
import { useSize } from "@/hooks/useSize";

export const Grid = ({ children }: { children: ReactNode }) => {
  const [sizeRef, size] = useSize({ px: 32 });
  const columns = Math.floor(size.width / 320);

  return (
    <div
      ref={sizeRef}
      className="grid gap-3 p-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
};

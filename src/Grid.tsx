import { ReactNode } from "react";
import { useSize } from "./hooks/useSize";

export function Grid({ children }: { children: ReactNode }) {
  const [sizeRef, size] = useSize();
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
}

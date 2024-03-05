import { ReactNode } from "react";
import { useSize } from "../hooks/useSize";
import constants from "../utils/constants";

export function Grid({ children }: { children: ReactNode }) {
  const [sizeRef, size] = useSize({ px: 32 });
  const columns = Math.floor(size.width / constants.itemMinWidth);

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

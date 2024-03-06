import { useEffect, useState } from "react";

export function useSize({ px = 0, py = 0 }: { px?: number; py?: number }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [element, ref] = useState<Element | null>();

  useEffect(() => {
    if (!element) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width - px);
      setHeight(entry.contentRect.height - py);
    });

    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [element]);

  return [ref, { width, height }] as const;
}

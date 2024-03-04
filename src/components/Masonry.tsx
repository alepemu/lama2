import { Fragment, Key, ReactNode } from "react";
import { range } from "../services/range";
import { useSize } from "../hooks/useSize";

export function Masonry<T>({
  items,
  itemKey,
  renderItem,
}: {
  items: T[];
  itemKey: (item: T) => Key;
  renderItem: (item: T) => ReactNode;
}) {
  const [sizeRef, size] = useSize();
  const columns = Math.floor(size.width / 300);
  const gap = 8;

  return (
    <div ref={sizeRef} className="flex" style={{ gap }}>
      {range(columns).map((columnIndex) => (
        <div key={columnIndex} className="flex flex-col flex-1" style={{ gap }}>
          {range(columnIndex, items.length, columns).map((itemIndex) => (
            <Fragment key={itemKey(items[itemIndex])}>
              {renderItem(items[itemIndex])}
            </Fragment>
          ))}
        </div>
      ))}
    </div>
  );
}

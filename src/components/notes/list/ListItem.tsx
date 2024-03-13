import { useState } from "react";


type ListItemProps = {
  index: number;
  item: string;
  updateList: (item: string) => void;
};

export function ListItem({ index, item: content, updateList }: ListItemProps) {
  const [item, setItem] = useState(content);

  return (
    <>
      <input
        key={index}
        name={"list-item-" + index}
        tabIndex={-1}
        value={item}
        onChange={(event) => {
          setItem(event.target.value);
          updateList(event.target.value);
        }}
        className="w-full bg-transparent focus:outline-none text-base"
      />
    </>
  );
}

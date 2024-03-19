import { useState } from "react";
import { X } from "lucide-react";

type ListItemProps = {
  index: number;
  item: string;
  updateList: (item: string) => void;
  removeItem: () => void;
};

export const ListItem = ({
  index,
  item: content,
  updateList,
  removeItem,
}: ListItemProps) => {
  const [item, setItem] = useState(content);

  return (
    <div className="group flex justify-between">
      <input
        key={index}
        name={"list-item-" + index}
        tabIndex={-1}
        value={item}
        onChange={(event) => {
          setItem(event.target.value);
          updateList(event.target.value);
        }}
        className="w-11/12 bg-transparent focus:outline-none text-base"
      />
      <button
        className="opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in-out"
        onClick={removeItem}
      >
        <X />
      </button>
    </div>
  );
};

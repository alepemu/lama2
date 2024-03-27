// Components
import { ListItem } from "@/components/notes/list/ListItem";

type ListGroupProps = {
  list: { itemId: number; item: string }[] | undefined;
  setList: React.Dispatch<
    React.SetStateAction<{ itemId: number; item: string }[] | undefined>
  >;
  listNewItem: string;
  setListNewItem: React.Dispatch<React.SetStateAction<string>>;
};

export const ListGroup = ({
  list,
  setList,
  listNewItem,
  setListNewItem,
}: ListGroupProps) => {
  const updateListItem = (index: number, updatedItem: string) => {
    setList((list) => {
      const newList = [...(list ?? [])];
      newList[index] = { itemId: newList[index].itemId, item: updatedItem };
      return newList;
    });
  };

  const removeListItem = (index: number) => {
    setList((list) => {
      const newList = [...(list ?? [])];
      newList.splice(index, 1);
      return newList;
    });
  };

  const handleInputSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const item = { itemId: Date.now(), item: listNewItem };
    setList((list) => [...(list ?? []), item]);
    setListNewItem("");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListNewItem(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && listNewItem === "" && list?.length) {
      const previousValue = list[list.length - 1].item + " ";
      const updatedList = list.slice(0, -1);
      setList(updatedList);
      setListNewItem(previousValue);
    }
  };

  if (list) {
    return (
      <>
        <ul className="list-disc ml-4">
          {list?.map((item, index) => (
            <li key={item.itemId} className="break-words">
              <ListItem
                index={index}
                item={item.item}
                updateList={(updatedItem) => updateListItem(index, updatedItem)}
                removeItem={() => removeListItem(index)}
              />
            </li>
          ))}
          <li>
            <form onSubmit={handleInputSubmit}>
              <input
                name="list-item-new"
                placeholder="List item"
                // tabIndex={-1}
                value={listNewItem}
                autoComplete="off"
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="w-4/5 bg-transparent focus:outline-none text-base"
              />
            </form>
          </li>
        </ul>
      </>
    );
  }
};

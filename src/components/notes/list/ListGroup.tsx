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

export const ListGroup: React.FC<ListGroupProps> = ({
  list,
  setList,
  listNewItem,
  setListNewItem,
}) => {
  const updateListItem = (index: number, updatedItem: string) => {
    setList((list) => {
      const newList = [...(list ?? [])];
      newList[index] = { itemId: newList[index].itemId, item: updatedItem };
      return newList;
    });
  };

  const handleEditList = (event: React.FormEvent) => {
    event.preventDefault();
    if (listNewItem === "") return;
    const item = { itemId: Date.now(), item: listNewItem };
    setList((list) => [...(list ?? []), item]);
    setListNewItem("");
  };

  return (
    <>
      <ul className="list-disc ml-4">
        {list?.map((item, index) => (
          <li key={item.itemId} className="break-words">
            <ListItem
              index={index}
              item={item.item}
              updateList={(updatedItem) => updateListItem(index, updatedItem)}
              removeItem={() =>
                setList((list) => {
                  const newList = [...(list ?? [])];
                  newList.splice(index, 1);
                  return newList;
                })
              }
            />
          </li>
        ))}
        <li>
          <form onSubmit={handleEditList}>
            <input
              name="list-item-new"
              placeholder="List item"
              tabIndex={-1}
              value={listNewItem}
              autoComplete="off"
              onChange={(event) => setListNewItem(event.target.value)}
              className="w-4/5 bg-transparent focus:outline-none text-base"
            />
          </form>
        </li>
      </ul>
    </>
  );
};

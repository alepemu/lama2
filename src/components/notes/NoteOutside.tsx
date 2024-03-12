// State
import { useAppDispatch } from "@/hooks/store";
import { deleteNoteById } from "@/store/notes.slice";
// Types
import { NoteBasicProps } from "@/types";

const NoteOutside = ({ id, data }: NoteBasicProps) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <button
        className="absolute top-0 right-2 text-red-300/25 cursor-pointer"
        onClick={() => dispatch(deleteNoteById(id || "1"))}
      >
        x
      </button>

      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="break-words font-bold text-xl">{data.title}</h1>
          {data.typeId === 0 && <p>{data.text}</p>}
          {data.typeId === 1 && (
            <ul className="list-disc ml-4">
              {data.list?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-right text-xs italic opacity-50">id-{id}</p>
      </div>
    </>
  );
};
export { NoteOutside };

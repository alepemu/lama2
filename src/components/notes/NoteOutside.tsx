// Types
import { NoteBasicProps } from "@/types";

const NoteOutside = ({ id, data }: NoteBasicProps) => {
  return (
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
      {/* <p className="text-right text-xs italic opacity-50">id-{id}</p> */}
    </div>
  );
};
export { NoteOutside };

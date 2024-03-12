// Components
import Button from "@/components/buttons/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/shadcn/Dialog";
// Types
import { NoteBasicProps } from "@/types";

const NoteOpen = ({ id, data }: NoteBasicProps) => {
  return (
    <DialogContent className="w-5/6 bg-gradient-to-br from-stone-600 to-stone-700 text-white border-2 border-white/25">
      <DialogHeader>
        <DialogTitle>
          <input
            value={data.title}
            className="w-full bg-transparent focus:outline-none"
          />
        </DialogTitle>
        <DialogDescription className="text-white">
          {data.typeId === 0 && (
            <textarea
              value={data.text}
              className="w-full h-60 resize-none bg-transparent focus:outline-none"
            />
          )}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit" className={"bg-teal-600"}>
          Save
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export { NoteOpen };

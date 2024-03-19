import { CSSProperties } from "react";
// State
import { useAppDispatch } from "@/hooks/store";
import { updateNoteById, deleteNoteById } from "@/store/notes.slice";
// Components
import { Button } from "@/components/shadcn/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/shadcn/Sheet";
// Icons
import { Save, Trash, Paintbrush } from "lucide-react";
// Types
import { NoteActionProps } from "@/types";
// Styles
import { bgNoteColor } from "@/utils/placeholders";

export const NoteActions = ({ id, data, handleEditNote }: NoteActionProps) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="flex justify-end items-center gap-1.5">
        <Sheet>
          <Button
            title="Delete button"
            variant="action"
            size="mini"
            className="bg-stone-800/50"
            onClick={() => {
              dispatch(deleteNoteById(id));
            }}
          >
            <Trash className="h-4" />
          </Button>
          <SheetTrigger asChild>
            <Button
              title="Theme button"
              variant="action"
              size="mini"
              className="bg-stone-800/50"
            >
              <Paintbrush className="h-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom">
            <div className="flex justify-between max-w-screen-sm mx-auto">
              {Object.entries(bgNoteColor).map(([key, value]) => {
                const inlineStyles: CSSProperties = {
                  background: `linear-gradient(to right, ${value[0]}, ${value[1]})`,
                };
                return (
                  <button
                    key={key}
                    className="h-11 w-11 border-2 border-white/25 rounded-full"
                    style={inlineStyles}
                    onClick={() => {
                      dispatch(
                        updateNoteById({
                          id,
                          data: {
                            ...data,
                            theme: key,
                          },
                        })
                      );
                    }}
                  />
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
        <Button
          title="Save button"
          variant="action"
          size="mini"
          className="bg-white/20"
          onClick={(event) => handleEditNote(event)}
        >
          <p>SAVE</p>
          <Save className="h-4" />
        </Button>
      </div>
    </>
  );
};

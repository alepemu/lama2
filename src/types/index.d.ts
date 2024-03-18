import { HTMLAttributes } from "react";

export type NoteDataType = {
  data: {
    title: string;
    text?: string;
    list?: { itemId: number; item: string }[];
    typeId: number;
    theme?: string;
  };
};

export type NoteType = NoteDataType & {
  id: string;
  isDragging?: boolean;
};

export type NoteProps = NoteType & HTMLAttributes<HTMLDivElement>;

export type NoteCloseProps = {
  data: NoteDataType["data"];
  isDragging?: boolean;
  style?: HTMLAttributes<HTMLDivElement>["style"];
};

export type NoteOpenProps = NoteType & {
  close: () => void;
};

export type NoteActionProps = NoteType & {
  handleEditNote: (event: React.FormEvent) => void;
};

export type NoteTypes = "note" | "list";
export type NoteMethods = "manual" | "ai";

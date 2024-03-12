import { HTMLAttributes } from "react";

export type NoteInputType = {
  data: {
    title: string;
    text?: string;
    list?: string[];
    typeId: number;
  };
};

export type NoteType = NoteInputType & {
  id: string;
  isDragging?: boolean;
};

export type NoteProps = NoteType & HTMLAttributes<HTMLDivElement>;

export type NoteTypes = "note" | "list";
export type NoteMethods = "manual" | "ai";

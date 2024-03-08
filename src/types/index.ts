import { HTMLAttributes } from "react";

export type NoteType = {
  id: string;
  position?: number;
  data: {
    title: string;
    text: string;
    list?: string[];
  };
  isDragging?: boolean;
};

export type NoteProps = NoteType & HTMLAttributes<HTMLDivElement>;

export type NoteTypes = "note" | "list";
export type NoteMethods = "manual" | "ai";
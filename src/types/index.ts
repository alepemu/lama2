import { HTMLAttributes } from "react";

export type NoteInputType = {
  data: {
    title: string;
    text?: string;
    list?: string[];
    typeId: number;
  };
};

export type NoteBasicProps = {
  id: string;
  data: NoteInputType["data"];
};

export type NoteOutsideProps = NoteBasicProps & {
  isDragging?: boolean;
  style?: HTMLAttributes<HTMLDivElement>["style"];
};

export type NoteOpenProps = NoteBasicProps & {
  close: () => void;
};

export type NoteType = NoteInputType & {
  id: string;
  isDragging?: boolean;
};

export type NoteProps = NoteType & HTMLAttributes<HTMLDivElement>;

export type NoteTypes = "note" | "list";
export type NoteMethods = "manual" | "ai";

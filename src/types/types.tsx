import { HTMLAttributes } from "react";

export type ItemType = { id: number; text: string };

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  text?: string;
  isDragging?: boolean;
};
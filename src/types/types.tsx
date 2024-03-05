import { HTMLAttributes } from "react";

export type ItemType = { id: string; text: string };

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
  id: string;
  text?: string;
  isDragging?: boolean;
};
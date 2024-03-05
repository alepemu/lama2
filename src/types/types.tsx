import { HTMLAttributes } from "react";

export type ItemType = {
  id: string;
  position?: number;
  title: string;
  text: string;
  isDragging?: boolean;
};

export type ItemProps = ItemType & HTMLAttributes<HTMLDivElement>;

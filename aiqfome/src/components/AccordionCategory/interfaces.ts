import { ReactNode } from "react";

export interface AccordionCategoryProps {
  title: string;
  description?: string;
  icon?: boolean;
  children: ReactNode;
  value: string;
}
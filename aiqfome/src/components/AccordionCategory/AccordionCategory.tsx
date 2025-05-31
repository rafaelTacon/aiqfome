'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { AccordionCategoryProps } from './interfaces';
import { CircleDollarSign } from 'lucide-react';

export default function AccordionCategory({ title, description, icon, children, value }: AccordionCategoryProps) {
  console.log('icon', icon)
  return (
    <Accordion.Item value={value} className="border-b-4 border-neutral-100">
      <Accordion.Header>
        <Accordion.Trigger className="group flex w-full justify-between items-center px-4 pb-3 bg-white hover:bg-gray-50 transition">
          <div className="flex flex-col text-left gap-1">
            <span className="flex items-center gap-1 font-bold text-gray-900">
              {title}
              {icon && <CircleDollarSign className="w-4 h-5 text-green-500" />}
            </span>
            {description && <span className="text-xs text-gray-500">{description}</span>}
          </div>
          <ChevronDownIcon
            className="w-5 h-5 text-gray-500 transition-transform duration-200 group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="px-4 pb-3 pt-1 bg-white text-sm text-gray-700">
        {children}
      </Accordion.Content>
    </Accordion.Item>
  );
}

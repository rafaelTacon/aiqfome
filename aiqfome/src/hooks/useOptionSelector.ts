import { useState } from 'react';
import { ProdutoOption } from '@/app/item/[id]/interfaces';

export function useOptionSelector(options: ProdutoOption[]) {
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const isSelected = (groupTitle: string, label: string): boolean =>
    selected[groupTitle]?.includes(label) ?? false;

  const isDisabled = (groupTitle: string, label: string): boolean => {
    const group = options.find((opt) => opt.title === groupTitle);
    const current = selected[groupTitle] || [];

    if (!group || group.type !== 'multiple' || !group.max) return false;

    const isAlreadySelected = current.includes(label);
    return !isAlreadySelected && current.length >= group.max;
  };

  const toggle = (
    groupTitle: string,
    type: 'single' | 'multiple',
    label: string
  ) => {
    const group = options.find((opt) => opt.title === groupTitle);
    const current = selected[groupTitle] || [];

    if (type === 'single') {
      setSelected({
        ...selected,
        [groupTitle]: [label],
      });
      return;
    }

    const isAlreadySelected = current.includes(label);
    if (isAlreadySelected) {
      setSelected({
        ...selected,
        [groupTitle]: current.filter((item) => item !== label),
      });
    } else if (!group?.max || current.length < group.max) {
      setSelected({
        ...selected,
        [groupTitle]: [...current, label],
      });
    }
  };

  const getSelectedLabels = (): string[] => {
    return Object.values(selected).flat();
  };

  const isValid = (): boolean => {
    return options.every((opt) => {
      const selectedGroup = selected[opt.title] || [];

      if (!opt.required) return true;

      if (opt.type === 'single') return selectedGroup.length === 1;

      const min = typeof opt.min === 'number' ? opt.min : 1;
      return selectedGroup.length >= min;
    });
  };

  const reset = () => setSelected({});

  const setSingle = (title: string, label: string) => {
    setSelected((prev) => ({
      ...prev,
      [title]: [label],
    }));
  };


  const setAll = (values: Record<string, string[]>) => {
    setSelected(values);
  };

  const setInitialSelections = (initial: Record<string, string[]>) => {
    setSelected(initial);
  };


  return {
    isSelected,
    isDisabled,
    toggle,
    getSelectedLabels,
    isValid,
    reset,
    setSingle,
    setAll,
    setInitialSelections,
  };
}

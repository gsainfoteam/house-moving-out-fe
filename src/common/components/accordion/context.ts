import { createContext, useContext } from 'react';

export type AccordionContextValue = {
  isOpen: boolean;
  toggle: () => void;
};

const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error('Accordion parts must be used within Accordion.Root');
  }
  return ctx;
}

export { AccordionContext };

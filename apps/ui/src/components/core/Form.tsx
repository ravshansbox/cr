import { classed } from '../../twClassed';

export const Form = classed('form', {
  base: 'flex gap-2',
  variants: {
    layout: {
      column: 'flex-col',
      row: 'flex-row',
    },
  },
  defaultVariants: {
    layout: 'column',
  },
});

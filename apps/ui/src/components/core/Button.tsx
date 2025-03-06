import { classed } from '../../twClassed';

export const Button = classed('button', {
  base: 'cursor-pointer rounded border px-2 py-1 transition',
  variants: {
    variant: {
      normal: 'bg-blue-500 text-white hover:bg-blue-600',
      link: 'border-transparent bg-transparent text-blue-500 hover:bg-blue-50 hover:text-blue-600',
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
});

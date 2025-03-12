import { styled } from '@/styled-system/jsx';

export const Form = styled('form', {
  base: {
    display: 'flex',
    gap: '2',
    flexDirection: 'column',
  },
  variants: {
    layout: {
      column: {
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row',
      },
    },
  },
  defaultVariants: {
    layout: 'column',
  },
});

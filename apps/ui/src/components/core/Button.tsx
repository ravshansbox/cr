import { styled } from '@/styled-system/jsx';

export const Button = styled('button', {
  base: {
    cursor: 'pointer',
    borderRadius: 'md',
    border: '1px solid',
    px: '2',
    py: '1',
    transition: 'all',
  },
  variants: {
    variant: {
      normal: {
        borderColor: 'blue.500',
        bg: 'blue.500',
        color: 'white',
        _hover: { bg: 'blue.600' },
      },
      link: {
        borderColor: 'transparent',
        bg: 'transparent',
        color: 'blue.500',
        _hover: { bg: 'blue.50', color: 'blue.600' },
      },
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
});

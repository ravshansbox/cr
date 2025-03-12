import { ComponentProps, FC, PropsWithChildren } from 'react';
import { styled } from '@/styled-system/jsx';

const LabelCore = styled('label', {
  base: { display: 'flex', gap: 1 },
  variants: {
    type: {
      info: {},
      warning: { color: 'yellow.500' },
      error: { color: 'red.500' },
    },
    layout: {
      column: { flexDirection: 'column' },
      row: { alignItems: 'center' },
    },
  },
  defaultVariants: { type: 'info', layout: 'column' },
});

type LabelProps = {
  text: string;
  type?: ComponentProps<typeof LabelCore>['type'];
  layout?: ComponentProps<typeof LabelCore>['layout'];
};
export const Label: FC<PropsWithChildren<LabelProps>> = ({
  children,
  text,
  type,
  layout,
}) => {
  return (
    <LabelCore type={type} layout={layout}>
      <span>{text}</span>
      {children}
    </LabelCore>
  );
};

import { FC, PropsWithChildren } from 'react';
import { VariantProps } from '@tw-classed/react';
import { classed } from '../../twClassed';

const LabelCore = classed('label', {
  base: 'flex gap-1',
  variants: {
    type: {
      info: '',
      warning: 'text-yellow-500',
      error: 'text-red-500',
    },
    layout: {
      row: 'flex-row items-center',
      column: 'flex-col',
    },
  },
  defaultVariants: {
    type: 'info',
    layout: 'column',
  },
});

type LabelProps = {
  text: string;
  type?: VariantProps<typeof LabelCore>['type'];
  layout?: VariantProps<typeof LabelCore>['layout'];
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

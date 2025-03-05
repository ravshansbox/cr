import { classed, VariantProps } from '@tw-classed/react';
import { FC, PropsWithChildren } from 'react';

const LabelCore = classed('label', {
  base: 'flex flex-col',
  variants: {
    type: {
      info: '',
      warning: 'text-yellow-500',
      error: 'text-red-500',
    },
  },
});

type LabelProps = {
  text: string;
  type?: VariantProps<typeof LabelCore>['type'];
};
export const Label: FC<PropsWithChildren<LabelProps>> = ({
  children,
  text,
  type = 'info',
}) => {
  return (
    <LabelCore type={type}>
      <span>{text}</span>
      {children}
    </LabelCore>
  );
};

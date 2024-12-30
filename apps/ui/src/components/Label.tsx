import { classed } from '@tw-classed/react';
import { FC, PropsWithChildren } from 'react';

const LabelCore = classed('label', { base: 'flex flex-col' });

export const Label: FC<PropsWithChildren & { text: string }> = ({
  children,
  text,
}) => {
  return (
    <LabelCore>
      <span>{text}</span>
      {children}
    </LabelCore>
  );
};

import { ComponentProps, FC, PropsWithChildren } from 'react';
import { VariantProps } from '@tw-classed/react';
import { classed } from '../../twClassed';

const Aside = classed('aside', {
  variants: {
    type: {
      info: 'text-blue-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
    },
  },
});

const typeRoleMap: Record<Type, ComponentProps<'aside'>['role']> = {
  info: 'status',
  warning: 'alert',
  error: 'alert',
};

const typeAriaLiveMap: Record<Type, ComponentProps<'aside'>['aria-live']> = {
  info: 'off',
  warning: 'polite',
  error: 'assertive',
};

type Type = Exclude<VariantProps<typeof Aside>['type'], undefined>;
export const Alert: FC<PropsWithChildren<{ type?: Type }>> = ({
  children,
  type = 'info',
}) => {
  return (
    <Aside
      type={type}
      role={typeRoleMap[type]}
      aria-live={typeAriaLiveMap[type]}
    >
      {children}
    </Aside>
  );
};

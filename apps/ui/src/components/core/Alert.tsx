import { ComponentProps, FC, PropsWithChildren } from 'react';
import { styled } from '@/styled-system/jsx';

const Aside = styled('aside', {
  variants: {
    type: {
      info: { color: 'blue.500' },
      warning: { color: 'yellow.500' },
      error: { color: 'red.500' },
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

type Type = Exclude<ComponentProps<typeof Aside>['type'], undefined>;
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

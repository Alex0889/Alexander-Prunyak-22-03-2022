import { FC } from 'react';
import s from './Box.module.scss';
import clsx from 'clsx';

type BoxProps = {
  readonly className?: string;
};

const Box: FC<BoxProps> = (
  {
    className,
    children
  }) => {
  return (
  <div className={clsx(s.root, className)}>
    {children}
  </div>
  );
};

export default Box;

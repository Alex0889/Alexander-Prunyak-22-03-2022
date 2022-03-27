import { FC } from 'react';
import s from './Card.module.scss';
import clsx from 'clsx';

type CardProps = {
  readonly className?: string;
  readonly onClick?: () => void;
};

const Card: FC<CardProps> = (
  {
    className,
    onClick,
    children,
  }) => {
  return (
    <div className={clsx(s.root, className)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;

import { ButtonHTMLAttributes, FC } from 'react';
import s from './Button.module.scss';
import clsx from 'clsx';

type ButtonProps = {
  readonly className?: string;
};

const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = (
  {
    className,
    children,
    ...props
  }) => {
  return (
    <button className={clsx(s.root, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;

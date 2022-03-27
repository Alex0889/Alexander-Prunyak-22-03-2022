import { FC, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import s from './Input.module.scss';

type InputProps = {
  readonly className?: string;
};

const Input: FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = (
  {
    className,
    ...props
  }) => {
  return (
    <input
      className={clsx(s.root, className)}
      type='text'
      {...props}
    />
  );
};

export default Input;

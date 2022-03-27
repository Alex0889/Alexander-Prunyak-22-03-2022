import { FC } from 'react';
import s from './Loader.module.scss';
import clsx from 'clsx';
import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';

export type LoaderProps = {
  readonly className?: string,
}

const Loader: FC<LoaderProps> = ({ className }) => {
  return (
    <div className={clsx(s.root, className)}>
      <GlobalSvgSelector id='loader' />
    </div>
  );
};

export default Loader;
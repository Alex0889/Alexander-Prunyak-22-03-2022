import { FC, useEffect } from 'react';
import clsx from 'clsx';
import s from './Page.module.scss';
import Header from 'components/Header';

type PageProps = {
  readonly title: string;
  readonly hasHeader?: boolean;
  readonly hasFooter?: boolean;
  readonly className?: string;
};

const Page: FC<PageProps> = (
  {
    title,
    hasHeader,
    hasFooter,
    className,
    children,
  }) => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = title;
    }
  }, [title]);
  return <>
    {hasHeader && <Header />}
    <main
      className={clsx(s.root,
        (hasHeader && s.hasHeader),
        (hasFooter && s.hasFooter),
        className)}
    >
      {children}
    </main>
  </>;
};

export default Page;

import React, { FC } from 'react';
import { dictionary } from './dictionary';
import { useAppSelector } from '../../app/hooks';

interface AdditionalProps {
  readonly t: { [key: string]: string };
}

function withTranslate<T extends AdditionalProps>(Component: FC<T>): FC<Omit<T, 't'>> {
  return props => {
    const { language: { lang } } = useAppSelector();
    return <Component {...props as any} t={dictionary[lang]} />;
  };
}

export default withTranslate;

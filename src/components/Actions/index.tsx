import React, { FC, useEffect } from 'react';
import s from './Actions.module.scss';
import clsx from 'clsx';
import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';
import { changeCssRootVariables } from 'prebuild/helpers/changeCssRootVariables';
import { changeTheme } from 'app/slices/theme';
import { Theme } from 'app/enum/Theme';
import { changeLanguage } from 'app/slices/language';
import { Lang } from 'app/enum/Lang';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Link, useLocation } from 'react-router-dom';
import Autocomplete from '../Autocomplete';

type ActionsProps = {
  readonly className?: string;
};

const Actions: FC<ActionsProps> = (
  {
    className,
  }) => {
  const {
    theme: { theme },
    language: { lang },
  } = useAppSelector();
  const dispatch = useAppDispatch();

  const location = useLocation();

  useEffect(() => {
    changeCssRootVariables(theme);
  }, [theme]);

  const handleChangeTheme = (): void => {
    dispatch(changeTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const handleChangeLanguage = (): void => {
    dispatch(changeLanguage(lang === Lang.RU ? Lang.EN : Lang.RU));
  };

  return (
    <div className={clsx(s.root, className)}>
      {location.pathname !== '/favorites' &&
      <button
        className={s.root__favorite}
      >
        <Link to='/favorites'>
          <GlobalSvgSelector id='favorite_empty' />
        </Link>
      </button>
      }
      <button
        className={s.root__lang}
        onClick={handleChangeLanguage}
      >{lang}</button>
      <button
        className={s.root__theme}
        onClick={handleChangeTheme}>
        <GlobalSvgSelector id='change-theme' />
      </button>

      <Autocomplete />

    </div>
  );
};

export default Actions;

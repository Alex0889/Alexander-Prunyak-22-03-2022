import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import s from './Actions.module.scss';
import clsx from 'clsx';
import _debounce from 'lodash.debounce';
import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';
import Input from 'prebuild/components/Input';
import { changeCssRootVariables } from 'prebuild/helpers/changeCssRootVariables';
import { changeTheme } from 'app/slices/theme';
import { Theme } from 'app/enum/Theme';
import { changeLanguage } from 'app/slices/language';
import { Lang } from 'app/enum/Lang';
import { changeCity, changeKey } from 'app/slices/geolocation';
import { transliterate } from 'prebuild/helpers/translitCyrillic';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import withTranslate from '../WithTranslate';
import { IWithTranslate } from 'prebuild/interfaces/IWithTranslate';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { storage } from 'prebuild/helpers/storage';
import { getAutocomplete } from 'app/slices/autocomplete/thunk/getAutocomplete';
import { clearAutocomplete } from 'app/slices/autocomplete';

type ActionsProps = {
  readonly className?: string;
};

const Actions: FC<ActionsProps & IWithTranslate> = (
  {
    className,
    t,
  }) => {
  const {
    theme: { theme },
    language: { lang },
    autocomplete: { autocomplete: { autocomplete } },
  } = useAppSelector();
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const [city, setCity] = useState<string>('');

  useEffect(() => {
    changeCssRootVariables(theme);
  }, [theme]);

  const handleChangeTheme = (): void => {
    dispatch(changeTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const handleChangeLanguage = (): void => {
    dispatch(changeLanguage(lang === Lang.RU ? Lang.EN : Lang.RU));
  };

  const handleAutocomplete = (city: string, key: string): void => {
    storage.setItem('city', city);
    storage.setItem('cityKey', key);

    dispatch(changeCity(city));
    dispatch(changeKey(key));
    dispatch(clearAutocomplete());

    navigate('/');
    setCity('');
  };

  const delayedQuery = _debounce(city => dispatch(getAutocomplete(city)), 1000);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    delayedQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(changeCity(transliterate(city)));
    setCity('');
    dispatch(clearAutocomplete());
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

      <form onSubmit={handleSubmit}>
        <Input
          value={city}
          placeholder={t['searchCity']}
          onChange={handleInput}
        />
        {autocomplete && autocomplete.length !== 0 &&
        <div className={s.root__autocomplete}>{
          autocomplete.map(city => (
            <div key={city.Key} onClick={() => {
              handleAutocomplete(city.LocalizedName, city.Key);
            }}
                 className={s.root__autocomplete_item}
            >
              {city.LocalizedName}
            </div>))}
        </div>
        }
      </form>

    </div>
  );
};

export default withTranslate(Actions);

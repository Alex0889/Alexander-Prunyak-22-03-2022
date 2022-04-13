import React, { ChangeEvent, FC, FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Autocomplete.module.scss';
import _debounce from 'lodash.debounce';
import { storage } from 'prebuild/helpers/storage';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { IWithTranslate } from 'prebuild/interfaces/IWithTranslate';
import withTranslate from '../WithTranslate';
import Input from 'prebuild/components/Input';
import { getAutocomplete } from 'app/slices/autocomplete/thunk/getAutocomplete';
import { changeCity, changeKey } from 'app/slices/geolocation';
import { transliterate } from 'prebuild/helpers/translitCyrillic';
import { clearAutocomplete } from 'app/slices/autocomplete';
import clsx from 'clsx';

type AutocompleteProps = {
  readonly className?: string;
};

const Autocomplete: FC<AutocompleteProps & IWithTranslate> = (
  {
    className,
    t,
  }) => {
  const { autocomplete: { autocomplete: { autocomplete } } } = useAppSelector();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  const [city, setCity] = useState<string>('');

  useEffect(() => {
    function handleClickOutsideAutocomplete(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        dispatch(clearAutocomplete());
        setCity('');
      }
    }

    document.addEventListener('click', handleClickOutsideAutocomplete);
    return () => {
      document.removeEventListener('click', handleClickOutsideAutocomplete);
    };
  }, [dispatch, ref]);

  const handleAutocomplete = (city: string, key: string): void => {
    storage.setItem('city', city);
    storage.setItem('cityKey', key);

    dispatch(changeCity(city));
    dispatch(changeKey(key));
    dispatch(clearAutocomplete());

    navigate('/');
    setCity('');
  };

  //eslint-disable-next-line react-hooks/exhaustive-deps
  const delayedQuery = useCallback(
    _debounce(value => dispatch(getAutocomplete(value)), 1000),
    []);

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
    <form onSubmit={handleSubmit} className={clsx(s.root, className)}>
      <Input
        value={city}
        placeholder={t['searchCity']}
        onChange={handleInput}
      />
      {autocomplete && autocomplete.length !== 0 &&
      <div ref={ref} className={s.root__cities}>{
        autocomplete.map(city => (
          <div key={city.Key} onClick={() => {
            handleAutocomplete(city.LocalizedName, city.Key);
          }}
               className={s.root__cities_item}
          >
            {city.LocalizedName}
          </div>))}
      </div>
      }
    </form>
  );
};

export default withTranslate(Autocomplete);

import { FC, useEffect, useState } from 'react';
import s from './TheDay.module.scss';
import clsx from 'clsx';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import Box from 'prebuild/components/Box';
import GlobalSvgSelector from 'prebuild/assets/icons/GlobalSvgSelector';
import withTranslate from '../WithTranslate';
import { IWithTranslate } from '../../prebuild/interfaces/IWithTranslate';
import { storage } from '../../prebuild/helpers/storage';
import { ICurrentWeater } from '../../app/interfaces/ICurrentWeater';
import { IFavorites } from '../../prebuild/interfaces/IFavorites';

dayjs.extend(utc);
dayjs.extend(timezone);

type TheDayProps = {
  readonly className?: string;
  readonly isPopup?: boolean;
  readonly weather: ICurrentWeater;
  readonly cityKey: string;
  readonly cityName: string;
  readonly timezone?: string;
};

const TheDay: FC<TheDayProps & IWithTranslate> = (
  {
    className,
    isPopup,
    weather,
    cityKey,
    cityName,
    timezone,
    t,
  }) => {
  const [isInFavorites, setIsInFavorites] = useState<boolean>(
    Boolean(storage.getItem('favorites')) &&
    Boolean((storage.getItem('favorites') as IFavorites[]).find(item => item.key === cityKey)),
  );

  useEffect(() => {
    Boolean(cityKey) &&
    Boolean(storage.getItem('favorites')) &&
    setIsInFavorites(Boolean((storage.getItem('favorites') as IFavorites[]).find(item => item.key === cityKey)));
  }, [cityKey]);

  const handleClickOnFavorites = () => {
    const storageLocal = (storage.getItem('favorites') as IFavorites[]) || [];
    if (!isInFavorites) {
      storageLocal.push({ key: cityKey, city: cityName });
      storage.setItem('favorites', storageLocal);
      setIsInFavorites(true);
    } else {
      storage.setItem('favorites', storageLocal.filter(item => item.key !== cityKey));
      setIsInFavorites(false);
    }
  };

  return (
    <Box className={clsx(s.root, (isPopup && s.popup), className)}>
      <div className={clsx(s.root__top, (isPopup && s.popup))}>
        <div className={s.root__wrapper}>
          <div
            className={
              clsx(s.root__temp,
                (isPopup && s.popup),
              )}>
            {Math.round(weather.Temperature.Metric.Value)}&deg;
          </div>
          <div
            className={
              clsx(s.root__day,
                (isPopup && s.popup),
              )}>
            {
              dayjs.unix(weather.EpochTime).format('dddd')
            }
          </div>
          {
            isPopup &&
            <img
              src={`https://developer.accuweather.com/sites/default/files/${weather.WeatherIcon < 10 ? '0' + weather.WeatherIcon : weather.WeatherIcon}-s.png`}
              alt='Weather icon' />
          }
        </div>
        {!isPopup &&
        <img
          src={`https://developer.accuweather.com/sites/default/files/${weather.WeatherIcon < 10 ? '0' + weather.WeatherIcon : weather.WeatherIcon}-s.png`}
          alt='Weather icon' />}
      </div>

      <div className={s.root__bottom}>
        <div className={
          clsx(s.root__time,
            (isPopup && s.popup),
          )}>{t['time']}: <time>{dayjs.unix(weather.EpochTime).tz(timezone).format('HH:mm')}</time>
        </div>
        <div className={
          clsx(s.root__date,
            (isPopup && s.popup),
          )}>{t['date']}: <span>{dayjs.unix(weather.EpochTime).tz(timezone).format('D MMM')}</span>
        </div>
        <div className={
          clsx(s.root__city,
            (isPopup && s.popup),
          )}>{t['city']}: <span>{cityName}</span>
          <button className={s.root__favorite} onClick={handleClickOnFavorites}>
            {
              isInFavorites ?
                <GlobalSvgSelector id='favorite_full' /> :
                <GlobalSvgSelector id='favorite_empty' />
            }</button>
        </div>
      </div>
    </Box>
  );
};

export default withTranslate(TheDay);

import { FC } from 'react';
import s from './DayInfo.module.scss';
import Box from 'prebuild/components/Box';
import clsx from 'clsx';
import cloud from 'prebuild/assets/img/cloud.png';
import { IItem } from 'prebuild/interfaces/IItem';
import DayInfoItem from './partials/DayInfoItem';
import { getWindDirection } from './helpers';
import { windSpeedPicker } from 'prebuild/helpers/windSpeedPicker';
// import { ICurrent } from 'app/interfaces/ICurrent';
// import { IDaily } from 'app/interfaces/IDaily';
import withTranslate from '../WithTranslate';
import { IWithTranslate } from 'prebuild/interfaces/IWithTranslate';
import { ICurrentWeater } from '../../app/interfaces/ICurrentWeater';

type DayInfoProps = {
  readonly className?: string;
  readonly isPopup?: boolean;
  readonly weather: ICurrentWeater;
};

const DayInfo: FC<DayInfoProps & IWithTranslate> = (
  {
    className,
    isPopup,
    weather,
    t,
  }) => {
  const items: IItem[] = [
    {
      icon_id: 'temp',
      name: t['temp'],
      value: `${Math.round(weather.Temperature.Metric.Value)
      }° - ${t['feelsLike']} ${Math.round(
        weather.RealFeelTemperature.Metric.Value,
      )}°`,
    },
    {
      icon_id: 'pressure',
      name: t['pressure'],
      value: `${weather.Pressure.Metric.Value} ${t['unit']}`,
    },
    {
      icon_id: 'precipitation',
      name: t['precipitation'],
      value: `${weather.WeatherText}`,
    },
    {
      icon_id: 'wind',
      name: t['wind'],
      value: `${weather.Wind.Speed.Metric.Value} 
      ${t['meterPSec']} - ${t[getWindDirection(weather.Wind.Direction.Degrees)]} - 
      ${t[windSpeedPicker(weather.Wind.Speed.Metric.Value)]}`,
    },
  ];

  return <Box className={clsx(s.root, (isPopup && s.popup), className)}>
    <div className={s.root__items}>
      {items.map(item => <DayInfoItem key={item.icon_id} item={item} />)}
    </div>
    {!isPopup && <img className={s.root__img} src={cloud} alt='Cloud' />}
  </Box>;
};

export default withTranslate(DayInfo);

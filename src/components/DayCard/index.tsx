import { FC } from 'react';
import clsx from 'clsx';
import s from './DayCard.module.scss';

import { unix } from 'dayjs';
import { IWithTranslate } from 'prebuild/interfaces/IWithTranslate';
import { DailyForecast } from 'app/interfaces/IForecas';
import Card from '../../prebuild/components/Card';
import { convertToCelsius } from '../../prebuild/helpers/convertToCelsius';
import withTranslate from '../WithTranslate';

type DayCardProps = {
  readonly day: DailyForecast;
  readonly city?: string;
  readonly className?: string;
  readonly onClick?: (variable: string) => void;
};

const DayCard: FC<DayCardProps & IWithTranslate> = (
  {
    day,
    city,
    onClick,
    className,
  }) => {

  const handleClick = () => {
    if (Boolean(city)) onClick!(city!);
  }

  const date = unix(day.EpochDate).format('dddd');

  return (
    <Card className={clsx(s.root, className)} onClick={handleClick}>

      <span className={s.root__day}>{city || date}</span>

      <span className={s.root__date}>{unix(day.EpochDate).format('D MMM')}</span>

      <img
        src={`https://developer.accuweather.com/sites/default/files/${day.Day.Icon < 10 ? '0' + day.Day.Icon : day.Day.Icon}-s.png`}
        alt='Weather icon' width='80%' />

      <span className={s.root__temp_day}>temp: {Math.round(convertToCelsius(day.Temperature.Maximum.Value))}&deg;</span>

      <span className={s.root__info}>{day.Day.IconPhrase}</span>

    </Card>
  );
};

export default withTranslate(DayCard);

import { FC } from 'react';
import s from './Week.module.scss';
import Box from 'prebuild/components/Box';
import DayCard from 'components/DayCard';
import { useAppSelector } from 'app/hooks';

const Week: FC = () => {
  const {
    weather: {
      forecast: { weather },
    },
  } = useAppSelector();

  return (
    <div className={s.root}>
      <Box className={s.root__week}>
        {
          Boolean(weather) && weather!.DailyForecasts.map(day => (
            <DayCard
              key={day.EpochDate}
              className={s.root__dayCard}
              day={day}
            />
          ))
        }
      </Box>
    </div>
  );
};

export default Week;

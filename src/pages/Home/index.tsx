import { FC, useCallback, useEffect } from 'react';
import s from './HomePage.module.scss';
import Page from 'prebuild/components/Page';
import TheDay from 'components/TheDay';
import DayInfo from 'components/DayInfo';
import Week from './partials/Week';
import WithSkeleton from 'components/WithSkeleton';
import Loader from '../../components/Loader';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getForecast } from '../../app/slices/weather/thunk/getForecast';
import { storage } from '../../prebuild/helpers/storage';
import Actions from '../../components/Actions';
import { setGeolocation } from '../../app/slices/geolocation';
import { toast } from 'react-toastify';
import { getGeolocation } from '../../app/slices/geolocation/thunk/getGeolocation';

const HomePage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    geolocation: { city, key },
    weather: {
      current,
      forecast: { weather, isLoading, error },
    },
  } = useAppSelector();

  const geolocation = useCallback(async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { coords } = position;
        dispatch(setGeolocation(coords));
      },
      (error) => {
        toast(`Error: ${error.message}`);
      },
    );
  }, [dispatch]);

  useEffect(() => {
    !Boolean(storage.getItem('city')) && dispatch(getGeolocation());
    dispatch(getForecast());
  }, [dispatch]);

  useEffect(() => {
    geolocation();
  }, [geolocation]);

  return (
    <Page title='React Weather App' className={s.root} hasHeader>
      <WithSkeleton
        isLoading={isLoading}
        isEmpty={Boolean(current.weather) && Object.keys(current.weather!).length === 0}
        error={current.error || error}
        loadingSlot={<Loader className={s.root__loader} />}
      >
        <Actions className={s.actions} />
        {
          current.weather ?
            <TheDay
              weather={current.weather![0]}
              cityKey={storage.getItem('cityKey') || key }
              cityName={storage.getItem('city') || city} /> : null
        }
        {
          current.weather ?
            <DayInfo weather={current.weather[0]} /> : null
        }
        {
          Boolean(weather) &&
          <Week />
        }
      </WithSkeleton>
    </Page>
  );
};

export default HomePage;

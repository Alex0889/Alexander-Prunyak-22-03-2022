import { FC, useEffect, useState } from 'react';
import s from './FavoritesPage.module.scss';
import Page from 'prebuild/components/Page';
import WithSkeleton from 'components/WithSkeleton';
import { storage } from 'prebuild/helpers/storage';
import Box from 'prebuild/components/Box';
import Button from 'prebuild/components/Button';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { changeCity } from 'app/slices/geolocation';
import DayCard from '../../components/DayCard';
import { getFavorites } from '../../app/slices/favorites/thunks/getFavorites';
import { IFavorites } from '../../prebuild/interfaces/IFavorites';
import Loader from '../../components/Loader';

const Favorites: FC = () => {
  const {
    favorites: { favorites },
  } = useAppSelector();
  const [favoritesCities] = useState<IFavorites[]>(storage.getItem('favorites') || []);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickFavorite = (city: string) => {
    storage.setItem('city', city);
    dispatch(changeCity(city));
    navigate('/');
  };

  const handleGoBack = () => {
    navigate('/');
  };

  useEffect(() => {
    Boolean(favoritesCities) && dispatch(getFavorites());
  }, [dispatch, favoritesCities]);

  return (
    <Page title='React Weather App | Favorites' className={s.root} hasHeader>
      <WithSkeleton
        isLoading={favorites.isLoading}
        isEmpty={false}
        error={favorites.error}
        loadingSlot={<Loader />}
      >
        <Button className={s.root__back} onClick={handleGoBack}>
          &larr; Go back
        </Button>
        {favorites.favorites.length !== 0 ? (
          <Box className={s.root__list}>
            {
              favorites.favorites.map((favorite) => (
                <DayCard
                  key={favorite!.key}
                  className={s.root__dayCard}
                  day={favorite!.value.DailyForecasts[0]}
                  city={
                    (storage.getItem('favorites') as IFavorites[]).find(obj => obj.key === favorite!.key)!.city}
                  onClick={handleClickFavorite}
                />
              ))}
          </Box>
        ) : (
          <p>There is no favorites</p>
        )}
      </WithSkeleton>
    </Page>
  );
};

export default Favorites;

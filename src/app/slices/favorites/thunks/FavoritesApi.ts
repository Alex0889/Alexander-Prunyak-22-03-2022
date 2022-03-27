import Api from '../../../Api';

export const FavoritesApi = new Api(process.env.REACT_APP_WEATHER_API_5DAYS_URL as string);
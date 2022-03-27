import Api from '../../../Api';

export const GeolocationApi = new Api(process.env.REACT_APP_GEOLOCATION_API_URL as string);